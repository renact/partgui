import { Injectable, ElementRef } from '@angular/core';
import { Log } from 'ng2-logger';

import { JanusService } from './janus.service';
import { BehaviorSubject } from 'rxjs';
import { PluginService } from 'app/stream/janus/plugin.service';

@Injectable()
export class PublisherService extends PluginService {
  /*  General   */
  private log: any = Log.create('publisher.service');
  /* Details */
  private localstream: any;
  private myid: any;
  private privateId: any;
  private doSimulcast: boolean = false;

  /* Stream */
  public stream = new BehaviorSubject(false);

  constructor(
    private janusConnection_: JanusService
  ) {
    super(janusConnection_);
  }


  /*
      TODO (kewde): remove the bullshit bits
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
          // attach to all remote feeds
          // this.janus_attach_to_remote_feeds(msg['publishers']);
          // TODO (kewde): remove this completely and figure out which events are needed.
        }
      } else if (event === "destroyed") {
        // The room has been destroyed
        Janus.warn("The room has been destroyed!");
        // TODO (kewde): alert that room has been destroyed and move back to the overview.

      } else if (event === "event") {
        // Any new feed to attach to?
        if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
          // attach to all remote feeds
          // this.janus_attach_to_remote_feeds(msg['publishers']);
          // TODO (kewde): remove this completely and figure out which events are needed.

        } else if (msg["leaving"] !== undefined && msg["leaving"] !== null) {
          // One of the publishers has gone away?
          var leaving = msg["leaving"];
          Janus.log("Publisher left: " + leaving);

        } else if (msg["unpublished"] !== undefined && msg["unpublished"] !== null) {
          // One of the publishers has unpublished?
          let unpublished = msg["unpublished"];
          Janus.log("Publisher unpublished : " + unpublished);
          if (unpublished === 'ok') {
            // That's us
            this.sfutest.hangup();
            return;
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
        // TODO (kewde): Hide the webcam video
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

    this.stream.next(stream);

    /*
    // TODO (kewde): maybe delete this shizzle, just loading stuff
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
        // TODO (kewde): error no webcam
    } else {
        $('#videolocal .no-video-container').remove();
        $('#myvideo').removeClass('hide').show();
    }*/
  }

  janus_onremotestream(stream: any): void {
    // noop: publisher service
  }

  janus_oncleanup() {
    Janus.log(" ::: Got a cleanup notification (own feed " + this.myid + ") :::");
    this.stream.next(false);
  }


  /*
    Create room & join with username
  */
  public api_initialize_publisher(username: string, room: number) {
    // this.api_initialize_plugin();
    this.life.skip(1).take(1).subscribe(
      alive => alive ? this.api_register_user_on_session_plugin(username, room, 'publisher') : false // noop if false
    );
  }

  /*
      Called from the UI.
      When a session is active, and the streamer wishes to start a stream.
  */
  public api_start_stream(useAudio): void {
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
            self.api_start_stream(false);
          } else {
            // TODO: display error to user.
            // Janus.debug("WebRTC error... " + JSON.stringify(error));
            // TODO (kewde): re-enable the publish button
            //$('#publish').removeAttr('disabled').click(function() { this.publish_own_stream(true); });
          }
        }
      });
  }

  api_unpublish_stream(): void {
    // Unpublish our stream
    var unpublish = { "request": "unpublish" };
    this.sfutest.send({"message": unpublish});
  }

  api_quit_stream(): void {
    this.api_destroy_janus();
  }

  ngOnDestroy() {
    // destroy plugin service first
    super.ngOnDestroy();
    this.log.d('Destroying publisher service');
  }

}
