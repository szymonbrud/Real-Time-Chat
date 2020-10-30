import { useEffect, useContext } from 'react';

import { viewContext } from 'context/viewsContext';
import useAuthentication from 'authentication/authenticationHooks';

let URL: string;

if (window.location.hostname === 'localhost') {
  URL = 'http://localhost:5000/';
} else {
  URL = 'https://real-time-chat-backend.herokuapp.com/';
}

const useMessagesHooks = () => {
  const { messagesView, setMessagesView } = useContext(viewContext);

  const { userTokenId } = useAuthentication();

  useEffect(() => {
    if (!messagesView) {
      userTokenId((token: string) => {
        fetch(`${URL}rooms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        }).then(data => data.json())
          .then(({rooms}) => {
          setMessagesView(rooms);
        }).catch(error => {
          //TODO: error here
        })
      })
    }
  }, [])

  return {
    messagesView,
  }
};

export default useMessagesHooks;
