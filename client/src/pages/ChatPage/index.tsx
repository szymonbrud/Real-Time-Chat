import React from 'react';
import { Redirect } from 'react-router-dom';
import { SendRounded } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';

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
  } = useChatConnection();

  if (isRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <MainWrapper>
      <MessagesMainWrapper>
        <MessagesWrapper ref={messageWrapperRef}>
          {messages.map(({ isReceived, sender, text }, index) => {
            console.log(messages.length, index);
            return (
              <Message isRight={isReceived} username={sender}>
                {text}
              </Message>
            );
          })}
        </MessagesWrapper>
        <SenderWrapper>
          <MessageSenderInput
            placeholder="napisz coś..."
            ref={textInputRef}
            onKeyUp={(e) => triggerSend(e)}
          />
          <SendButton onClick={sendMessage}>
            <SendRounded style={{ fontSize: 24, color: grey[50], marginLeft: 1 }} />
          </SendButton>
        </SenderWrapper>
      </MessagesMainWrapper>
    </MainWrapper>
  );
};

export default ChatPage;
