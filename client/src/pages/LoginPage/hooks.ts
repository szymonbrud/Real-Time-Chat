import { useState, useContext, RefObject } from 'react';
import { joinContext } from 'context/joinContext';

import io from 'socket.io-client';

const useValidationInputs = (
  inputUsername: RefObject<HTMLInputElement>,
  inputRoom: RefObject<HTMLInputElement>,
) => {
  const [isErrorUsername, setIsErrorUsername] = useState(false);
  const [isErrorRoom, setIsErrorRoom] = useState(false);

  const [isPassed, setIsPassed] = useState(false);

  const { setRoom, setUsername } = useContext(joinContext);

  const runSocket = (name: string, room: string) => {
    const socket = io('localhost:5500');
    socket.emit('join', { name, room }, (error: any) => {
      if (error) {
        alert(error);
      }
    });
  };

  const validationInputs = () => {
    if (inputUsername.current && inputRoom.current) {
      const inputUsernameValue = inputUsername.current.value;
      const inputRoomvalue = inputRoom.current.value;

      if (inputUsernameValue.length === 0) {
        setIsErrorUsername(true);
        return;
      } else {
        setIsErrorUsername(false);
      }

      if (inputRoomvalue.length === 0) {
        setIsErrorRoom(true);
        return;
      } else {
        setIsErrorRoom(false);
      }

      setUsername(inputUsernameValue);
      setRoom(inputRoomvalue);
      setIsPassed(true);

      runSocket(inputUsernameValue, inputRoomvalue);
    }
  };

  return { isErrorUsername, isErrorRoom, isPassed, validationInputs };
};

export default useValidationInputs;
