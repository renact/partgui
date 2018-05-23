import { Injectable } from '@angular/core';
import {grpc} from "grpc-web-client";
import {Room} from "./compiled-proto/room_pb_service";
import {RoomByIdRequest} from "./compiled-proto/room_pb";
import { RoomByIdReply, Empty, AllRoomsReply, CreateRoomRequest, UpdateRoomRequest, DeleteRoomRequest } from '../../../../grpc/node/static_codegen/room_pb';

const host = "http://127.0.0.1:8080";

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
          console.log("Get room by id: ", message.toObject());
        }
      }
    });
  }

  createRoom(){
    const createRoomRequest = new CreateRoomRequest();
    createRoomRequest.setId('1');
    createRoomRequest.setName('first');
    createRoomRequest.setServerurl('url');
    createRoomRequest.setPassword('test');
    grpc.unary(Room.CreateRoom, {
      request: createRoomRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          console.log("Create room: ", message.toObject());
        }
      }
    });
  }

  updateRoom(){
    const updateRoomRequest = new UpdateRoomRequest();
    updateRoomRequest.setId('1');
    updateRoomRequest.setName('first');
    updateRoomRequest.setServerurl('url');
    updateRoomRequest.setPassword('test');
    grpc.unary(Room.UpdateRoom, {
      request: updateRoomRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          console.log("Update room: ", message.toObject());
        }
      }
    });
  }

  deleteRoom(){
    const deleteRoomRequest = new DeleteRoomRequest();
    deleteRoomRequest.setId('1');
    grpc.unary(Room.DeleteRoom, {
      request: deleteRoomRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          console.log("Delete room: ", message.toObject());
        }
      }
    });
  }

}
