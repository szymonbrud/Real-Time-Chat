import React, { useState } from 'react';

interface defaultContextValidation {
  username: string;
  room: string;
  setUsername: Function;
  setRoom: Function;
  setUsernameAndRoom: Function;
}

const defaultContext: defaultContextValidation = {
  username: '',
  room: '',
  setUsername: () => {},
  setRoom: () => {},
  setUsernameAndRoom: () => {},
};

export const joinContext = React.createContext(defaultContext);

export const JoinContextProvider = ({ children }: { children: React.ReactNode }) => {
  const setRoom = (room: string) => {
    setState({ ...state, room });
  };

  const setUsername = (username: string) => {
    setState({ ...state, username });
  };

  const setUsernameAndRoom = (username: string, room: string) => {
    setState({ ...state, username, room });
  };

  const initalState = {
    ...defaultContext,
    setRoom,
    setUsername,
    setUsernameAndRoom,
  };

  const [state, setState] = useState(initalState);

  return <joinContext.Provider value={state}>{children}</joinContext.Provider>;
};
