/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var messages = require('./room_pb');
var services = require('./room_grpc_pb');

var grpc = require('grpc');

/**
 * Implements the SayHello RPC method.
 */

function getAllRooms(call, callback){
    var reply = new messages.AllRoomsReply();
    reply.setId('1');
    reply.setName('first');
    reply.setServerurl('url');
    callback(null, reply);
}

function getRoomById(call, callback){
    var reply = new messages.RoomByIdReply();
    reply.setName('first1');
    reply.setServerurl('url');
    callback(null, reply);
}

function createRoom(call, callback){
    var reply = new messages.CreateRoomReply();
    reply.setCreated(true);
    callback(null, reply);
}

function updateRoom(call, callback){
    var reply = new messages.UpdateRoomReply();
    reply.setUpdated(true);
    callback(null, reply);
}

function deleteRoom(call, callback){
    var reply = new messages.DeleteRoomReply();
    reply.setDeleted(true);
    callback(null, reply);
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(services.RoomService, 
    {getAllRooms: getAllRooms, getRoomById: getRoomById,
     createRoom: createRoom, updateRoom: updateRoom, deleteRoom: deleteRoom});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
