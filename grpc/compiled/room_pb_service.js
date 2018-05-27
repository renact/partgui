// package: room
// file: room.proto

var room_pb = require("./room_pb");
var grpc = require("grpc-web-client").grpc;

var RoomManager = (function () {
  function RoomManager() {}
  RoomManager.serviceName = "room.RoomManager";
  return RoomManager;
}());

RoomManager.GetAllRooms = {
  methodName: "GetAllRooms",
  service: RoomManager,
  requestStream: false,
  responseStream: false,
  requestType: room_pb.Empty,
  responseType: room_pb.AllRoomsReply
};

RoomManager.GetRoomById = {
  methodName: "GetRoomById",
  service: RoomManager,
  requestStream: false,
  responseStream: false,
  requestType: room_pb.RoomByIdRequest,
  responseType: room_pb.RoomByIdReply
};

RoomManager.CreateRoom = {
  methodName: "CreateRoom",
  service: RoomManager,
  requestStream: false,
  responseStream: false,
  requestType: room_pb.CreateRoomRequest,
  responseType: room_pb.CreateRoomReply
};

RoomManager.UpdateRoom = {
  methodName: "UpdateRoom",
  service: RoomManager,
  requestStream: false,
  responseStream: false,
  requestType: room_pb.UpdateRoomRequest,
  responseType: room_pb.UpdateRoomReply
};

RoomManager.DeleteRoom = {
  methodName: "DeleteRoom",
  service: RoomManager,
  requestStream: false,
  responseStream: false,
  requestType: room_pb.DeleteRoomRequest,
  responseType: room_pb.DeleteRoomReply
};

exports.RoomManager = RoomManager;

function RoomManagerClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RoomManagerClient.prototype.getAllRooms = function getAllRooms(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(RoomManager.GetAllRooms, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RoomManagerClient.prototype.getRoomById = function getRoomById(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(RoomManager.GetRoomById, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RoomManagerClient.prototype.createRoom = function createRoom(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(RoomManager.CreateRoom, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RoomManagerClient.prototype.updateRoom = function updateRoom(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(RoomManager.UpdateRoom, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RoomManagerClient.prototype.deleteRoom = function deleteRoom(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(RoomManager.DeleteRoom, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

exports.RoomManagerClient = RoomManagerClient;

