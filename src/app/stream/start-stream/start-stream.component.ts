import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { PublisherService } from 'app/stream/janus/publisher.service';
import { JanusService } from 'app/stream/janus/janus.service';

@Component({
  selector: 'app-start-stream',
  templateUrl: './start-stream.component.html',
  styleUrls: ['./start-stream.component.scss'],
  providers: [JanusService, PublisherService]
})
export class StartStreamComponent implements OnInit, OnDestroy {

  /* Plugin state */
  private life_plugin: boolean;

  /* StartStream destroyed? */
  private destroyed: boolean = false;

  /* DOM element references */
  @ViewChild("localvideo", { read: ElementRef }) localvideo: ElementRef;

  constructor(
    private publisher: PublisherService
  ) { }

  ngOnInit() {

    this.publisher.stream.takeWhile(() => !this.destroyed).subscribe(stream => this.loadStream(stream));
    this.publisher.life.takeWhile(() => !this.destroyed).subscribe(alive => this.life_plugin = alive);

    this.publisher.api_initialize_publisher('testr856', 1234);
  }

  loadStream(stream: any): void {
    if (stream) {
      Janus.attachMediaStream(this.localvideo.nativeElement, stream);
    }
  }

  startStreaming() {
    if (this.life_plugin) {
      this.publisher.api_start_stream(true);
    }
  }

  stopStreaming() {
    if (this.life_plugin) {
      this.publisher.api_unpublish_stream();
    }
  }

  quitRoom() {
    if (this.life_plugin) {
      this.publisher.api_quit_stream();
    }
  }

  ngOnDestroy() {
    this.destroyed = true;
    this.stopStreaming();
    this.publisher.api_destroy_janus();
  }
}
