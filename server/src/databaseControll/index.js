import mongoose from 'mongoose';

import {RoomsSchema, MessagesAllSchema} from 'models/Schema';

export const RoomsData = mongoose.model('RoomsData', RoomsSchema);
export const AllMessages = mongoose.model('messages', MessagesAllSchema);

export const saveMessageDatabase = ({userName, userId, content, roomId}) => {
  // const date = new Date().toLocaleString('en-GB');
  const date = new Date();

  const message = new AllMessages({
    senderName: userName,
    senderId: userId,
    content,
    roomId,
    date,
  });
  message.save((err) => {
    if (err) {
      console.error('Error during save massages to database', err);
    }
  });
};
