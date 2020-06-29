import React from 'react';

import { MainWrapper, User, BlueText, SectionName } from './styles';

const OnlineUsers = ({ onlineUsers }: { onlineUsers?: string[] }) => {
  return (
    <MainWrapper>
      <SectionName>
        <BlueText>Online</BlueText> users
      </SectionName>
      {onlineUsers?.map((username) => (
        <User key={username}>{username}</User>
      ))}
    </MainWrapper>
  );
};

export default OnlineUsers;
