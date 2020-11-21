import React from 'react';
import { useParams } from 'react-router-dom';

import useVoiceChatHooks from './useVoiceChatHooks';

import addUser from 'assets/icons/addUser.svg';
import disconnectCall from 'assets/icons/disconnectCall.svg';
import cameraSvg from 'assets/icons/camera.svg';
import microphoneSvg from 'assets/icons/microphone.svg';


import InvadeView from 'components/InvadeView';

import {
  MyVideo,
  MainWrapper,
  InvadeWrapper,
  InvadeIcon,
  DisconnectWrapper,
  DisconnectIcon,
  CammeraSwitchButton,
  MicrophoneSwitchbutton,
  CameraIcon,
  MicrophoneIcon
} from './styles'

const VoiceChatRoomPage = () => {
  const { roomId, roomName } : {roomId: string, roomName: string} = useParams();

  const {
    videoRef,
    videos,
    isInvadeViewOpen,
    setIsInvadeViewOpen,
    isCammeraRecord,
    disconnectMedia,
    micOrCamSwitch,
    isMicrophoneRecord
  } = useVoiceChatHooks(roomId)

  return (
    <>
      {isInvadeViewOpen && <InvadeView roomName={roomName} roomId={roomId} close={() => setIsInvadeViewOpen(false)} isCallRoom/>}
      <MainWrapper ref={videos}>
        <MyVideo muted autoPlay playsInline ref={videoRef} />
        <InvadeWrapper onClick={() => setIsInvadeViewOpen(true)}>
          <InvadeIcon alt="Invade" src={addUser}/>
        </InvadeWrapper>
        <DisconnectWrapper to="/voiceChat" onClick={disconnectMedia}>
          <DisconnectIcon src={disconnectCall} alt="disconnect"/>
        </DisconnectWrapper>
        <CammeraSwitchButton isActive={isCammeraRecord} onClick={() => { 
          micOrCamSwitch('video');
        }}>
          <CameraIcon src={cameraSvg} alt="camera" />
        </CammeraSwitchButton>
        <MicrophoneSwitchbutton isActive={isMicrophoneRecord} onClick={() => {
          micOrCamSwitch('audio');
        }}>
          <MicrophoneIcon src={microphoneSvg} alt="microphone"/>
        </MicrophoneSwitchbutton>
      </MainWrapper>
    </>
  )
};

export default VoiceChatRoomPage;
