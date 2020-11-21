import { useState, useRef } from 'react'; 

import useAuthenticationHooks from 'authentication/useAuthenticationHooks';
import getUrl from 'helpers/getUrl';

const URL = getUrl();

const useHooks = (goBack : Function, roomId: string) => {

  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isRedirectRoomToCallingView, setIsRedirectRoomToCallingView] = useState('');

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

  const changeRoomName = () => {
    userTokenId((token: string) => {
      fetch(`${URL}editNameRoom`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          roomId: roomId,
          newRoomName: inputRef.current.value,
        }),
      })
        .then(data => data.json())
        .then(() => {
          goBack();
        });
    });
  }

  const createCallingRoom = () => {
    userTokenId((token: string) => {
      fetch(`${URL}createVoiceChatRoom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token, roomName: inputRef.current.value }),
      })
        .then(data => data.json())
        .then(response => {
          setIsRedirectRoomToCallingView(`/call/${response.roomId}/${inputRef.current.value}`);
          // window.location.href = 
        })
        .catch(error => { 
          // TODO: error
        });
    });
  }

  return {
    inputRef,
    isButtonActive,
    checkInputText,
    createNewRoom,
    changeRoomName,
    createCallingRoom,
    isRedirectRoomToCallingView
  }
}

export default useHooks;