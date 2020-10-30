import React from 'react'

import useMessagesHooks from './hooks'
import {
  Wrapper,
  NewRoomButton,
  PositionWrapper,
  SectionName,
  PossitionTopBarWrapper,
  RoomListLastMessage,
  RoomListTime,
  RoomsListWrapper,
  RoomListName
} from './styles'

const MessagesChat = () => {

  const { messagesView, changeDateFormat } = useMessagesHooks();

  return (
    <Wrapper>
      <PositionWrapper>
        <PossitionTopBarWrapper>
          <SectionName>Messages</SectionName>
          <NewRoomButton>new room</NewRoomButton>
        </PossitionTopBarWrapper>
        {
          messagesView && messagesView.map(({ content, date, roomName, senderName, roomId }:
            { content: string, date: string, roomName: string, senderName: string, roomId: string }) => (
              <RoomsListWrapper key={roomId} to={`/room/${roomId}/${roomName}`}>
                <RoomListName>{roomName}</RoomListName>
                <RoomListTime>{changeDateFormat(date)}</RoomListTime>
                <RoomListLastMessage>{`${senderName}: ${content}`}</RoomListLastMessage>
              </RoomsListWrapper>
          ))            
        }
      
      </PositionWrapper>
    </Wrapper>
  );
};

export default MessagesChat;