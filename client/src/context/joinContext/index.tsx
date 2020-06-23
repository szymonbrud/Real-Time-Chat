import React, { useState } from 'react';

interface defaultContextValidation {
  username: string;
  room: string;
  setUsername: Function;
  setRoom: Function;
}

const defaultContext: defaultContextValidation = {
  username: '',
  room: '',
  setUsername: () => {},
  setRoom: () => {},
};

export const joinContext = React.createContext(defaultContext);

export const JoinContextProvider = ({ children }: { children: React.ReactNode }) => {
  const setUsername = (name: string) => {
    setState({ ...state, username: name });
  };

  const setRoom = (room: string) => {
    setState({ ...state, room });
  };

  const initalState = {
    ...defaultContext,
    setUsername,
    setRoom,
  };

  const [state, setState] = useState(initalState);

  return <joinContext.Provider value={state}>{children}</joinContext.Provider>;
};
