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

function main() {
  var client = new services.RoomClient('localhost:50051',
                                          grpc.credentials.createInsecure());
  var request = new messages.Empty();
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }

  client.getAllRooms(request, function(err, response) {
    console.log('GetAllRooms: ', response.getName());
  });

  request = new messages.RoomByIdRequest();
  request.setId('1');
  request.setPage('1');
  request.setSize('1');
  client.getRoomById(request, function(err, response) {
    console.log('GetRoomById: ', response.getName());
  });

  request = new messages.CreateRoomRequest();
  request.setId('1');
  request.setName('first');
  request.setServerurl('url');
  request.setPassword('test');
  client.createRoom(request, function(err, response) {
    console.log('CreateRoom: ', response.getCreated());
  });

  request = new messages.UpdateRoomRequest();
  request.setId('1');
  request.setName('first');
  request.setServerurl('url');
  request.setPassword('test');  
  client.updateRoom(request, function(err, response) {
    console.log('UpdateRoom: ', response.getUpdated());
  });

  request = new messages.DeleteRoomRequest();
  request.setId('1');  
  client.deleteRoom(request, function(err, response) {
    console.log('DeleteRoom: ', response.getDeleted());
  });
}

main();
