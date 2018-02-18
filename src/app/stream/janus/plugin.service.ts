import { Injectable } from '@angular/core';
import { JanusService } from 'app/stream/janus/janus.service';
import { Log } from 'ng2-logger';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export abstract class PluginService implements OnDestroy {
  /*  General   */
  private log_p: any = Log.create('plugin.service');

  /* Details */
  username: string;
  room: number;
  ptype: string;
  /* Settings */
  private opaqueId: string = "videoroomtest-" + Janus.randomString(12);

  /* Plugin Handle */
  sfutest: any;

  /* Life */
  public life = new BehaviorSubject(false);

  /* overrride these */
  abstract janus_onlocalstream(stream: any): void;
  abstract janus_onremotestream(stream: any): void;
  abstract janus_onmessage(msg: any, jsep: any): void;
  abstract janus_oncleanup(): void;

  destroyed: boolean = false;
  initialized: boolean = false;

  constructor(
    private janusConnection: JanusService
  ) { 
    this.api_initialize_plugin();
  }

  api_initialize_plugin() {
    this.janusConnection.life_j
      .takeWhile(() => !this.destroyed || !this.initialized) // take until destroyed or initialized
      .subscribe(
      (alive) => {
        if (alive) {
          this.janus_attach_videoroom_plugin();
          this.initialized = true;
        }
      }
      );
  }

  /*
    Attach a video room plugin to te session.
  */
  janus_attach_videoroom_plugin(): void {
    this.log_p.d("Janus: server connected, we can attach the publisher video room plugin");
    // Attach to video room test plugin

    this.janusConnection.janus.attach(
      {
        plugin: "janus.plugin.videoroom",
        opaqueId: this.opaqueId,
        success: this.janus_attach_videoroom_plugin_success.bind(this),
        error: function (error) {
          Janus.error("  -- Error attaching plugin...", error);
        },
        consentDialog: this.janus_consent_dialog.bind(this),
        mediaState: function (medium, on) {
          Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
        },
        webrtcState: this.janus_attach_videoroom_plugin_webRtcState.bind(this),
        onmessage: this.janus_onmessage.bind(this),
        onlocalstream: this.janus_onlocalstream.bind(this),
        onremotestream: this.janus_onremotestream.bind(this),
        oncleanup: this.janus_oncleanup.bind(this)
      });
  }

  janus_attach_videoroom_plugin_success(pluginHandle: any): void {
    this.sfutest = pluginHandle;
    Janus.log("Plugin attached! (" + this.sfutest.getPlugin() + ", id=" + this.sfutest.getId() + ")"); 1

    // plugin is good to go!
    this.life.next(true);

  }

  /*
      TODO: Shouldn't be required in electron, automatically grants consent..
  */
  janus_consent_dialog(on: any): void {
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
      When a session is active, it will register a username & join a room (positive number).
  */
  public api_register_user_on_session_plugin(username: string, room: number, ptype: string): boolean {
    if (username.length === 0 || username === "") {
      // todo: ui warning
      return false;
    } else if (/[^a-zA-Z0-9]/.test(username)) {
      // only alphanumeric input
      // todo: ui warning
      return false;
    } else if (!['listener', 'publisher'].includes(ptype)) {
      // invalid ptype
      return false;
    } else {

      // set state
      this.username = username;
      this.room = room;
      this.ptype = ptype;
    
      var register = { "request": "join", "room": room, "ptype": ptype, "display": username };
      this.sfutest.send({ "message": register });
      this.log_p.d(`Registered with username: ${username} & joined room ${room}`);
      return true;
    }
  }

  public api_register_as_listener(id, room, privateId, video) {
    this.log_p.d(`Registering this plugin as a listener!`);
    // A new feed has been published, create a new plugin handle and attach to it as a listener
    let remoteFeed = this.sfutest;
    // remoteFeed.simulcastStarted = false;
    Janus.log("Remote Feed: Plugin attached! (" + remoteFeed.getPlugin() + ", id=" + remoteFeed.getId() + ")");
    Janus.log("  -- This is a subscriber");
    // We wait for the plugin to send us an offer
    let listen = { "request": "join", "room": room, "ptype": "listener", "feed": id, "private_id": privateId };
    this.log_p.d(listen);
    // In case you don't want to receive audio, video or data, even if the
    // publisher is sending them, set the 'offer_audio', 'offer_video' or
    // 'offer_data' properties to false (they're true by default), e.g.:
    // 		listen["offer_video"] = false;
    // For example, if the publisher is VP8 and this is Safari, let's avoid video
    if (video !== "h264" && Janus.webRTCAdapter.browserDetails.browser === "safari") {
      if (video)
        video = video.toUpperCase()
      // TODO: handle error here: snackbar
      // toastr.warning("Publisher is using " + video + ", but Safari doesn't support it: disabling video");
      listen["offer_video"] = false;
    }
    remoteFeed.send({ "message": listen });
  }

  api_destroy_janus(): void {
    this.janusConnection.api_destroy_janus();
  }

  ngOnDestroy() {
    this.log_p.d('Destroying plugin service!');
    this.destroyed = true;
  }
}
