import { Component, OnInit } from '@angular/core';
import {GrpcService} from '../grpc/grpc.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  constructor(
    private grpc: GrpcService
  ) { }

  ngOnInit(){
    this.grpc.getRoomById();
  }

 }