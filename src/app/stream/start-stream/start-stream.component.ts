import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Inject } from '@angular/core';
import { PublisherService } from 'app/stream/janus/publisher.service';
import { JanusService } from 'app/stream/janus/janus.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { GrpcService } from '../grpc/grpc.service';
import { TokenService } from '../token/token.service';
import hash from 'hash.js'


@Component({
  selector: 'app-start-stream',
  templateUrl: './start-stream.component.html',
  styleUrls: ['./start-stream.component.scss'],
  providers: [JanusService, PublisherService],

})
export class StartStreamComponent implements OnInit, OnDestroy {

  /* Plugin state */
  private life_plugin: boolean;

  /* StartStream destroyed? */
  private destroyed: boolean = false;

  /* DOM element references */
  @ViewChild("localvideo", { read: ElementRef }) localvideo: ElementRef;

  /* Form */
  roomForm: any;

  roomCreated: boolean = false;

  constructor(
    private publisher: PublisherService,
    private formBuilder: FormBuilder,
    private grpc: GrpcService,
    private tokenService: TokenService
  ) {
    this.roomForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'password': ['', [Validators.required]],
    });

   }

  createRoom() {
    if (this.roomForm.dirty && this.roomForm.valid) {
      this.grpc.createRoom('1234', this.roomForm.value.name, 'url', this.roomForm.value.password).then(res => {
        this.addToken('url','1234', this.roomForm.value.password, this.roomForm.value.name);
        console.log("hi");
      });
      // this.grpc.createRoom('1234', this.roomForm.value.name, 'url', this.roomForm.value.password).then(function(){
      //   console.log("nice");
      // }).catch(function(){
      //   console.log("not so nice");
      // });
      console.log(`Create room:" ${this.roomForm.value.name}`)
    }
  }

  addToken( url: string, room: string, password: string, name: string){
    var token = hash.sha256().update(password).digest('hex');
    this.tokenService.setToken(url, room, token.toString());
  }

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
    this.roomCreated = false;
  }

  ngOnDestroy() {
    this.destroyed = true;
    this.stopStreaming();
    this.publisher.api_destroy_janus();
  }
}
