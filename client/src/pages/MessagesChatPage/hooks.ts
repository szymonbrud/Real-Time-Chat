import { useEffect, useContext } from 'react';

import { viewContext } from 'context/viewsContext';
import useAuthentication from 'authentication/authenticationHooks';

import getUrl from 'helpers/getUrl';

let URL = getUrl();

const useMessagesHooks = () => {
  const { messagesView, setMessagesView } = useContext(viewContext);

  const { userTokenId } = useAuthentication();

  const changeDateFormat = (date: string) => {
    const dateJs = new Date(date);

    const hour = dateJs.getHours()
    const minute = dateJs.getMinutes();
    
    return `${hour}:${minute}`
  }

  const getRooms = () => {
    if (setMessagesView) {
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
  }

  useEffect(() => {
    getRooms();
  }, [setMessagesView])

  return {
    messagesView,
    changeDateFormat
  }
};

export default useMessagesHooks;
