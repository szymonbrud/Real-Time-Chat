import React from 'react';
import { useParams } from 'react-router-dom';

import sendSvg from 'assets/icons/send.svg';
import addUser from 'assets/icons/addUser.svg';
import sendBlueSvg from 'assets/icons/sendBlue.svg';
import smothArrowSvg from 'assets/icons/smoth_arrow.svg';
import { ReactComponent as MoreSvg } from 'assets/icons/circles.svg';

import InvadeView from 'components/InvadeView';

import useRoomHook from './useHooks'
import {
  MainWrapper,
  MenuWrapper,
  MessagesWrapper,
  BackArrowWrapper,
  BackArrow,
  RoomName,
  Message,
  MessageWriteInput,
  SendButton,
  WrapperWriteMessageBottomBar,
  SendIcon
} from './styles'

const RoomPage = () => {

  let { id, roomName }: { id: string, roomName: string } = useParams();
  const {
    iconMoreRef,
    isInputFocused,
    setIsInputFocused,
    isInputHasText,
    checkInputHasText,
    messages,
    textInput,
    sendMessage,
    backToMessageView,
    isInvadeViewOpen,
    setIsInvadeViewOpen,
    messageWrapperRef
  } = useRoomHook(id);

  return (
    <>
      {isInvadeViewOpen && <InvadeView roomName={roomName} roomId={id} close={() => setIsInvadeViewOpen(false)} /> }
      <MainWrapper>
        <MenuWrapper>
          <BackArrowWrapper onClick={backToMessageView} to="/messagesChat">
            <BackArrow src={smothArrowSvg} alt="back" />
          </BackArrowWrapper>
          <RoomName>{roomName}</RoomName>
          <img src={addUser} style={{ width: '25px', margin: '0 20px 0 auto' }} onClick={() => setIsInvadeViewOpen(true)} />
          <MoreSvg style={{ width: '25px', transform: 'rotate(90deg)', margin: '0 10px 0 0'}} ref={iconMoreRef}/>
        </MenuWrapper>
        <MessagesWrapper ref={messageWrapperRef}>
          {
            messages.length === 0 ?
              <h4>ladowanie</h4> : 
              messages.map((message : any) => (
                <Message isMy={message.isSendByMe} senderName={message.senderName} key={message._id}>
                  {message.content}
                </Message>
              ))
          }
          <WrapperWriteMessageBottomBar isFocused={isInputFocused}>
            <MessageWriteInput placeholder="Write the message..." onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} onKeyDown={(event) => checkInputHasText(event)} ref={textInput}/>
            <SendButton onClick={sendMessage}>
              <SendIcon src={isInputHasText ? sendBlueSvg : sendSvg} alt="send"/>
            </SendButton>
          </WrapperWriteMessageBottomBar>
        </MessagesWrapper>
      </MainWrapper>
    </>
  )
}

export default RoomPage;