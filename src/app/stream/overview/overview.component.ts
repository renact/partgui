import { Component, OnInit } from '@angular/core';
import {GrpcService} from '../grpc/grpc.service';
import { TokenService } from '../token/token.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  rooms: any;

  constructor(
    private grpc: GrpcService,
    private tokenService: TokenService
  ) { }

  ngOnInit(){
    this.grpc.getAllRooms().then(res => {
      this.rooms = res["roomsList"];
    }).catch((err) => {
      console.log(err);
    });

    this.getToken();
    console.log(this.tokenService.setToken("url", "room", "token"));
  }
  public async getToken(){
    console.log("token " + await this.tokenService.getToken("url", "room"));
  }
 }