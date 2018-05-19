var PROTO_PATH = __dirname + '/../../protos/room.proto';

var grpc = require('grpc');
var room_proto = grpc.load(PROTO_PATH).room;

function main() {
  var client = new room_proto.Room('localhost:50051',
                                       grpc.credentials.createInsecure());
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }

  client.GetAllRooms({}, function(err, response) {
    console.log('Id:', response);
  });

  client.GetRoomById({id: '2'}, function(err, response) {
    console.log('RoomById:', response);
  });

  client.CreateRoom({id: '1', name: 'newRoom', serverUrl: 'url'}, function(err, response) {
    console.log('Created:', response);
  });

  client.UpdateRoom({id: '1', name: 'updatedRoom', serverUrl: 'url'}, function(err, response) {
    console.log('Updated:', response);
  });

  client.DeleteRoom({id: '1'}, function(err, response) {
    console.log('Deleted:', response);
  });


}

main();