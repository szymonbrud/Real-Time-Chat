import {Schema} from 'mongoose';

export const UsersSchema = new Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  rooms: [
    {
      id: Schema.Types.ObjectId,
      roomName: String,
      roomId: String,
    },
  ],
});

export const RoomsSchema = new Schema({
  roomId: Schema.Types.ObjectId,
  roomName: {type: String, required: true},
  users: [String],
  messages: [
    {
      id: Schema.Types.ObjectId,
      sender: {type: String, required: true},
      content: String,
      date: {type: Date, required: true},
    },
  ],
});

export const RoomsDataSchema = new Schema({
  userId: {type: String, required: true},
  rooms: [
    {
      roomName: String,
      roomId: Schema.Types.ObjectId,
    },
  ],
});

export const MessagesSchema = new Schema({
  senderName: {type: String, required: true},
  content: String,
  date: {type: Date, default: Date.now()},
});

export const MessagesAllSchema = new Schema({
  senderName: {type: String, required: true},
  content: String,
  date: {type: Date, default: Date.now()},
  roomId: Schema.Types.ObjectId,
});
