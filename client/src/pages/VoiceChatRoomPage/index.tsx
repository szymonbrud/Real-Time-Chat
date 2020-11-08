import React from 'react';
import { useParams } from 'react-router-dom';

import useVoiceChatHooks from './useVoiceChatHooks';

import {
  IncommingVideo,
  MyVideo,
  MainWrapper
} from './styles'

const VoiceChatRoomPage = () => {
  const { roomId, roomName } : {roomId: string, roomName: string} = useParams();

  const { isVideoChatOpen, joinToVoiceChatRoom, number, videoIncommingRef, videoRef, videos} = useVoiceChatHooks(roomId)

  return (
    <MainWrapper ref={videos}>
      <MyVideo muted autoPlay playsInline ref={videoRef} />
    </MainWrapper>
  )
};

export default VoiceChatRoomPage;
