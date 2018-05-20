// package: room
// file: room.proto

var room_pb = require("./room_pb");
var grpc = require("grpc-web-client").grpc;

var Room = (function () {
  function Room() {}
  Room.serviceName = "room.Room";
  return Room;
}());

Room.GetAllRooms = {
  methodName: "GetAllRooms",
  service: Room,
  requestStream: false,
  responseStream: false,
  requestType: room_pb.Empty,
  responseType: room_pb.AllRoomsReply
};

Room.GetRoomById = {
  methodName: "GetRoomById",
  service: Room,
  requestStream: false,
  responseStream: false,
  requestType: room_pb.RoomByIdRequest,
  responseType: room_pb.RoomByIdReply
};

Room.CreateRoom = {
  methodName: "CreateRoom",
  service: Room,
  requestStream: false,
  responseStream: false,
  requestType: room_pb.CreateRoomRequest,
  responseType: room_pb.CreateRoomReply
};

Room.UpdateRoom = {
  methodName: "UpdateRoom",
  service: Room,
  requestStream: false,
  responseStream: false,
  requestType: room_pb.UpdateRoomRequest,
  responseType: room_pb.UpdateRoomReply
};

Room.DeleteRoom = {
  methodName: "DeleteRoom",
  service: Room,
  requestStream: false,
  responseStream: false,
  requestType: room_pb.DeleteRoomRequest,
  responseType: room_pb.DeleteRoomReply
};

exports.Room = Room;

function RoomClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RoomClient.prototype.getAllRooms = function getAllRooms(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Room.GetAllRooms, {
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

RoomClient.prototype.getRoomById = function getRoomById(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Room.GetRoomById, {
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

RoomClient.prototype.createRoom = function createRoom(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Room.CreateRoom, {
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

RoomClient.prototype.updateRoom = function updateRoom(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Room.UpdateRoom, {
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

RoomClient.prototype.deleteRoom = function deleteRoom(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Room.DeleteRoom, {
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

exports.RoomClient = RoomClient;

