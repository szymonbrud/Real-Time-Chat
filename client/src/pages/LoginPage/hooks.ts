import { useState, useContext, RefObject } from 'react';
import { joinContext } from 'context/joinContext';

const useValidationInputs = (
  inputUsername: RefObject<HTMLInputElement>,
  inputRoom: RefObject<HTMLInputElement>,
) => {
  const [isErrorUsername, setIsErrorUsername] = useState(false);
  const [isErrorRoom, setIsErrorRoom] = useState(false);

  const [isPassed, setIsPassed] = useState(false);

  const { setUsernameAndRoom } = useContext(joinContext);

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

      setUsernameAndRoom(inputUsernameValue, inputRoomvalue);
      setIsPassed(true);
    }
  };

  return { isErrorUsername, isErrorRoom, isPassed, validationInputs };
};

export default useValidationInputs;
