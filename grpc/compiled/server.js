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

    var testRooms = [
        {id: '1', name: 'first', serverUrl: 'url'},
        {id: '2', name: 'second', serverUrl: 'url'}
    ];
    
    testRooms.forEach(item => {
        let room = new messages.Room();
        room.setId(item.id);
        room.setName(item.name);
        room.setServerurl(item.serverUrl);
        reply.addRooms(room);
    });
    
    reply.setPage('1');
    reply.setSize('1');
    
    let random = Math.random() * 2;
    if(random >= 10) {
        let random_error =  Math.random() * 2;
        
        // error
        if (random_error <= 1){
            callback({
                code: 500,
                message: "Unable to connect to database",
                status: grpc.status.INTERNAL
              }, null);
        } else {
            callback({
                code: 400,
                message: "Auhtentication is invalid",
                status: grpc.status.INTERNAL
              }, null);
        }
    } else {
        //success
        callback(null, reply);
    } 
}

function getRoomById(call, callback){
    var reply = new messages.RoomByIdReply();
    var room = new messages.Room();
    room.setId('1');
    room.setName('first1');
    room.setServerurl('url');
    reply.setRoom(room);

    let random = Math.random() * 2;
    if(random >= 1) {

        let random_error =  Math.random() * 3;
        
        // error
        if(random_error <= 1){
            callback({
                code: 400,
                message: "Room doesn't exists",
                status: grpc.status.INTERNAL
              }, null);
        } else if (random_error <= 2){
            callback({
                code: 500,
                message: "Unable to connect to database",
                status: grpc.status.INTERNAL
              }, null);
        } else {
            callback({
                code: 400,
                message: "Auhtentication is invalid",
                status: grpc.status.INTERNAL
              }, null);
        }
    } else {
        //success
        callback(null, reply);
    } 
}

function createRoom(call, callback){
    var reply = new messages.CreateRoomReply();
    reply.setCreated(true);

    let random = Math.random() * 2;
    if(random >= 1) {
        let random_error =  Math.random() * 3;
        
        // error
        if(random_error <= 1){
            callback({
                code: 400,
                message: "Room already exists",
                status: grpc.status.INTERNAL
              }, null);
        } else if (random_error <= 2){
            callback({
                code: 500,
                message: "Unable to connect to database",
                status: grpc.status.INTERNAL
              }, null);
        } else {
            callback({
                code: 400,
                message: "Auhtentication is invalid",
                status: grpc.status.INTERNAL
              }, null);
        }
    } else {
        //success
        callback(null, reply);
    } 
}

function updateRoom(call, callback){
    var reply = new messages.UpdateRoomReply();
    reply.setUpdated(true);

    let random = Math.random() * 2;
    if(random >= 1) {
        let random_error =  Math.random() * 3;
        
        // error
        if(random_error <= 1){
            callback({
                code: 400,
                message: "Room doesn't exists",
                status: grpc.status.INTERNAL
              }, null);
        } else if (random_error <= 2){
            callback({
                code: 500,
                message: "Unable to connect to database",
                status: grpc.status.INTERNAL
              }, null);
        } else {
            callback({
                code: 400,
                message: "Auhtentication is invalid",
                status: grpc.status.INTERNAL
              }, null);
        }
    } else {
        //success
        callback(null, reply);
    } 
}

function deleteRoom(call, callback){
    var reply = new messages.DeleteRoomReply();
    reply.setDeleted(true);

    let random = Math.random() * 2;
    if(random >= 1) {
        let random_error =  Math.random() * 3;
        
        // error
        if(random_error <= 1){
            callback({
                code: 400,
                message: "Room doesn't exists",
                status: grpc.status.INTERNAL
              }, null);
        } else if (random_error <= 2){
            callback({
                code: 500,
                message: "Unable to connect to database",
                status: grpc.status.INTERNAL
              }, null);
        } else {
            callback({
                code: 400,
                message: "Auhtentication is invalid",
                status: grpc.status.INTERNAL
              }, null);
        }
    } else {
        //success
        callback(null, reply);
    } 
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(services.RoomManagerService, 
    {getAllRooms: getAllRooms, getRoomById: getRoomById,
     createRoom: createRoom, updateRoom: updateRoom, deleteRoom: deleteRoom});
  server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
