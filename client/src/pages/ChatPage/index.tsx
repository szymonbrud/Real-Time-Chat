import React from 'react';

import useChatConnection from './hooks';
import { SendRounded } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { Redirect } from 'react-router-dom';

import gsap from 'gsap';

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
  const { messages, textInputRef, sendMessage, triggerSend, isRedirect } = useChatConnection();

  const refDiv: React.RefObject<HTMLDivElement> = React.useRef(null);

  const refMessage: React.RefObject<HTMLDivElement> = React.useRef(null);

  React.useEffect(() => {
    if (refDiv.current) {
      refDiv.current.scrollTop = refDiv.current.scrollHeight;
    }

    // gsap.fromTo(
    //   refMessage.current,
    //   {
    //     x: 100,
    //   },
    //   {
    //     x: 0,
    //     duration: 0.3,
    //   },
    // );
  }, [messages]);

  if (isRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <MainWrapper>
      <MessagesMainWrapper>
        <MessagesWrapper ref={refDiv}>
          {messages.map(({ isReceived, sender, text }, index) => {
            console.log(messages.length, index);
            return (
              <Message
                isRight={isReceived}
                username={sender}
                ref={messages.length === index + 1 ? refMessage : null}
              >
                {text}
              </Message>
            );
          })}
        </MessagesWrapper>
        <SenderWrapper>
          <MessageSenderInput
            placeholder="write somethink..."
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
