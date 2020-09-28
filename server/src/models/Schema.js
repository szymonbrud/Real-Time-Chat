import mongoose, {Schema} from 'mongoose';

export const RoomsSchema = new Schema({
  userId: {type: String, required: true},
  rooms: [
    {
      roomName: {type: String, required: true},
      roomId: {type: Schema.Types.ObjectId, required: true, default: new mongoose.Types.ObjectId()},
    },
  ],
});

export const MessagesAllSchema = new Schema({
  senderName: {type: String, required: true},
  senderId: {type: String, required: true},
  content: String,
  date: {type: Date, default: Date.now()},
  roomId: Schema.Types.ObjectId,
});
