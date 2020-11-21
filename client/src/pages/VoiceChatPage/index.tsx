import React from 'react'

import CreateNewRoomPage from 'pages/CreateNewRoomPage';

import { Wrapper } from './styles';


const VoiceChat = () => (
  <Wrapper>
    <CreateNewRoomPage isThisCallingView={true} />
  </Wrapper>
)

export default VoiceChat