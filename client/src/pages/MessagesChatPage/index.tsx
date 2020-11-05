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
          <NewRoomButton to="newRoom/message">new room</NewRoomButton>
        </PossitionTopBarWrapper>
        {
          messagesView && messagesView.map(({ content, date, roomName, senderName, roomId }:
            { content: string, date: string, roomName: string, senderName: string, roomId: string }) => (
              <RoomsListWrapper key={roomId} to={`/room/${roomId}/${roomName}`}>
                <RoomListName data-testid="roomNameList">{roomName}</RoomListName>
                {changeDateFormat(date) && <RoomListTime>{changeDateFormat(date)}</RoomListTime>}
                {senderName && content && <RoomListLastMessage>{`${senderName}: ${content}`}</RoomListLastMessage>}
              </RoomsListWrapper>
          ))            
        }
      
      </PositionWrapper>
    </Wrapper>
  );
};

export default MessagesChat;