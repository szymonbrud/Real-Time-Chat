import { useEffect, useState, useRef } from 'react'; 

import useAuthenticationHooks from 'authentication/useAuthenticationHooks';
import getUrl from 'helpers/getUrl';

const URL = getUrl();

const useHooks = (goBack : Function) => {

  const [isButtonActive, setIsButtonActive] = useState(false);

  const inputRef = useRef<any>(null);

  const { userTokenId } = useAuthenticationHooks();
  
  const checkInputText = () => {
    setTimeout(() => {
      if (inputRef.current.value.length >= 3) {
        setIsButtonActive(true);
      } else {
        setIsButtonActive(false);
      }
    }, 0)

  }

  const createNewRoom = () => {
    const roomName = inputRef?.current?.value;
    if (roomName.length >= 3) {
      userTokenId((token: string) => {
        fetch(`${URL}createRoom`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token, roomName: roomName }),
        })
          .then(data => data.json())
          .then(() => {
            goBack();
          })
          .catch(err => {
            // TODO: add error
          });
      });
    }
  }

  return {
    inputRef,
    isButtonActive,
    checkInputText,
    createNewRoom
  }
}

export default useHooks;