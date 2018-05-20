import { Component, OnInit } from '@angular/core';
import {grpcService} from '../grpc/grpc.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  constructor(
    private grpc: grpcService
  ) { }

  ngOnInit(){
    this.grpc.getRoomById();
  }

 }