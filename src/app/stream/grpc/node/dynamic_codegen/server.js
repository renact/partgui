var PROTO_PATH = __dirname + '/../../protos/room.proto';

var grpc = require('grpc');
var room_proto = grpc.load(PROTO_PATH).room;

function getAllRooms(call, callback){
    callback(null, {id: '1', name: 'firstt', serverUrl: 'url'});
    //callback(null, {rooms: '1'});
}

function getRoomById(call, callback){
    callback(null, {name: 'first', serverUrl: 'url'});
}

function createRoom(call, callback){
    callback(null, {created: true});
}

function updateRoom(call, callback){
    callback(null, {updated: true});
}

function deleteRoom(call, callback){
    callback(null, {deleted: true});
}

function main(){
    var server = new grpc.Server();
    server.addService(room_proto.Room.service, 
        {getAllRooms: getAllRooms, getRoomById: getRoomById,
         createRoom: createRoom, updateRoom: updateRoom, deleteRoom: deleteRoom});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();