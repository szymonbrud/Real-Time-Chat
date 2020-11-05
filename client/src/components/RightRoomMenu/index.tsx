import React from 'react';

import smothArrowSvg from 'assets/icons/smoth_arrow.svg';

import {
  MainWrapper,
  BackArrow,
  BackArrowWrapper,
  OptionBoard
} from './styles';

const RightRoomMenu = ({menu, close} : {menu : any, close: any}) => {
  return (
    <MainWrapper>
      <BackArrowWrapper onClick={close}>
        <BackArrow src={smothArrowSvg} alt="back" />
      </BackArrowWrapper>
      {
        menu.map(({ name, action } : { name: string, action: any}) => (
          <OptionBoard onClick={action}>{name}</OptionBoard>
        ))
      }
    </MainWrapper>
  )
};

export default RightRoomMenu;