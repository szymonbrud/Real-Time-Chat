import { useState, useEffect, RefObject, useRef } from 'react';

import useSocketConnect from './socketHooks';
import useAuthentication from 'authentication/authenticationHooks';

let URL: string;

if (window.location.hostname === 'localhost') {
  URL = 'http://localhost:5000/';
} else {
  URL = 'https://real-time-chat-backend.herokuapp.com/';
}

interface roomInterface {
  roomName: string;
  roomId: string;
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
  roomName?: string;
  roomId?: string;
}

const useChatPage = () => {
  const [rooms, setRooms] = useState<roomInterface[]>([]);
  const [messages, setMessages] = useState<messageInterface[]>([]);
  const [currentRoom, setCurrentRoom] = useState<null | {
    roomName: string;
    roomId: string;
  }>(null);
  const [invadeLink, setInvadeLink] = useState('');
  const [isVisibleCreateNewRoom, setIsVisibleCreateNewRoom] = useState(false);
  const [isVisibleChangeRoomName, setIsVisibleChangeRoomName] = useState(false);
  const [imageData, setImageData] = useState();

  const messageWrapperRef: RefObject<HTMLDivElement> = useRef(null);
  const createNewRoomInputRef: RefObject<HTMLInputElement> = useRef(null);
  const changeRoomNameInputRef: RefObject<HTMLInputElement> = useRef(null);

  const { joinToRoomSocket, diconectRoom } = useSocketConnect(setMessages, setCurrentRoom);
  const { userTokenId } = useAuthentication();

  const getRoomsByDatabase = () => {
    userTokenId((token: string) => {
      fetch(`${URL}rooms`, {
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
      if (currentRoom?.roomId) diconectRoom(currentRoom?.roomId);
      setMessages([]);
      setCurrentRoom({ roomName, roomId });
      userTokenId((token: string) => {
        fetch(`${URL}messages`, {
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

  const showNewRoom = () => {
    setIsVisibleCreateNewRoom(true);
  };

  const acceptNewRoomName = () => {
    const roomName = createNewRoomInputRef?.current?.value;
    setIsVisibleCreateNewRoom(false);
    if (roomName?.length === 0) {
      alert('FAIL! Room name have to be more that one letter');
    } else if (roomName) {
      userTokenId((token: string) => {
        console.log('send');
        fetch(`${URL}createRoom`, {
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
      fetch(`${URL}createInvade`, {
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
          setImageData(e.image);
          setInvadeLink(e.link);
        })
        .catch(err => console.log(err));
    });
  };

  const deleteRoom = () => {
    userTokenId((token: string) => {
      fetch(`${URL}deleteRoom`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          roomId: currentRoom?.roomId,
        }),
      })
        .then(data => data.json())
        .then(e => {
          if (e.status === 'OK') {
            console.log(e);
          }
        });
    });
    setRooms(prev => prev.filter(item => item.roomId !== currentRoom?.roomId));
    setCurrentRoom(null);
  };

  const changeRoomName = () => {
    if (changeRoomNameInputRef && changeRoomNameInputRef.current && currentRoom) {
      setCurrentRoom({
        roomName: changeRoomNameInputRef?.current?.value,
        roomId: currentRoom.roomId,
      });
    }
    userTokenId((token: string) => {
      fetch(`${URL}editNameRoom`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          roomId: currentRoom?.roomId,
          newRoomName: changeRoomNameInputRef.current?.value,
        }),
      })
        .then(data => data.json())
        .then(e => {
          console.log(e);
        });
    });
  };

  const backToDefaultView = () => {
    diconectRoom(currentRoom?.roomId);
    setCurrentRoom(null);
    setMessages([]);
  };

  useEffect(() => {
    if (messageWrapperRef.current) {
      messageWrapperRef.current.scrollTop = messageWrapperRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    getRoomsByDatabase();
    // eslint-disable-next-line
  }, []);

  return {
    joinToRoom: getRoomsMessage,
    acceptNewRoomName,
    showNewRoom,
    rooms,
    messages,
    currentRoom,
    setMessages,
    invadeToRoom,
    invadeLink,
    setInvadeLink,
    messageWrapperRef,
    isVisibleCreateNewRoom,
    createNewRoomInputRef,
    deleteRoom,
    changeRoomName,
    switchVisibleChangeRoomName: () => setIsVisibleChangeRoomName(prev => !prev),
    isVisibleChangeRoomName,
    changeRoomNameInputRef,
    backToDefaultView,
    imageData,
  };
};

export default useChatPage;
