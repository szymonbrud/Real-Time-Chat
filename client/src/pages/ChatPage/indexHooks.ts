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
  const [invadeLink, setInvadeLink] = useState('');

  const { joinToRoomSocket, diconectRoom } = useSocketConnect(setMessages, setCurrentRoom);
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
      diconectRoom(currentRoom?.roomId);
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

  const invadeToRoom = () => {
    userTokenId((token: string) => {
      fetch('http://localhost:5500/createInvade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          roomId: currentRoom?.roomId,
          roomName: currentRoom?.roomName,
        }),
      })
        .then(data => data.json())
        .then(e => {
          if (e.status === 'OK') {
            setInvadeLink(e.link);
          }
        })
        .catch(err => console.log(err));
    });
  };

  useEffect(() => {
    getRoomsByDatabase();
  }, []);

  return {
    joinToRoom: getRoomsMessage,
    createNewRoom,
    rooms,
    messages,
    currentRoom,
    setMessages,
    invadeToRoom,
    invadeLink,
    setInvadeLink,
  };
};

export default useChatPage;
