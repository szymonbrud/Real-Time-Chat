import React from 'react';

import copySvg from 'assets/icons/copy.svg';
import smothArrowSvg from 'assets/icons/smoth_arrow.svg';

import useHooks from './useHooks';
import {
  MainWrapper,
  BackArrowWrapper,
  LinkWrapper,
  LoadingText,
  Text,
  CopyButton,
  CopyIcon,
  ArrowIcon,
  InsideButtonWrapper,
  QrImage,
} from './styled';

const InvadeView = ({close, roomId, roomName} : { close: any, roomId: string, roomName: string }) => {

  const { animationCopyButton, copyButtonRef, image, invadeLink} = useHooks({roomId, roomName});

  return (
    <MainWrapper>
      <BackArrowWrapper onClick={close}>
        <ArrowIcon src={smothArrowSvg} alt="back"/>
      </BackArrowWrapper>
      {
        invadeLink ? 
          <>
            <Text>Invade by link or qr code</Text>
            <LinkWrapper>
              {invadeLink}
            </LinkWrapper>
            <CopyButton ref={copyButtonRef} onClick={animationCopyButton}>
              <InsideButtonWrapper className="beforeCopy">
                <CopyIcon src={copySvg}/>
                copy
              </InsideButtonWrapper>
              <InsideButtonWrapper className="afterCopy" style={{ display: 'none'}}>
                copied!
              </InsideButtonWrapper>
            </CopyButton>
            { image && <QrImage src={`data:image/png;base64, ${image}`} alt="qrCode"/>}
          </> : 
          <LoadingText>Ładowanie</LoadingText>
      }
    </MainWrapper>
  )
};

export default InvadeView;