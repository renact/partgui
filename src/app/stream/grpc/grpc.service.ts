import {grpc} from "grpc-web-client";
import {RoomService} from "./compiled-proto/room_grpc_pb";
import {RoomByIdRequest} from "./compiled-proto/room_pb";

declare const USE_TLS: boolean;
const host = USE_TLS ? "https://localhost:50051" : "http://localhost:50051";

export class grpcService{
    getRoomById() {
      const roomByIdRequest = new RoomByIdRequest ();
      roomByIdRequest.setId('1234');
      grpc.unary(RoomService.GetRoomById, {
        request: roomByIdRequest, 
        host: host,
        onEnd: res => {
          const { status, statusMessage, headers, message, trailers } = res;
          if (status === grpc.Code.OK && message) {
            console.log("all ok. got room: ", message.toObject());
          }
        }
      });
    }
}