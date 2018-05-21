import { Injectable } from '@angular/core';
import {grpc} from "grpc-web-client";
import {Room} from "./compiled-proto/room_pb_service";
import {RoomByIdRequest} from "./compiled-proto/room_pb";
import { RoomByIdReply, Empty, AllRoomsReply } from '../../../../grpc/node/static_codegen/room_pb';

const host = "http://127.0.0.1:50051";

@Injectable()
export class GrpcService {

  constructor() { }

  getRoomById() {
    const roomByIdRequest = new RoomByIdRequest();
    roomByIdRequest.setId('1234');
    grpc.unary(Room.GetRoomById, {
      request: roomByIdRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          console.log("all ok. got room: ", message.toObject());
        }
        else{
          console.log("hoi");
        }
      }
    });
  }
}
