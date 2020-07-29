import { useState, useEffect } from 'react';

import useSocketConnect from './socketHooks';
import useAuthentication from 'authentication/authenticationHooks';

interface roomInterface {
  roomName: string;
  _id: string;
}

interface messageInterface {
  date: Date;
  senderName: string;
  isSendByMe: boolean;
  content: string;
  roomId: string;
  _id: string;
}

interface currentRoomInterface {
  roomName: string;
  roomId: string;
}

const useChatPage = () => {
  const [rooms, setRooms] = useState<roomInterface[]>([]);
  const [messages, setMessages] = useState<messageInterface[]>([]);
  const [currentRoom, setCurrentRoom] = useState<currentRoomInterface>();

  const { joinToRoomSocket } = useSocketConnect(setMessages);
  const { userTokenId } = useAuthentication();

  const getRoomsByDatabase = () => {
    userTokenId((token: string) => {
      fetch('http://localhost:5500/getRooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      })
        .then(data => data.json())
        .then(e => {
          setRooms(e.nameRooms);
        })
        .catch(err => console.log(err));
    });
  };

  const getRoomsMessage = (roomId: string, roomName: string) => {
    if (currentRoom?.roomId !== roomId) {
      setMessages([]);
      setCurrentRoom({ roomName, roomId });
      userTokenId((token: string) => {
        fetch('http://localhost:5500/getMessages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token, roomId: roomId }),
        })
          .then(data => data.json())
          .then(e => {
            setMessages((prev: any[]) => [...prev, ...e.messages]);
            joinToRoomSocket(roomId);
          })
          .catch(err => console.log(err));
      });
    }
  };

  const createNewRoom = () => {
    const roomName = prompt('Please enter your name', '');

    if (roomName?.length === 0) {
      alert('FAIL! Room name have to be more that one letter');
    } else if (roomName) {
      userTokenId((token: string) => {
        console.log('send');
        fetch('http://localhost:5500/createRoom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token, roomName: roomName }),
        })
          .then(data => data.json())
          .then(e => {
            setRooms(e.nameRooms);
          })
          .catch(err => console.log(err));
      });
    }
  };

  useEffect(() => {
    getRoomsByDatabase();
  }, []);

  console.log(messages);

  return {
    joinToRoom: getRoomsMessage,
    createNewRoom,
    rooms,
    messages,
    currentRoom,
    setMessages,
  };
};

export default useChatPage;
