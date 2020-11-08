import React from 'react';
import { useParams, useHistory } from 'react-router-dom'; 

import smothArrowSvg from 'assets/icons/smoth_arrow.svg';

import useHooks from './useHooks';

import {
  MainWrapper,
  RoomTypeNameTopText,
  Text,
  Input,
  CreateButton,
  BackArrowWrapper,
  ArrowIcon,
} from './styles';

const CreateNewRoomPage = ({isThisCallingView} : {isThisCallingView?: boolean}) => {

  const { type, roomId, lastRoomName }: { type: string, roomId: string, lastRoomName: string } = useParams();
  const { goBack }: { goBack: Function } = useHistory();

  const { checkInputText, inputRef, isButtonActive, createNewRoom, changeRoomName, redirectToCallingRoom } = useHooks(goBack, roomId);
  
  return (
    <MainWrapper>
      {
        !isThisCallingView &&
          <BackArrowWrapper isMessage={type === 'message' || type === 'changeName'} onClick={() => {
            goBack();
          }}> 
            <ArrowIcon src={smothArrowSvg} alt="back"/>
          </BackArrowWrapper>
      }
      
      <RoomTypeNameTopText>
        {
          type === 'changeName' ? 'Change the room name' : `Create the ${type === 'message' ? 'message' : 'calling'} room`
        }
      </RoomTypeNameTopText>
      <Text>Wybierz nazwę dla swojego pokoju</Text>
      <Input placeholder={lastRoomName || "Kings"} ref={inputRef} onKeyDown={checkInputText}/>
      <CreateButton isMessage={type === 'message' || type === 'changeName'} isActive={isButtonActive} onClick={isThisCallingView ? redirectToCallingRoom : type === 'changeName' ? changeRoomName : createNewRoom}>{type === 'changeName' ? 'Zmień' : 'Stwórz'}</CreateButton>
    </MainWrapper>
  )
};

export default CreateNewRoomPage;