import {v4 as uuid4} from 'uuid';

import generateQrcodeByLink from 'api/functions/generateQrcode';

export const voiceChats = [];

// const dataStructureForVoiceChats = [
//   {
//     roomId: String,
//     users: [userId: string],
//   },
// ];

const invadeKeys = [];

// const joinKeysDataStrucure = [{
//   roomId: String,
//   key: String,
// }]

const generateInvade = (roomId, roomName, userId) => {
  const findedInvade = invadeKeys.find((element) => {
    if (element.roomId === roomId && element.userId === userId) return element;
  });

  if (findedInvade) {
    return findedInvade.key;
  } else {
    let key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    invadeKeys.push({roomId, key, roomName, userId});
    return key;
  }
};

export const createNewVoiceChat = (userId) => {
  const uuid = uuid4();
  voiceChats.push({
    roomId: uuid,
    users: [userId],
  });

  return uuid;
};

export const createInvadeVoiceChat = async (roomId, roomName, userId, res) => {
  const key = generateInvade(roomId, roomName, userId);

  const link = `http://localhost:3000/join/${key}/${roomName}/call`;

  try {
    const qrcode = await generateQrcodeByLink(link);

    res.send({status: 'OK', link, image: qrcode});
    res.end();
  } catch (error) {
    res.send({status: 'OK', link, image: ''});
    res.end();
  }
};

export const checkJoinToCall = (key, userId) => {
  const roomData = invadeKeys.find((invadeElement) => invadeElement.key === key);

  if (roomData) {
    const index = voiceChats.findIndex((voiceChat) => voiceChat.roomId === roomData.roomId);

    if (index !== -1) {
      voiceChats[index].users.push(userId);
    }
  }

  return roomData;
};

export const joinToVoiceChat = (userId, roomId) => {
  let isUserExist = false;

  const room = voiceChats.find((voiceChatData) => voiceChatData.roomId === roomId);

  if (room) {
    room.users.forEach((userIdElement) => {
      if (userIdElement === userId) {
        isUserExist = true;
      }
    });
  }

  return isUserExist;
};
