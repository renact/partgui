// package: room
// file: room.proto

import * as jspb from 'google-protobuf';

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class AllRoomsReply extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getServerurl(): string;
  setServerurl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AllRoomsReply.AsObject;
  static toObject(includeInstance: boolean, msg: AllRoomsReply): AllRoomsReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AllRoomsReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AllRoomsReply;
  static deserializeBinaryFromReader(message: AllRoomsReply, reader: jspb.BinaryReader): AllRoomsReply;
}

export namespace AllRoomsReply {
  export type AsObject = {
    id: string,
    name: string,
    serverurl: string,
  }
}

export class RoomByIdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getPage(): string;
  setPage(value: string): void;

  getSize(): string;
  setSize(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RoomByIdRequest): RoomByIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoomByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomByIdRequest;
  static deserializeBinaryFromReader(message: RoomByIdRequest, reader: jspb.BinaryReader): RoomByIdRequest;
}

export namespace RoomByIdRequest {
  export type AsObject = {
    id: string,
    page: string,
    size: string,
  }
}

export class RoomByIdReply extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getServerurl(): string;
  setServerurl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomByIdReply.AsObject;
  static toObject(includeInstance: boolean, msg: RoomByIdReply): RoomByIdReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoomByIdReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomByIdReply;
  static deserializeBinaryFromReader(message: RoomByIdReply, reader: jspb.BinaryReader): RoomByIdReply;
}

export namespace RoomByIdReply {
  export type AsObject = {
    name: string,
    serverurl: string,
  }
}

export class CreateRoomRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getServerurl(): string;
  setServerurl(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRoomRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRoomRequest): CreateRoomRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRoomRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRoomRequest;
  static deserializeBinaryFromReader(message: CreateRoomRequest, reader: jspb.BinaryReader): CreateRoomRequest;
}

export namespace CreateRoomRequest {
  export type AsObject = {
    id: string,
    name: string,
    serverurl: string,
    password: string,
  }
}

export class CreateRoomReply extends jspb.Message {
  getCreated(): boolean;
  setCreated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRoomReply.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRoomReply): CreateRoomReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRoomReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRoomReply;
  static deserializeBinaryFromReader(message: CreateRoomReply, reader: jspb.BinaryReader): CreateRoomReply;
}

export namespace CreateRoomReply {
  export type AsObject = {
    created: boolean,
  }
}

export class UpdateRoomRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getServerurl(): string;
  setServerurl(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRoomRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRoomRequest): UpdateRoomRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateRoomRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRoomRequest;
  static deserializeBinaryFromReader(message: UpdateRoomRequest, reader: jspb.BinaryReader): UpdateRoomRequest;
}

export namespace UpdateRoomRequest {
  export type AsObject = {
    id: string,
    name: string,
    serverurl: string,
    password: string,
  }
}

export class UpdateRoomReply extends jspb.Message {
  getUpdated(): boolean;
  setUpdated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRoomReply.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRoomReply): UpdateRoomReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateRoomReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRoomReply;
  static deserializeBinaryFromReader(message: UpdateRoomReply, reader: jspb.BinaryReader): UpdateRoomReply;
}

export namespace UpdateRoomReply {
  export type AsObject = {
    updated: boolean,
  }
}

export class DeleteRoomRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRoomRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRoomRequest): DeleteRoomRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteRoomRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRoomRequest;
  static deserializeBinaryFromReader(message: DeleteRoomRequest, reader: jspb.BinaryReader): DeleteRoomRequest;
}

export namespace DeleteRoomRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteRoomReply extends jspb.Message {
  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRoomReply.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRoomReply): DeleteRoomReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteRoomReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRoomReply;
  static deserializeBinaryFromReader(message: DeleteRoomReply, reader: jspb.BinaryReader): DeleteRoomReply;
}

export namespace DeleteRoomReply {
  export type AsObject = {
    deleted: boolean,
  }
}

