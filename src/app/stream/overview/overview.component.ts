import { Component, OnInit } from '@angular/core';
import {GrpcService} from '../grpc/grpc.service';
import { TokenService } from '../token/token.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  constructor(
    private grpc: GrpcService,
    private tokenService: TokenService
  ) { }

  ngOnInit(){
    // this.grpc.getRoomById();
    // this.grpc.createRoom();
    // this.grpc.updateRoom();
    // this.grpc.deleteRoom();
    //this.grpc.getAllRooms();
    this.getIt();
    console.log(this.tokenService.setToken("url", "room", "token"));
  }
  public async getIt(){
    console.log("token " + await this.tokenService.getToken("url", "room"));
  }
 }