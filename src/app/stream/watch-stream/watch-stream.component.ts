import { Component, OnInit } from '@angular/core';

import { JanusService } from 'app/stream/janus/janus.service';
import { WatchService } from 'app/stream/janus/watch.service';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-watch-stream',
  templateUrl: './watch-stream.component.html',
  styleUrls: ['./watch-stream.component.scss'],
  providers: [JanusService, WatchService]
})
export class WatchStreamComponent implements OnInit {

  /*  General   */
  private log: any = Log.create('watch-stream.component');
  private destroyed = false;

  streams: Array<any> = [];

  constructor(
    private watchService: WatchService
  ) { }

  ngOnInit() {
    this.watchService.streams.takeWhile(() => !this.destroyed).subscribe(
      (streams) => {
        this.log.d('updating streams');
        console.log(streams);
        this.streams = streams
      }
    );
  }

  joinRoom() {
    this.watchService.api_join_room('trdfs', 1234);
  }

  ngOnDestroy() {
    this.destroyed = true;
  }

}
