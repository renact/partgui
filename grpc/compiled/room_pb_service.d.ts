// package: room
// file: room.proto

import * as room_pb from "./room_pb";
import {grpc} from "grpc-web-client";

type RoomManagerGetAllRooms = {
  readonly methodName: string;
  readonly service: typeof RoomManager;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof room_pb.Empty;
  readonly responseType: typeof room_pb.AllRoomsReply;
};

type RoomManagerGetRoomById = {
  readonly methodName: string;
  readonly service: typeof RoomManager;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof room_pb.RoomByIdRequest;
  readonly responseType: typeof room_pb.RoomByIdReply;
};

type RoomManagerCreateRoom = {
  readonly methodName: string;
  readonly service: typeof RoomManager;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof room_pb.CreateRoomRequest;
  readonly responseType: typeof room_pb.CreateRoomReply;
};

type RoomManagerUpdateRoom = {
  readonly methodName: string;
  readonly service: typeof RoomManager;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof room_pb.UpdateRoomRequest;
  readonly responseType: typeof room_pb.UpdateRoomReply;
};

type RoomManagerDeleteRoom = {
  readonly methodName: string;
  readonly service: typeof RoomManager;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof room_pb.DeleteRoomRequest;
  readonly responseType: typeof room_pb.DeleteRoomReply;
};

export class RoomManager {
  static readonly serviceName: string;
  static readonly GetAllRooms: RoomManagerGetAllRooms;
  static readonly GetRoomById: RoomManagerGetRoomById;
  static readonly CreateRoom: RoomManagerCreateRoom;
  static readonly UpdateRoom: RoomManagerUpdateRoom;
  static readonly DeleteRoom: RoomManagerDeleteRoom;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }
export type ServiceClientOptions = { transport: grpc.TransportConstructor }

interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}

export class RoomManagerClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  getAllRooms(
    requestMessage: room_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: room_pb.AllRoomsReply|null) => void
  ): void;
  getAllRooms(
    requestMessage: room_pb.Empty,
    callback: (error: ServiceError, responseMessage: room_pb.AllRoomsReply|null) => void
  ): void;
  getRoomById(
    requestMessage: room_pb.RoomByIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: room_pb.RoomByIdReply|null) => void
  ): void;
  getRoomById(
    requestMessage: room_pb.RoomByIdRequest,
    callback: (error: ServiceError, responseMessage: room_pb.RoomByIdReply|null) => void
  ): void;
  createRoom(
    requestMessage: room_pb.CreateRoomRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: room_pb.CreateRoomReply|null) => void
  ): void;
  createRoom(
    requestMessage: room_pb.CreateRoomRequest,
    callback: (error: ServiceError, responseMessage: room_pb.CreateRoomReply|null) => void
  ): void;
  updateRoom(
    requestMessage: room_pb.UpdateRoomRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: room_pb.UpdateRoomReply|null) => void
  ): void;
  updateRoom(
    requestMessage: room_pb.UpdateRoomRequest,
    callback: (error: ServiceError, responseMessage: room_pb.UpdateRoomReply|null) => void
  ): void;
  deleteRoom(
    requestMessage: room_pb.DeleteRoomRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: room_pb.DeleteRoomReply|null) => void
  ): void;
  deleteRoom(
    requestMessage: room_pb.DeleteRoomRequest,
    callback: (error: ServiceError, responseMessage: room_pb.DeleteRoomReply|null) => void
  ): void;
}

