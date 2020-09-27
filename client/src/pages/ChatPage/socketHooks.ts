import { useRef, RefObject } from 'react';

import { socket } from './useStartHooks';
import useAuthentication from 'authentication/authenticationHooks';

const useSocketConnect = (setMessages?: Function, setCurrentRoom?: Function) => {
  const { userName, userId } = useAuthentication();

  const textInputRef: RefObject<HTMLInputElement> = useRef(null);

  const joinToRoom = (roomId: string) => {
    socket.emit(
      'join',
      { name: userName ? userName : 'anonymus', roomId: roomId, userId: userId },
      (error: any) => {
        if (error) {
          setCurrentRoom && setCurrentRoom('');
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

  const diconectRoom = (lastRoomId: any) => {
    socket.emit('disconnectRoom', { lastRoomId });
  };

  // useEffect(() => {

  //   // socketMessages();
  // }, []);

  return {
    joinToRoomSocket: joinToRoom,
    textInputRef,
    triggerSend,
    sendMessage,
    diconectRoom,
  };
};

export default useSocketConnect;
