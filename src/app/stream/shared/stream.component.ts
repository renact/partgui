import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Log } from 'ng2-logger';

@Component({
    selector: 'vid-stream',
    templateUrl: './stream.component.html'
})
export class StreamComponent implements OnInit {
    /*  General   */
    private log: any = Log.create('stream.component');

    @Input() stream: any;

    currentResolution: string = "";
    currentBitRate: any = "";

    /* DOM element references */
    @ViewChild("video", { read: ElementRef }) video: ElementRef;

    ngOnInit(): void {
        this.log.d('vid-stream created!');
        if (this.stream) {
            this.log.d('attaching stream: ' + this.stream);
            Janus.attachMediaStream(this.video.nativeElement, this.stream);
        }
    }

}