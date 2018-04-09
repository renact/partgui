import { Injectable, OnDestroy } from '@angular/core';
import { JanusService } from 'app/stream/janus/janus.service';
import { BehaviorSubject } from 'rxjs';
import { Log } from 'ng2-logger';

import { ListenerService } from 'app/stream/janus/listener.service';
import { PluginService } from 'app/stream/janus/plugin.service';

@Injectable()
export class WatchService extends PluginService implements OnDestroy {

  /*  General   */
  private log: any = Log.create('watch.service');

  /* Details */
  private max_number_of_streams_in_room: number = 1;
  private remotestream: any;
  private myid: any;
  private privateId: any;
  private doSimulcast: boolean = false;

  // all the feeds (= streams) we're watching (should just be 1 tbh)
  private feeds: Map<number, ListenerService> = new Map();
  public streams: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(
    private janusConnection_: JanusService
  ) {
    super(janusConnection_);
  }

  janus_onlocalstream(stream: any): void {
    // noop: publisher service
  }

  janus_onmessage(msg: any, jsep: any): void {
    Janus.debug(" ::: Got a message (watcher) :::");
    Janus.debug(msg);
    let event = msg["videoroom"];
    Janus.debug("Event: " + event);
    if (event != undefined && event != null) {
      if (event === "joined") {
        // manager created, negotiate WebRTC and attach to existing feeds, if any
        this.myid = msg["id"];
        this.privateId = msg["private_id"];
        Janus.log("Successfully joined room " + msg["room"] + " with ID " + this.myid);

        // Any new feed to attach to?
        if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
          // attach to all remote feeds
          this.janus_attach_to_remote_feeds(msg['publishers']);
        }
      } else if (event === "destroyed") {
        // The room has been destroyed
        Janus.warn("The room has been destroyed!");
        // TODO (kewde): alert that room has been destroyed and move back to the overview.

      } else if (event === "event") {
        // Any new feed to attach to?
        if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
          // attach to all remote feeds
          this.janus_attach_to_remote_feeds(msg['publishers']);

        } else if (msg["leaving"] !== undefined && msg["leaving"] !== null) {
          // One of the publishers has gone away?
          var leaving = msg["leaving"];
          Janus.log("Publisher left: " + leaving);
          this.janus_detach_remote_feed(leaving);

        } else if (msg["unpublished"] !== undefined && msg["unpublished"] !== null) {
          // One of the publishers has unpublished?
          let unpublished = msg["unpublished"];
          Janus.log("Publisher unpublished : " + unpublished);
          if (unpublished === 'ok') {
            // That's us
            this.sfutest.hangup();
            return;
          }
          this.janus_detach_remote_feed(unpublished);

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
  }

  /*
      When a new publisher joins the videoroom or we just joined and got a list of feeds.
  */
  janus_attach_to_remote_feeds(feedList: any): void {
    // Any new feed to attach to?
    if (feedList !== undefined && feedList !== null) {
      let list = feedList;
      Janus.debug("Got a list of available publishers/feeds:");
      Janus.debug(list);
      for (let f in list) {
        let id = list[f]["id"];
        let display = list[f]["display"];
        let audio = list[f]["audio_codec"];
        let video = list[f]["video_codec"];
        Janus.debug("  >> [" + id + "] " + display + " (audio: " + audio + ", video: " + video + ")");
        this.janus_create_new_listener_to_feed(id, display, audio, video);
      }
    }
  }

  // TODO (kewde): what does adio do?
  janus_create_new_listener_to_feed(id: any, display: any, audio: any, video: any): void {
    this.log.d('Creating new feed');
    let feedLength = this.feeds.size;
    this.log.d('length of feed=' + feedLength);
    if (feedLength < this.max_number_of_streams_in_room) {
      this.log.d('Creating new ListenerService for id=' + id);
      let newFeed: ListenerService = new ListenerService(this.janusConnection_);
      // add Listener
      this.feeds.set(id, newFeed);
      // wait for feed is alive
      newFeed.life.skip(1).take(1).subscribe(
        (alive) => {
          if (alive) {
            newFeed.api_register_as_listener(id, this.room, this.privateId, video) 
          }
        }
      );
      newFeed.stream.subscribe(
        stream => this.streams.next(this.api_get_all_streams()) // update all streams
      );
    } else {
      // max amount of active streams reached within a room
    }
  }

  /*
      Detach a remote feed by id.
  */
  janus_detach_remote_feed(id: any) {
    let feed: ListenerService = this.feeds.get(id);
    if (feed != null) {
      Janus.debug("Feed " + feed.id + " (" + feed.display + ") has left the room, detaching");
      // Cleanly detach the listener, keep server happy :)
      feed.api_detach_listener();
      this.feeds.delete(id);
      // update the streams
      this.streams.next(this.api_get_all_streams());
    } else {
      this.log.error('Unable to retrieve the feed, was not in the feed list!');
    }
  }

  janus_onremotestream(stream: any): void {
  }

  janus_oncleanup() {
    Janus.log(" ::: Got a cleanup notification (watcher) :::");
  }

  /*
    Create room & join with username
  */
  public api_join_room(username: string, room: number): boolean {
    // check if plugin is alive first..
    let alive = this.life.getValue();
    if (alive) {
      this.api_register_user_on_session_plugin(username, room, 'publisher');
    } 

    return alive;
  }

  /*
    Get a list of all stream objects.
  */
  public api_get_all_streams(): Array<any> {
    let streams: Array<any> = [];
    this.feeds.forEach(function(value) {
      if (value.stream) {
        streams.push(value.stream.getValue());
      }
    });
    return streams;
  }

  ngOnDestroy() {
    // destroy plugin service
    super.ngOnDestroy();
    
    this.log.d('Destroying watch service');
    // manually call on destroy on the listener plugins
    this.feeds.forEach(
      (listener) => {
        listener.ngOnDestroy();
      }
    );


  }
}
