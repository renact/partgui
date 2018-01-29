import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Log } from 'ng2-logger';

@Component({
    selector: 'app-stream',
    templateUrl: './stream.component.html'
})
export class StreamComponent implements OnInit {
    /*  General   */
    private log: any = Log.create('janus.component');

    /* constants */
    SERVER: string = "https://janus.conf.meetecho.com/janus";
    opaqueId: string = "videoroomtest-" + Janus.randomString(12);
    doSimulcast: boolean = false;

    /* Janus handlers */
    janus: any;
    sfutest: any;

    /* details */
    username: string;
    room: number;
    max_number_of_streams_in_room: number = 1;
    localstream: any;
    myid: any;
    privateId: any;

    // all the feeds we're watching (should just be 1 tbh)
    feeds: Array<any> = [];
    bitrateTimer: Array<any> = [];

    currentResolution: string = "";
    currentBitRate: any = "";

    /* DOM element references */
    @ViewChild("localvideo", { read: ElementRef }) localvideo: ElementRef;
    @ViewChild("remotevideo", { read: ElementRef }) remotevideo: ElementRef;

    ngOnInit(): void {
        // Initialize the library (all console debuggers enabled)
        Janus.init({ debug: "all", callback: this.janus_initialized.bind(this) });

        setTimeout(this.register_user_on_session.bind(this), 5 * 1000, "yolo", 1234);
        // setTimeout(this.publish_own_stream.bind(this), 10 * 1000, false);
    }

    janus_initialized(): void {
        console.log("initialized janus");
        this.janus_startSession();
    }

    janus_startSession(): void {
        // Create session
        this.janus = new Janus(
            {
                server: this.SERVER,
                success: this.janus_attach_videoroom_plugin.bind(this),
                error: function (error) {
                    Janus.error(error);
                },
                destroyed: function () {
                    Janus.log("TODO: destroying");
                }
            });
    }

    /*
        Attach a video room plugin to te session.
    */
    janus_attach_videoroom_plugin(): void {
        console.log("Janus: server connected is good, we can attach the video room plugin");
        // Attach to video room test plugin

        this.janus.attach(
            {
                plugin: "janus.plugin.videoroom",
                opaqueId: this.opaqueId,
                success: this.janus_attach_videoroom_plugin_success.bind(this),
                error: function (error) {
                    Janus.error("  -- Error attaching plugin...", error);
                },
                consentDialog: this.janus_consentDialog.bind(this),
                mediaState: function (medium, on) {
                    Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
                },
                webrtcState: this.janus_attach_videoroom_plugin_webRtcState.bind(this),
                onmessage: this.janus_onmessage.bind(this),
                onlocalstream: this.janus_onlocalstream.bind(this),
                onremotestream: function (stream) {
                    // The publisher stream is sendonly, we don't expect anything here
                },
                oncleanup: function () { // TODO 
                    Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
                }
            });
    }

    janus_attach_videoroom_plugin_success(pluginHandle: any): void {
        this.sfutest = pluginHandle;
        Janus.log("Plugin attached! (" + this.sfutest.getPlugin() + ", id=" + this.sfutest.getId() + ")");
        Janus.log("  -- This is a publisher/manager");
    }

    /*
        TODO: Shouldn't be required in electron, automatically grants consent..
    */
    janus_consentDialog(on: any): void {
        Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
    }

    /*
        TODO: ui stuff
        bitrate control
    */
    janus_attach_videoroom_plugin_webRtcState(on: any): void {
        Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
    }

    /*
        TODO: implement properly
        Currently it will open every feed there is, which is kinda nice because that can give us multicam support in the future..
        It does make implementing thingds a bit harder though.
    */
    janus_onmessage(msg: any, jsep: any): void {
        Janus.debug(" ::: Got a message (publisher) :::");
        Janus.debug(msg);
        let event = msg["videoroom"];
        Janus.debug("Event: " + event);
        if (event != undefined && event != null) {
            if (event === "joined") {
                // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                this.myid = msg["id"];
                this.privateId = msg["private_id"];
                Janus.log("Successfully joined room " + msg["room"] + " with ID " + this.myid);

                // Any new feed to attach to?
                if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
                    let list = msg["publishers"];
                    Janus.debug("Got a list of available publishers/feeds:");
                    Janus.debug(list);
                    for (let f in list) {
                        let id = list[f]["id"];
                        let display = list[f]["display"];
                        let audio = list[f]["audio_codec"];
                        let video = list[f]["video_codec"];
                        Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
                        this.newRemoteFeed(id, display, audio, video);
                    }
                }
            } else if (event === "destroyed") {
                // The room has been destroyed
                Janus.warn("The room has been destroyed!");
                //TODO: alert that room has been destroyed and move back to the overview.
            } else if (event === "event") {
                // Any new feed to attach to?
                if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
                    var list = msg["publishers"];
                    Janus.debug("Got a list of available publishers/feeds:");
                    Janus.debug(list);
                    for (var f in list) {
                        var id = list[f]["id"];
                        var display = list[f]["display"];
                        var audio = list[f]["audio_codec"];
                        var video = list[f]["video_codec"];
                        Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
                        this.newRemoteFeed(id, display, audio, video);
                    }
                } else if (msg["leaving"] !== undefined && msg["leaving"] !== null) {
                    // One of the publishers has gone away?
                    var leaving = msg["leaving"];
                    Janus.log("Publisher left: " + leaving);
                    var remoteFeed = null;
                    for (var i = 1; i < this.max_number_of_streams_in_room; i++) {
                        if (this.feeds[i] != null && this.feeds[i] != undefined && this.feeds[i].rfid == leaving) {
                            remoteFeed = this.feeds[i];
                            break;
                        }
                    }
                    if (remoteFeed != null) {
                        Janus.debug("Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching");
                        // TODO: delete the remote video element of the feed that disappeared..
                        // $('#remote' + remoteFeed.rfindex).empty().hide();
                        // $('#videoremote' + remoteFeed.rfindex).empty();
                        this.feeds[remoteFeed.rfindex] = null;
                        remoteFeed.detach();
                    }
                } else if (msg["unpublished"] !== undefined && msg["unpublished"] !== null) {
                    // One of the publishers has unpublished?
                    let unpublished = msg["unpublished"];
                    Janus.log("Publisher unpublished : " + unpublished);
                    if (unpublished === 'ok') {
                        // That's us
                        this.sfutest.hangup();
                        return;
                    }
                    let remoteFeed = null;
                    for (let i = 1; i < this.max_number_of_streams_in_room; i++) {
                        if (this.feeds[i] != null && this.feeds[i] != undefined && this.feeds[i].rfid == unpublished) {
                            remoteFeed = this.feeds[i];
                            break;
                        }
                    }
                    if (remoteFeed != null) {
                        Janus.debug("Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching");
                        // TODO: hide the feeds that went gone!
                        // $('#remote' + remoteFeed.rfindex).empty().hide();
                       // $('#videoremote' + remoteFeed.rfindex).empty();
                        this.feeds[remoteFeed.rfindex] = null;
                        remoteFeed.detach();
                    }
                } else if (msg["error"] !== undefined && msg["error"] !== null) {
                    if (msg["error_code"] === 426) {
                        // This is a "no such room" error: give a more meaningful description
                        // TODO: better error, no bootbox
                        /*
                        bootbox.alert(
                            "<p>Apparently room <code>" + myroom + "</code> (the one this demo uses as a test room) " +
                            "does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.cfg</code> " +
                            "configuration file? If not, make sure you copy the details of room <code>" + myroom + "</code> " +
                            "from that sample in your current configuration file, then restart Janus and try again."
                        ); */
                    } else {
                        // bootbox.alert(msg["error"]);
                        // TODO: better error, no bootbox
                    }
                }
            }
        }
        if (jsep !== undefined && jsep !== null) {
            Janus.debug("Handling SDP as well...");
            Janus.debug(jsep);
            this.sfutest.handleRemoteJsep({ jsep: jsep });
            // Check if any of the media we wanted to publish has
            // been rejected (e.g., wrong or unsupported codec)
            let audio = msg["audio_codec"];
            if (this.localstream && this.localstream.getAudioTracks() && this.localstream.getAudioTracks().length > 0 && !audio) {
                this.log.d("Our audio has been rejected!");
                // Audio has been rejected
                //toastr.warning("Our audio stream has been rejected, viewers won't hear us");
            }
            let video = msg["video_codec"];
            if (this.localstream && this.localstream.getVideoTracks() && this.localstream.getVideoTracks().length > 0 && !video) {
                this.log.d("Our video has been rejected!");
                // Video has been rejected
                // toastr.warning("Our video stream has been rejected, viewers won't see us");
                // Hide the webcam video
                /*
                $('#myvideo').hide();
                $('#videolocal').append(
                    '<div class="no-video-container">' +
                    '<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
                    '<span class="no-video-text" style="font-size: 16px;">Video rejected, no webcam</span>' +
                    '</div>');
                */
            }
        }

    }


    /*
        When we start publishing/ streaming, this is called by Janus and sets our local video.
        It also seems to do a lot of button stuff, but we can move that elsewhere tbh.
    */
    janus_onlocalstream(stream: any): void {
        Janus.debug(" ::: Got a local stream :::");
        this.localstream = stream;
        Janus.debug(stream);
        //$('#videojoin').hide();
        //$('#videos').removeClass('hide').show();
        /*
        if ($('#myvideo').length === 0) {
            $('#videolocal').append('<video class="rounded centered" id="myvideo" width="100%" height="100%" autoplay muted="muted"/>');
            // Add a 'mute' button
            $('#videolocal').append('<button class="btn btn-warning btn-xs" id="mute" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;">Mute</button>');
            $('#mute').click(toggleMute);V
            // Add an 'unpublish' button
            //$('#videolocal').append('<button class="btn btn-warning btn-xs" id="unpublish" style="position: absolute; bottom: 0px; right: 0px; margin: 15px;">Unpublish</button>');
            $('#unpublish').click(unpublishOwnFeed);
        } */

        Janus.attachMediaStream(this.localvideo.nativeElement, stream);
        //$("#myvideo").get(0).muted = "muted";
        /*
        if (this.sfutest.webrtcStuff.pc.iceConnectionState !== "completed" &&
            this.sfutest.webrtcStuff.pc.iceConnectionState !== "connected") {
            $("#videolocal").parent().parent().block({
                message: '<b>Publishing...</b>',
                css: {
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'white'
                }
            });
        }

        var videoTracks = stream.getVideoTracks();
        if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
            // No webcam
            $('#myvideo').hide();
            if ($('#videolocal .no-video-container').length === 0) {
                $('#videolocal').append(
                    '<div class="no-video-container">' +
                    '<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
                    '<span class="no-video-text">No webcam available</span>' +
                    '</div>');
            }
        } else {
            $('#videolocal .no-video-container').remove();
            $('#myvideo').removeClass('hide').show();
        }*/
    }



    /*
        Whenever a new "publisher" / "video feed" is being broadcast in the room,
        this will be called and it will add a new video element.
    */
    newRemoteFeed(id: any, display: any, audio: any, video: any) : void {
        // A new feed has been published, create a new plugin handle and attach to it as a listener
        let remoteFeed = null;
        let self = this;
        this.janus.attach(
            {
                plugin: "janus.plugin.videoroom",
                opaqueId: self.opaqueId,
                success: function(pluginHandle) {
                    remoteFeed = pluginHandle;
                    remoteFeed.simulcastStarted = false;
                    Janus.log("Remote Feed: Plugin attached! (" + remoteFeed.getPlugin() + ", id=" + remoteFeed.getId() + ")");
                    Janus.log("  -- This is a subscriber");
                    // We wait for the plugin to send us an offer
                    console.log("before");
                    let listen = { "request": "join", "room": self.room, "ptype": "listener", "feed": id, "private_id": self.privateId };
                    self.log.d(listen);
                    // In case you don't want to receive audio, video or data, even if the
                    // publisher is sending them, set the 'offer_audio', 'offer_video' or
                    // 'offer_data' properties to false (they're true by default), e.g.:
                    // 		listen["offer_video"] = false;
                    // For example, if the publisher is VP8 and this is Safari, let's avoid video
                    if(video !== "h264" && Janus.webRTCAdapter.browserDetails.browser === "safari") {
                        if(video)
                            video = video.toUpperCase()
                        // TODO: handle error here: snackbar
                        // toastr.warning("Publisher is using " + video + ", but Safari doesn't support it: disabling video");
                        listen["offer_video"] = false;
                    }
                    remoteFeed.send({"message": listen});
                },
                error: function(error) {
                    Janus.error("  -- Error attaching plugin...", error);
                    // bootbox.alert("Error attaching plugin... " + error);
                },
                onmessage: function(msg, jsep) {
                    Janus.debug(" ::: Got a message (listener) :::");
                    Janus.debug(msg);
                    var event = msg["videoroom"];
                    Janus.debug("Event: " + event);
                    if(msg["error"] !== undefined && msg["error"] !== null) {
                        // bootbox.alert(msg["error"]);
                    } else if(event != undefined && event != null) {
                        if(event === "attached") {
                            // Subscriber created and attached
                            for(var i=1;i<self.max_number_of_streams_in_room;i++) {
                                // find and empty spot
                                if(self.feeds[i] === undefined || self.feeds[i] === null) {
                                    self.feeds[i] = remoteFeed;
                                    remoteFeed.rfindex = i;
                                    break;
                                }
                            }
                            remoteFeed.rfid = msg["id"];
                            remoteFeed.rfdisplay = msg["display"];
                            if(remoteFeed.spinner === undefined || remoteFeed.spinner === null) {
                                // var target = document.getElementById('videoremote'+remoteFeed.rfindex);
                                // remoteFeed.spinner = new Spinner({top:100}).spin(target);
                            } else {
                                // remoteFeed.spinner.spin();
                            }
                            Janus.log("Successfully attached to feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") in room " + msg["room"]);
                            //$('#remote'+remoteFeed.rfindex).removeClass('hide').html(remoteFeed.rfdisplay).show();
                        } else if(event === "event") {
                            /* 
                            // DISABLED SIMULCASTING FOR NOW.
                            // Check if we got an event on a simulcast-related event from this publisher
                            var substream = msg["substream"];
                            var temporal = msg["temporal"];
                            if((substream !== null && substream !== undefined) || (temporal !== null && temporal !== undefined)) {
                                if(!remoteFeed.simulcastStarted) {
                                    remoteFeed.simulcastStarted = true;
                                    // Add some new buttons
                                    // addSimulcastButtons(remoteFeed.rfindex);
                                }
                                // We just received notice that there's been a switch, update the buttons
                                // updateSimulcastButtons(remoteFeed.rfindex, substream, temporal);
                            } */
                        } else {
                            // What has just happened?
                        }
                    }
                    if(jsep !== undefined && jsep !== null) {
                        Janus.debug("Handling SDP as well...");
                        Janus.debug(jsep);

                        let remoteFeedRef = remoteFeed;
                        // Answer and attach
                        remoteFeed.createAnswer(
                            {
                                jsep: jsep,
                                // Add data:true here if you want to subscribe to datachannels as well
                                // (obviously only works if the publisher offered them in the first place)
                                media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
                                success: function(jsep) {
                                    Janus.debug("Got SDP!");
                                    Janus.debug(jsep);
                                    let body = { "request": "start", "room": self.room };
                                    remoteFeedRef.send({"message": body, "jsep": jsep});
                                },
                                error: function(error) {
                                    Janus.error("WebRTC error:", error);
                                    // bootbox.alert("WebRTC error... " + JSON.stringify(error));
                                }
                            });
                    }
                },
                webrtcState: function(on) {
                    Janus.log("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
                },
                onlocalstream: function(stream) {
                    // The subscriber stream is recvonly, we don't expect anything here
                },
                onremotestream: function(stream) {
                    Janus.debug("Remote feed #" + remoteFeed.rfindex);
                    console.log("Got a remote feed, attaching the media stream!");
                    Janus.attachMediaStream(self.remotevideo.nativeElement, stream);
                    var videoTracks = stream.getVideoTracks();
                    if(videoTracks === null || videoTracks === undefined || videoTracks.length === 0 || videoTracks[0].muted) {
                        // No remote video
                        // TODO: handle this properly
                    } else {
                        // show video screen
                        // TODO: currently always shows
                        /*
                        $('#remotevideo'+remoteFeed.rfindex+ ' .no-video-container').remove();
                        $('#remotevideo'+remoteFeed.rfindex).removeClass('hide').show();
                        */
                    }
                    if(Janus.webRTCAdapter.browserDetails.browser === "chrome" || Janus.webRTCAdapter.browserDetails.browser === "firefox" ||
                            Janus.webRTCAdapter.browserDetails.browser === "safari") {
                                self.bitrateTimer[remoteFeed.rfindex] = setInterval(function() {
                            // Display updated bitrate, if supported
                            self.currentBitRate = remoteFeed.getBitrate();
                            // Check if the resolution changed too
                            var width = self.remotevideo.nativeElement.videoWidth;
                            var height = self.remotevideo.nativeElement.videoHeight;
                        }, 1000);
                    }
                },
                oncleanup: function() {
                    Janus.log(" ::: Got a cleanup notification (remote feed " + id + ") :::");
                    /*
                    if(remoteFeed.spinner !== undefined && remoteFeed.spinner !== null)
                        remoteFeed.spinner.stop();
                    remoteFeed.spinner = null;*/
                   /* $('#remotevideo'+remoteFeed.rfindex).remove();
                    $('#waitingvideo'+remoteFeed.rfindex).remove();
                    $('#novideo'+remoteFeed.rfindex).remove();
                    $('#curbitrate'+remoteFeed.rfindex).remove();
                    $('#curres'+remoteFeed.rfindex).remove();*/
                    if(self.bitrateTimer[remoteFeed.rfindex] !== null && self.bitrateTimer[remoteFeed.rfindex] !== null) 
                        clearInterval(self.bitrateTimer[remoteFeed.rfindex]);
                        self.bitrateTimer[remoteFeed.rfindex] = null;
                   /* remoteFeed.simulcastStarted = false;
                    $('#simulcast'+remoteFeed.rfindex).remove();*/
                }
            });
    } 












    /*
        Called from the UI.
        When a session is active, it will register a username & join a room (positive number).
    */
    register_user_on_session(username: string, room: number): boolean {
        if (username.length === 0 || username === "") {
            // todo: ui warning
            return false;
        } else if (/[^a-zA-Z0-9]/.test(username)) {
            // only alphanumeric input
            // todo: ui warning
            return false;
        } else {
            var register = { "request": "join", "room": room, "ptype": "publisher", "display": username };
            this.username = username;
            this.room = room;
            this.sfutest.send({ "message": register });
            this.log.d(`Registered with username: ${username} & joined room ${room}`);
        }
    }

    /*
        Called from the UI.
        When a session is active, and the streamer wishes to start a stream.
    */
    publish_own_stream(useAudio): void {
        // todo: disable publish button after click
        // $('#publish').attr('disabled', true).unbind('click');
        let self = this;
        this.sfutest.createOffer(
            {
                // Add data:true here if you want to publish datachannels as well
                media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: true },	// Publishers are sendonly
                // If you want to test simulcasting (Chrome and Firefox only), then
                // pass a ?simulcast=true when opening this demo page: it will turn
                // the following 'simulcast' property to pass to janus.js to true
                simulcast: this.doSimulcast,
                success: function (jsep) {
                    Janus.debug("Got publisher SDP!");
                    Janus.debug(jsep);
                    var publish = { "request": "configure", "audio": useAudio, "video": true };
                    // You can force a specific codec to use when publishing by using the
                    // audiocodec and videocodec properties, for instance:
                    // 		publish["audiocodec"] = "opus"
                    // to force Opus as the audio codec to use, or:
                    // 		publish["videocodec"] = "vp9"
                    // to force VP9 as the videocodec to use. In both case, though, forcing
                    // a codec will only work if: (1) the codec is actually in the SDP (and
                    // so the browser supports it), and (2) the codec is in the list of
                    // allowed codecs in a room. With respect to the point (2) above,
                    // refer to the text in janus.plugin.videoroom.cfg for more details

                    /*
                     In this particular case, we have to have self.sfutest, because this lives
                     inside sfutest itself, so the scope of 'this' changes.
                     */
                    self.sfutest.send({ "message": publish, "jsep": jsep });
                },
                error: function (error) {
                    Janus.error("WebRTC error:", error);
                    if (useAudio) {
                        this.publish_own_stream(false);
                    } else {
                        // TODO: display error to user.
                        // Janus.debug("WebRTC error... " + JSON.stringify(error));
                        // TODO: re-enable the publish button
                        //$('#publish').removeAttr('disabled').click(function() { this.publish_own_stream(true); });
                    }
                }
            });
    }


    ui_onPlayingSetResolution(videoElement: any): void {
        let width = videoElement.videoWidth;
        let height = videoElement.videoHeight;
        this.currentResolution = width+'x'+height;
        /*  // electron is chrome, don't mind this
        if(Janus.webRTCAdapter.browserDetails.browser === "firefox") {
            // Firefox Stable has a bug: width and height are not immediately available after a playing
            setTimeout(function() {
                let width = this.remotevideo.nativeElement.videoWidth;
                let height = this.remotevideo.nativeElement.videoHeight;
                $('#curres'+remoteFeed.rfindex).removeClass('hide').text(width+'x'+height).show();
            }, 2000);
        }*/
    }
}