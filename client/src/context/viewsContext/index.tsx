import React, { useState } from 'react';

interface defaultContextValidation {
  messagesView: [{
    roomName: string,
    roomId: string,
    date: string,
    senderName: string,
    content: string,
  }]
}

const defaultContext: any = {
  messagesView: [],
};

export const viewContext = React.createContext(defaultContext);

export const ViewContextProvider = ({ children }: { children: React.ReactNode }) => {
  
  const setMessagesView = (messagesRooms: [{
    roomName: string,
    roomId: string,
    date: string,
    senderName: string,
    content: string,
  }]) => {
    setState({...state, messagesView: messagesRooms})
  }

 

  const initalState = {
    ...defaultContext,
    setMessagesView
  };

  const [state, setState] = useState(initalState);

  return <viewContext.Provider value={state}>{children}</viewContext.Provider>;
};
