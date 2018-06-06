import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Inject } from '@angular/core';
import { PublisherService } from 'app/stream/janus/publisher.service';
import { JanusService } from 'app/stream/janus/janus.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { GrpcService } from '../grpc/grpc.service';
import { TokenService } from '../token/token.service';


@Component({
  selector: 'app-start-stream',
  templateUrl: './start-stream.component.html',
  styleUrls: ['./start-stream.component.scss'],
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
  editRoomForm: any;

  roomCreated: boolean = false;

  publisher: PublisherService;

  constructor(
    private formBuilder: FormBuilder,
    private grpc: GrpcService,
    private tokenService: TokenService,
  ) {

    // launch new publisher server with Janus Server URL.
    this.publisher = new PublisherService("https://janus.conf.meetecho.com/janus");

    this.roomForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'password': ['', [Validators.required]],
    });

    this.editRoomForm = this.formBuilder.group({
      'name': ['', Validators.required],
    });

   }

   ngOnInit() {
 
     this.publisher.stream.takeWhile(() => !this.destroyed).subscribe(stream => this.loadStream(stream));
     this.publisher.life.takeWhile(() => !this.destroyed)
     .subscribe(
       alive => this.life_plugin = alive,
       error => console.log("Subscribe error: " + error)
     );
 
     this.publisher.api_initialize_publisher('testr856', 1234);
   }

  createRoom() {
    if (this.roomForm.dirty && this.roomForm.valid) {
      this.grpc.createRoom('1234', this.roomForm.value.name, 'url', this.roomForm.value.password).then(res => {
        this.roomCreated = true;
        this.addToken('url','1234', this.roomForm.value.password, this.roomForm.value.name);
      }).catch((err) => {
        console.log('Error occured: ' + err.message);
      });
      console.log(`Create room:" ${this.roomForm.value.name}`)
    }
  }

  addToken( url: string, room: string, password: string, name: string){
    var token = "pwHash"
    this.tokenService.setToken(url, room, password).then(res => {
      console.log("token created");
    }).catch((err) => {
      console.log('Error occured: ' + err);
    });
  }

  editRoom() {
    if (this.editRoomForm.dirty && this.editRoomForm.valid) {
      this.grpc.updateRoom('1234', this.editRoomForm.value.name, 'url', 'token').then(res => {
        this.roomCreated = true;
        console.log(res);
      }).catch((err) => {
        console.log('Error occured: ' + JSON.stringify(err.metadata));
      });
      console.log(`Create room: ${this.roomForm.value.name}`)
    }
  }

  loadStream(stream: any): void {
    console.log("load");
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
