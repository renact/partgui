// package: room
// file: room.proto

import * as grpc from 'grpc';
import * as room_pb from './room_pb';

interface IRoomManagerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getAllRooms: IGetAllRooms
  getRoomById: IGetRoomById
  createRoom: ICreateRoom
  updateRoom: IUpdateRoom
  deleteRoom: IDeleteRoom
}

interface IGetAllRooms {
  path: string; // "/room.RoomManager/GetAllRooms"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestType: room_pb.Empty;
  responseType: room_pb.AllRoomsReply;
  requestSerialize: (arg: room_pb.Empty) => Buffer;
  requestDeserialize: (buffer: Uint8Array) => room_pb.Empty;
  responseSerialize: (arg: room_pb.AllRoomsReply) => Buffer;
  responseDeserialize: (buffer: Uint8Array) => room_pb.AllRoomsReply;
}

interface IGetRoomById {
  path: string; // "/room.RoomManager/GetRoomById"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestType: room_pb.RoomByIdRequest;
  responseType: room_pb.RoomByIdReply;
  requestSerialize: (arg: room_pb.RoomByIdRequest) => Buffer;
  requestDeserialize: (buffer: Uint8Array) => room_pb.RoomByIdRequest;
  responseSerialize: (arg: room_pb.RoomByIdReply) => Buffer;
  responseDeserialize: (buffer: Uint8Array) => room_pb.RoomByIdReply;
}

interface ICreateRoom {
  path: string; // "/room.RoomManager/CreateRoom"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestType: room_pb.CreateRoomRequest;
  responseType: room_pb.CreateRoomReply;
  requestSerialize: (arg: room_pb.CreateRoomRequest) => Buffer;
  requestDeserialize: (buffer: Uint8Array) => room_pb.CreateRoomRequest;
  responseSerialize: (arg: room_pb.CreateRoomReply) => Buffer;
  responseDeserialize: (buffer: Uint8Array) => room_pb.CreateRoomReply;
}

interface IUpdateRoom {
  path: string; // "/room.RoomManager/UpdateRoom"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestType: room_pb.UpdateRoomRequest;
  responseType: room_pb.UpdateRoomReply;
  requestSerialize: (arg: room_pb.UpdateRoomRequest) => Buffer;
  requestDeserialize: (buffer: Uint8Array) => room_pb.UpdateRoomRequest;
  responseSerialize: (arg: room_pb.UpdateRoomReply) => Buffer;
  responseDeserialize: (buffer: Uint8Array) => room_pb.UpdateRoomReply;
}

interface IDeleteRoom {
  path: string; // "/room.RoomManager/DeleteRoom"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestType: room_pb.DeleteRoomRequest;
  responseType: room_pb.DeleteRoomReply;
  requestSerialize: (arg: room_pb.DeleteRoomRequest) => Buffer;
  requestDeserialize: (buffer: Uint8Array) => room_pb.DeleteRoomRequest;
  responseSerialize: (arg: room_pb.DeleteRoomReply) => Buffer;
  responseDeserialize: (buffer: Uint8Array) => room_pb.DeleteRoomReply;
}

export interface IRoomManagerClient {
  getAllRooms(request: room_pb.Empty, callback: (error: Error | null, response: room_pb.AllRoomsReply) => void): grpc.ClientUnaryCall;
  getAllRooms(request: room_pb.Empty, metadata: grpc.Metadata, callback: (error: Error | null, response: room_pb.AllRoomsReply) => void): grpc.ClientUnaryCall;
  getRoomById(request: room_pb.RoomByIdRequest, callback: (error: Error | null, response: room_pb.RoomByIdReply) => void): grpc.ClientUnaryCall;
  getRoomById(request: room_pb.RoomByIdRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: room_pb.RoomByIdReply) => void): grpc.ClientUnaryCall;
  createRoom(request: room_pb.CreateRoomRequest, callback: (error: Error | null, response: room_pb.CreateRoomReply) => void): grpc.ClientUnaryCall;
  createRoom(request: room_pb.CreateRoomRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: room_pb.CreateRoomReply) => void): grpc.ClientUnaryCall;
  updateRoom(request: room_pb.UpdateRoomRequest, callback: (error: Error | null, response: room_pb.UpdateRoomReply) => void): grpc.ClientUnaryCall;
  updateRoom(request: room_pb.UpdateRoomRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: room_pb.UpdateRoomReply) => void): grpc.ClientUnaryCall;
  deleteRoom(request: room_pb.DeleteRoomRequest, callback: (error: Error | null, response: room_pb.DeleteRoomReply) => void): grpc.ClientUnaryCall;
  deleteRoom(request: room_pb.DeleteRoomRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: room_pb.DeleteRoomReply) => void): grpc.ClientUnaryCall;
}

export const RoomManagerService: IRoomManagerService;
export class RoomManagerClient extends grpc.Client implements IRoomManagerClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  public getAllRooms(request: room_pb.Empty, callback: (error: Error | null, response: room_pb.AllRoomsReply) => void): grpc.ClientUnaryCall;
  public getAllRooms(request: room_pb.Empty, metadata: grpc.Metadata, callback: (error: Error | null, response: room_pb.AllRoomsReply) => void): grpc.ClientUnaryCall;
  public getRoomById(request: room_pb.RoomByIdRequest, callback: (error: Error | null, response: room_pb.RoomByIdReply) => void): grpc.ClientUnaryCall;
  public getRoomById(request: room_pb.RoomByIdRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: room_pb.RoomByIdReply) => void): grpc.ClientUnaryCall;
  public createRoom(request: room_pb.CreateRoomRequest, callback: (error: Error | null, response: room_pb.CreateRoomReply) => void): grpc.ClientUnaryCall;
  public createRoom(request: room_pb.CreateRoomRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: room_pb.CreateRoomReply) => void): grpc.ClientUnaryCall;
  public updateRoom(request: room_pb.UpdateRoomRequest, callback: (error: Error | null, response: room_pb.UpdateRoomReply) => void): grpc.ClientUnaryCall;
  public updateRoom(request: room_pb.UpdateRoomRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: room_pb.UpdateRoomReply) => void): grpc.ClientUnaryCall;
  public deleteRoom(request: room_pb.DeleteRoomRequest, callback: (error: Error | null, response: room_pb.DeleteRoomReply) => void): grpc.ClientUnaryCall;
  public deleteRoom(request: room_pb.DeleteRoomRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: room_pb.DeleteRoomReply) => void): grpc.ClientUnaryCall;
}

