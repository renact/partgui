import { Injectable } from '@angular/core';
import { grpc} from "grpc-web-client";
import { RoomManager, RoomManagerClient } from "../../../../grpc/compiled/room_pb_service";
import { RoomByIdReply, Empty, AllRoomsReply, CreateRoomRequest, UpdateRoomRequest, DeleteRoomRequest, RoomByIdRequest, Room} from '../../../../grpc/compiled/room_pb';

const host = "http://127.0.0.1:8080";
const client = new RoomManagerClient("http://127.0.0.1:8080");

@Injectable()
export class GrpcService {

  constructor() { }

  getAllRooms(){
    const allroomsRequest = new Empty();
    grpc.unary(RoomManager.GetAllRooms, {
      request: allroomsRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          console.log("Get all rooms: ", message.toObject());
        }
      }
    });
  }

  getRoomById(id: string) {
    const roomByIdRequest = new RoomByIdRequest();
    roomByIdRequest.setId(id);
    grpc.unary(RoomManager.GetRoomById, {
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

  createRoom(id: string, name: string, serverUrl: string, token: string){
    const createRoomRequest = new CreateRoomRequest();
    const room = new Room()
    room.setId(id);
    room.setName(name);
    room.setServerurl(serverUrl);
    createRoomRequest.setRoom(room);
    grpc.unary(RoomManager.CreateRoom, {
      request: createRoomRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          console.log("Created room: ", message.toObject());
        }
      }
    });
  }

  updateRoom(id: string, name: string, serverUrl: string, token: string){
    const updateRoomRequest = new UpdateRoomRequest();
    const room = new Room()
    room.setId(id);
    room.setName(name);
    room.setServerurl(serverUrl);
    updateRoomRequest.setRoom(room);
    grpc.unary(RoomManager.UpdateRoom, {
      request: updateRoomRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          console.log("Updated room: ", message.toObject());
        }
      }
    });
  }

  deleteRoom(id: string, name: string, serverUrl: string){
    const deleteRoomRequest = new DeleteRoomRequest();
    const room = new Room()
    room.setId(id);
    room.setName(name);
    room.setServerurl(serverUrl);
    deleteRoomRequest.setRoom(room);
    grpc.unary(RoomManager.DeleteRoom, {
      request: deleteRoomRequest,
      host: host,
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          console.log("Deleted room: ", message.toObject());
        }
      }
    });
  }

}
