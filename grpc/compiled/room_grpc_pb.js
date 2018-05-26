// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var room_pb = require('./room_pb.js');

function serialize_room_AllRoomsReply(arg) {
  if (!(arg instanceof room_pb.AllRoomsReply)) {
    throw new Error('Expected argument of type room.AllRoomsReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_room_AllRoomsReply(buffer_arg) {
  return room_pb.AllRoomsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_room_CreateRoomReply(arg) {
  if (!(arg instanceof room_pb.CreateRoomReply)) {
    throw new Error('Expected argument of type room.CreateRoomReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_room_CreateRoomReply(buffer_arg) {
  return room_pb.CreateRoomReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_room_CreateRoomRequest(arg) {
  if (!(arg instanceof room_pb.CreateRoomRequest)) {
    throw new Error('Expected argument of type room.CreateRoomRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_room_CreateRoomRequest(buffer_arg) {
  return room_pb.CreateRoomRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_room_DeleteRoomReply(arg) {
  if (!(arg instanceof room_pb.DeleteRoomReply)) {
    throw new Error('Expected argument of type room.DeleteRoomReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_room_DeleteRoomReply(buffer_arg) {
  return room_pb.DeleteRoomReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_room_DeleteRoomRequest(arg) {
  if (!(arg instanceof room_pb.DeleteRoomRequest)) {
    throw new Error('Expected argument of type room.DeleteRoomRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_room_DeleteRoomRequest(buffer_arg) {
  return room_pb.DeleteRoomRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_room_Empty(arg) {
  if (!(arg instanceof room_pb.Empty)) {
    throw new Error('Expected argument of type room.Empty');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_room_Empty(buffer_arg) {
  return room_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_room_RoomByIdReply(arg) {
  if (!(arg instanceof room_pb.RoomByIdReply)) {
    throw new Error('Expected argument of type room.RoomByIdReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_room_RoomByIdReply(buffer_arg) {
  return room_pb.RoomByIdReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_room_RoomByIdRequest(arg) {
  if (!(arg instanceof room_pb.RoomByIdRequest)) {
    throw new Error('Expected argument of type room.RoomByIdRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_room_RoomByIdRequest(buffer_arg) {
  return room_pb.RoomByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_room_UpdateRoomReply(arg) {
  if (!(arg instanceof room_pb.UpdateRoomReply)) {
    throw new Error('Expected argument of type room.UpdateRoomReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_room_UpdateRoomReply(buffer_arg) {
  return room_pb.UpdateRoomReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_room_UpdateRoomRequest(arg) {
  if (!(arg instanceof room_pb.UpdateRoomRequest)) {
    throw new Error('Expected argument of type room.UpdateRoomRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_room_UpdateRoomRequest(buffer_arg) {
  return room_pb.UpdateRoomRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var RoomManagerService = exports.RoomManagerService = {
  getAllRooms: {
    path: '/room.RoomManager/GetAllRooms',
    requestStream: false,
    responseStream: false,
    requestType: room_pb.Empty,
    responseType: room_pb.AllRoomsReply,
    requestSerialize: serialize_room_Empty,
    requestDeserialize: deserialize_room_Empty,
    responseSerialize: serialize_room_AllRoomsReply,
    responseDeserialize: deserialize_room_AllRoomsReply,
  },
  getRoomById: {
    path: '/room.RoomManager/GetRoomById',
    requestStream: false,
    responseStream: false,
    requestType: room_pb.RoomByIdRequest,
    responseType: room_pb.RoomByIdReply,
    requestSerialize: serialize_room_RoomByIdRequest,
    requestDeserialize: deserialize_room_RoomByIdRequest,
    responseSerialize: serialize_room_RoomByIdReply,
    responseDeserialize: deserialize_room_RoomByIdReply,
  },
  createRoom: {
    path: '/room.RoomManager/CreateRoom',
    requestStream: false,
    responseStream: false,
    requestType: room_pb.CreateRoomRequest,
    responseType: room_pb.CreateRoomReply,
    requestSerialize: serialize_room_CreateRoomRequest,
    requestDeserialize: deserialize_room_CreateRoomRequest,
    responseSerialize: serialize_room_CreateRoomReply,
    responseDeserialize: deserialize_room_CreateRoomReply,
  },
  updateRoom: {
    path: '/room.RoomManager/UpdateRoom',
    requestStream: false,
    responseStream: false,
    requestType: room_pb.UpdateRoomRequest,
    responseType: room_pb.UpdateRoomReply,
    requestSerialize: serialize_room_UpdateRoomRequest,
    requestDeserialize: deserialize_room_UpdateRoomRequest,
    responseSerialize: serialize_room_UpdateRoomReply,
    responseDeserialize: deserialize_room_UpdateRoomReply,
  },
  deleteRoom: {
    path: '/room.RoomManager/DeleteRoom',
    requestStream: false,
    responseStream: false,
    requestType: room_pb.DeleteRoomRequest,
    responseType: room_pb.DeleteRoomReply,
    requestSerialize: serialize_room_DeleteRoomRequest,
    requestDeserialize: deserialize_room_DeleteRoomRequest,
    responseSerialize: serialize_room_DeleteRoomReply,
    responseDeserialize: deserialize_room_DeleteRoomReply,
  },
};

exports.RoomManagerClient = grpc.makeGenericClientConstructor(RoomManagerService);
