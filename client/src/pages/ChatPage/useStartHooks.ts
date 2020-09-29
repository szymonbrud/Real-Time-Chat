import { useEffect } from 'react';
import io from 'socket.io-client';

import useAuthentication from 'authentication/authenticationHooks';

export let socket: any;
let URL: string;

if (window.location.hostname === 'localhost') {
  URL = 'http://localhost:5000/';
} else {
  URL = 'https://real-time-chat-backend.herokuapp.com/';
}

const useStartHooks = (setMessages: Function) => {
  const { userName } = useAuthentication();

  const socketMessages = () => {
    socket.on('message', ({ user, text }: { user: string; text: string }) => {
      setMessages &&
        setMessages((message: any) => [
          ...message,
          {
            isReceived: user !== userName,
            senderName: user,
            content: text,
          },
        ]);
    });
  };

  useEffect(() => {
    socket = io(URL);

    socketMessages();
    // eslint-disable-next-line
  }, []);
};

export default useStartHooks;