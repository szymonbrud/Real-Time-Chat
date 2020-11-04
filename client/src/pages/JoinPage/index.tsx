import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import authenticationHooks from 'authentication/useAuthenticationHooks';

enum JoinStatus {
  wait,
  success,
  error,
}

const JoinPage = () => {
  let { key, roomName } = useParams();
  const { userTokenId } = authenticationHooks();

  const [status, setStatus] = useState(JoinStatus.wait);

  console.log(window.location.pathname);
  console.log(useParams());

  const sendJoinRequest = () => {
    userTokenId((token: string) => {
      fetch('http://localhost:5000/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, key }),
      })
        .then(data => data.json())
        .then(e => {
          console.log(e);
          if (e.status === 'OK') {
            setStatus(JoinStatus.success);
          } else {
            setStatus(JoinStatus.error);
          }
        })
        .catch(() => {
          setStatus(JoinStatus.error);
        });
    });
  };

  const waitPage = (
    <>
      <p>Chcesz dołaczyć do pokoju: {roomName}</p>
      <button onClick={sendJoinRequest} data-testid="yes">
        TAK
      </button>
      <button data-testid="no">NIE</button>
    </>
  );

  const errorPage = (
    <>
      <p>niestety nie udało się dołączyć do pokoju, pamiętaj że zaproszenie jest jednozarowe.</p>
      <button onClick={() => setStatus(JoinStatus.success)}>powrót</button>
    </>
  );

  switch (status) {
    case JoinStatus.wait:
      return waitPage;
    case JoinStatus.success:
      return <Redirect to="/room" />;
    case JoinStatus.error:
      return errorPage;
  }
};

export default JoinPage;
