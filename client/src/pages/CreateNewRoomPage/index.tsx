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
  ArrowIcon
} from './styles';

const CreateNewRoomPage = () => {

  const { type }: { type: string } = useParams();
  const { goBack }: { goBack: Function } = useHistory();

  const { checkInputText, inputRef, isButtonActive, createNewRoom } = useHooks(goBack);
  
  return (
    <MainWrapper>
      <BackArrowWrapper isMessage={type === 'message'} onClick={() => {
        goBack()
      }}>
        <ArrowIcon src={smothArrowSvg} alt="back"/>
      </BackArrowWrapper>
      <RoomTypeNameTopText>
        {`Create the ${type === 'message' ? 'message' : 'calling'} room`}
      </RoomTypeNameTopText>
      <Text>Wybierz nazwę dla swojego pokoju</Text>
      <Input placeholder="Kings" ref={inputRef} onKeyDown={checkInputText}/>
      <CreateButton isMessage={type === 'message'} isActive={isButtonActive} onClick={createNewRoom}>Stwórz</CreateButton>
    </MainWrapper>
  )
};

export default CreateNewRoomPage;