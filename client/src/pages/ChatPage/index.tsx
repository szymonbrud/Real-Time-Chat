import React from 'react';
import { Redirect } from 'react-router-dom';
import { SendRounded } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';

import OnlineUsersfrom from 'components/OnlineUsers';
import LeaveButton from 'components/LeaveButton';

import useAuthentication from 'authentication/authenticationHooks';

import useChatConnection from './hooks';
import {
  MainWrapper,
  MessageSenderInput,
  MessagesMainWrapper,
  MessagesWrapper,
  SendButton,
  SenderWrapper,
  Message,
} from './styles';

const ChatPage = () => {
  const {
    messages,
    textInputRef,
    sendMessage,
    triggerSend,
    isRedirect,
    messageWrapperRef,
    diconnect,
    onlineUsers,
  } = useChatConnection();

  const { logout } = useAuthentication();

  return (
    <>
      <h1>hello I am chat page</h1>
      <button onClick={logout}>logout</button>
    </>
  );

  // if (isRedirect) {
  //   return <Redirect to="/" />;
  // }

  // return (
  //   <MainWrapper>
  //     <MessagesMainWrapper>
  //       <MessagesWrapper ref={messageWrapperRef}>
  //         {messages.map(({ isReceived, sender, text }, index) => {
  //           return (
  //             <Message isRight={isReceived} username={sender} key={text}>
  //               {text}
  //             </Message>
  //           );
  //         })}
  //       </MessagesWrapper>
  //       <SenderWrapper>
  //         <MessageSenderInput
  //           placeholder="napisz coś..."
  //           ref={textInputRef}
  //           onKeyUp={e => triggerSend(e)}
  //         />
  //         <SendButton onClick={sendMessage}>
  //           <SendRounded style={{ fontSize: 24, color: grey[50], marginLeft: 1 }} />
  //         </SendButton>
  //       </SenderWrapper>
  //     </MessagesMainWrapper>
  //     <OnlineUsersfrom onlineUsers={onlineUsers} />
  //     <LeaveButton diconnect={diconnect} />
  //   </MainWrapper>
  // );
};

export default ChatPage;
