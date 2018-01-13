import { Component } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html'
})
export class PreviewComponent {

  mouseEnter(video : any){
    video.play();
  }

  mouseLeave(video : any){
    video.pause();
    video.currentTime = '0';
  }

}