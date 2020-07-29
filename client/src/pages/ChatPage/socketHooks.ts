import { useEffect, useRef, RefObject, createRef } from 'react';
import io from 'socket.io-client';

import useAuthentication from 'authentication/authenticationHooks';

let socket: any;
let URL: string;

if (window.location.hostname === 'localhost') {
  URL = 'http://localhost:5500/';
} else {
  URL = 'https://real-time-chat-backend.herokuapp.com/';
}

const useSocketConnect = (setMessages?: Function) => {
  const { userName, userId } = useAuthentication();

  const textInputRef: RefObject<HTMLInputElement> = useRef(null);

  const socketMessages = () => {
    socket.on('message', ({ user, text }: { user: string; text: string }) => {
      setMessages &&
        setMessages((message: any) => [
          ...message,
          { isReceived: user !== userName, senderName: user, content: text },
        ]);
    });
  };

  const joinToRoom = (roomId: string) => {
    socket.emit(
      'join',
      { name: userName ? userName : 'anonymus', roomId: roomId, userId: userId },
      (error: any) => {
        if (error) {
          alert(error);
        }
      },
    );
  };

  const triggerSend = (clickedKey: any) => {
    if (clickedKey.keyCode === 13) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const text = textInputRef?.current?.value;

    setMessages &&
      setMessages((prev: any) => [
        ...prev,
        {
          senderName: userName,
          isSendByMe: true,
          content: text,
          date: new Date(),
        },
      ]);

    socket.emit('sendMessage', { text }, () => {
      console.log('success send');
    });

    if (textInputRef) {
      if (textInputRef.current) {
        textInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    socket = io(URL);

    socketMessages();
  }, []);

  return {
    joinToRoomSocket: joinToRoom,
    textInputRef,
    triggerSend,
    sendMessage,
  };
};

export default useSocketConnect;
