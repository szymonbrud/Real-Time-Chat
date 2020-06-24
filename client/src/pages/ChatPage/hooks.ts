import { useEffect, useContext, useState, useRef, RefObject } from 'react';
import io, { Socket } from 'socket.io-client';

import { joinContext } from 'context/joinContext';

interface messageObject {
  isReceived: boolean;
  sender: string;
  text: string;
}

let socket: any;

const useChatConnection = () => {
  const { username, room } = useContext(joinContext);

  const textInputRef: RefObject<HTMLInputElement> = useRef(null);

  const [messages, setMessages] = useState<messageObject[]>([]);
  const [isRedirect, setIsRedirect] = useState(false);

  const URL = 'localhost:5500';

  useEffect(() => {
    if (username === '' || room === '') setIsRedirect(true);

    socket = io(URL);
    socket.emit('join', { name: username, room }, (error: any) => {
      if (error) {
        alert(error);
        setIsRedirect(true);
      }
    });

    socket.on('message', ({ user, text }: { user: string; text: string }) => {
      setMessages((message) => [...message, { isReceived: true, sender: user, text }]);
    });
  }, []);

  const sendMessage = () => {
    if (textInputRef.current && textInputRef.current.value !== '') {
      const textInputRefValue = textInputRef.current.value;

      socket.emit('sendMessage', { text: textInputRefValue }, () => {});
      setMessages((message) => [
        ...message,
        { isReceived: false, sender: username, text: textInputRefValue },
      ]);

      textInputRef.current.value = '';
    }
  };

  const triggerSend = (e: any) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  return { messages, textInputRef, sendMessage, triggerSend, isRedirect };
};

export default useChatConnection;
