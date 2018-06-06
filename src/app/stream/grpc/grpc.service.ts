import { Injectable } from '@angular/core';
import { grpc} from "grpc-web-client";
import { RoomManager, RoomManagerClient } from "../../../../grpc/compiled/room_pb_service";
import { RoomByIdReply, Empty, AllRoomsReply, CreateRoomRequest, UpdateRoomRequest, DeleteRoomRequest, RoomByIdRequest, Room} from '../../../../grpc/compiled/room_pb';

@Injectable()
export class GrpcService {

  client = new RoomManagerClient("http://127.0.0.1:8080");

  constructor() { }

  getAllRooms(){
    return new Promise((resolve, reject) => {
      const allroomsRequest = new Empty();
      this.client.getAllRooms(allroomsRequest, (err, result) => {
        if (err){
          reject(err);
        } else{
          resolve(result.toObject());
        } 
      });
    });
  }

  getRoomById(id: string) {
    return new Promise((resolve, reject) => {
      const roomByIdRequest = new RoomByIdRequest();
      roomByIdRequest.setId(id);
      this.client.getRoomById(roomByIdRequest, (err, result) => {
        if (err){
          reject(err);
        } else{
          resolve(result.toObject());
        } 
      });
    });
  }

  createRoom(id: string, name: string, serverUrl: string, token: string) : Promise<any>{
    return new Promise((resolve,reject) => {
      const createRoomRequest = new CreateRoomRequest();
      const room = new Room()
      room.setId(id);
      room.setName(name);
      room.setServerurl(serverUrl);
      createRoomRequest.setRoom(room);
      this.client.createRoom(createRoomRequest, (err,result) => {
        if (err){
          reject(err);
        } else{
          resolve(result.toObject());
        } 
      });
    });
  }

  updateRoom(id: string, name: string, serverUrl: string, token: string){
    return new Promise((resolve, reject) => {
      const updateRoomRequest = new UpdateRoomRequest();
      const room = new Room()
      room.setId(id);
      room.setName(name);
      room.setServerurl(serverUrl);
      updateRoomRequest.setRoom(room);
      this.client.updateRoom(updateRoomRequest, (err, result) => {
        if (err){
          reject(err);
        } else{
          resolve(result.toObject());
        } 
      });
    });
  }

  deleteRoom(id: string, name: string, serverUrl: string){
    return new Promise((resolve,reject) => {
      const deleteRoomRequest = new DeleteRoomRequest();
      const room = new Room()
      room.setId(id);
      room.setName(name);
      room.setServerurl(serverUrl);
      deleteRoomRequest.setRoom(room);
      this.client.deleteRoom(deleteRoomRequest, (err,result) => {
        if (err){
          reject(err);
        } else{
          resolve(result.toObject());
        } 
      });
    });
  }
}
