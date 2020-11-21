import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import {
  BackButton,
  JoinButton,
  MainWrapper,
  RoomNameWrapper,
  Text,
  MainButtonWrapper
} from './styles';

import useHooks from './useHooks';

enum JoinStatus {
  wait,
  success,
  error,
}

const JoinPage = () => {
  let { key, roomName, type }: { key: string, roomName: string, type: string } = useParams();
  
  const { join, status, joinCalling, redirectToCallingRoom, roomId } = useHooks(key);

  if (redirectToCallingRoom.length > 0) {
    return <Redirect to={redirectToCallingRoom}/>
  }

  const mainPage = (
    <MainWrapper>
      <Text>{`Do u want to join to ${type === 'message' ? 'message chat.' : 'calling.'}`}</Text>
      <RoomNameWrapper>{roomName}</RoomNameWrapper>
      <MainButtonWrapper>
        <BackButton to="/">back</BackButton>
        <JoinButton isMessage={type === 'message'} onClick={type === 'message' ? join : joinCalling}>join</JoinButton>
      </MainButtonWrapper>
    </MainWrapper>
  )

  const errorPage = (
    <MainWrapper>
      <Text>Błąd podczas dołączania do pokoju, pamiętaj że tylko jedna osoba może dłączyć z jendego linku</Text>
      <BackButton to="/">back</BackButton>
    </MainWrapper>
  )

  const successPage = <Redirect to={`/#/room/${roomId}/${roomName}`} />

  switch (status) {
    case JoinStatus.wait:
      return mainPage;
    case JoinStatus.success:
      return successPage;
    case JoinStatus.error:
      return errorPage;
  }
};

export default JoinPage;
