import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule,ReactiveFormsModule }  from '@angular/forms';
import { GrpcService } from '../grpc/grpc.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html'
})
export class PreviewComponent {
    /* Form */
    roomForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private grpc: GrpcService
  ) {
    this.roomForm = this.formBuilder.group({
      'id': ['', Validators.required]
    });
  }

  joinRoom() {
    if (this.roomForm.dirty && this.roomForm.valid) {
      this.grpc.getRoomById(this.roomForm.value.id).then(res => {
        console.log(res)
      }).catch((err) => {
        console.log("Error occured: " + err);
      });
      console.log(`Join room: ${this.roomForm.value.id}`)
    }
  }

  mouseEnter(video : any){
    video.play();
  }

  mouseLeave(video : any){
    video.pause();
    video.currentTime = '0';
  }

}