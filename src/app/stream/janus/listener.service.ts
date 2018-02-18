import { Injectable } from '@angular/core';
import { PluginService } from 'app/stream/janus/plugin.service';
import { JanusService } from 'app/stream/janus/janus.service';
import { Log } from 'ng2-logger';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';


@Injectable()
export class ListenerService extends PluginService {
  /*  General   */
  private log_l: any = Log.create('listener.service');

  public id: any;
  public display: any;
  public privateId: any;

  public stream: BehaviorSubject<any> = new BehaviorSubject(false);
  private bitrateTimer: Subscription;
  private currentBitRate: BehaviorSubject<any> = new BehaviorSubject(0);

  constructor(
    private janusConnection__: JanusService
  ) {
    super(janusConnection__);
    this.log_l.d('A new listener service has been instanciated!');
  }

  janus_onmessage(msg, jsep): void {
    Janus.debug(" ::: Got a message (listener) :::");
    Janus.debug(msg);
    let remoteFeed = this.sfutest;
    var event = msg["videoroom"];
    Janus.debug("Event: " + event);
    if (msg["error"] !== undefined && msg["error"] !== null) {
      // bootbox.alert(msg["error"]);
    } else if (event != undefined && event != null) {
      if (event === "attached") {
        // Subscriber created and attached
        this.id = msg["id"];
        this.log_l.d('Created new ListenerService for id=' + this.id);
        this.display = msg["display"];
        Janus.log("Successfully attached to feed " + this.id + " (" + this.display + ") in room " + msg["room"]);
        //$('#remote'+remoteFeed.rfindex).removeClass('hide').html(remoteFeed.rfdisplay).show();
      } else if (event === "event") {
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
    if (jsep !== undefined && jsep !== null) {
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
          success: function (jsep) {
            Janus.debug("Got SDP!");
            Janus.debug(jsep);
            let body = { "request": "start", "room": this.room };
            remoteFeedRef.send({ "message": body, "jsep": jsep });
          },
          error: function (error) {
            Janus.error("WebRTC error:", error);
            // bootbox.alert("WebRTC error... " + JSON.stringify(error));
          }
        });
    }
  }

  janus_onlocalstream(stream) {
    // noop
  }

  /*
    TODO (kewde):  this is being called twice, maybe once for audio and once for video?
  */
  janus_onremotestream(stream) {
    Janus.debug("Remote feed id = " + this.id);
    this.log_l.d(`onremotestream called`);
    // we got a stream!
    this.stream.next(stream);


    var videoTracks = stream.getVideoTracks();
    if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0 || videoTracks[0].muted) {
      // No remote video
      // TODO: handle this properly
    }

    if (Janus.webRTCAdapter.browserDetails.browser === "chrome" || Janus.webRTCAdapter.browserDetails.browser === "firefox" ||
      Janus.webRTCAdapter.browserDetails.browser === "safari") {
      
      this.log_l.d(`Starting bitrateTimer`);
      // Make sure to clear the timer before starting a new one
      if(this.bitrateTimer) {
        this.bitrateTimer.unsubscribe();
      }
      this.bitrateTimer = Observable.interval(1000).subscribe(
        () => {
          // Display updated bitrate, if supported
          this.currentBitRate = this.sfutest.getBitrate();
          this.log_l.d(`currentBitRate = ${this.currentBitRate}`);
          // Check if the resolution changed too
          // TODO (kewde): do this properly
        }
      );

    }
  }


  janus_oncleanup() {
    Janus.log(" ::: Got a cleanup notification (remote feed " + this.id + ") :::");
    /*
    if(remoteFeed.spinner !== undefined && remoteFeed.spinner !== null)
        remoteFeed.spinner.stop();
    remoteFeed.spinner = null;*/
    /* $('#remotevideo'+remoteFeed.rfindex).remove();
     $('#waitingvideo'+remoteFeed.rfindex).remove();
     $('#novideo'+remoteFeed.rfindex).remove();
     $('#curbitrate'+remoteFeed.rfindex).remove();
     $('#curres'+remoteFeed.rfindex).remove();*/
    this.bitrateTimer.unsubscribe();
    // this.bitrateTimer = null;
    /* remoteFeed.simulcastStarted = false;
     $('#simulcast'+remoteFeed.rfindex).remove();*/

  }

  api_detach_listener(): void {
    this.sfutest.detach();
  }
}
