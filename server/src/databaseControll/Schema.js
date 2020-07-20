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
