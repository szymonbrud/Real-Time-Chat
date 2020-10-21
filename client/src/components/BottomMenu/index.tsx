import React from 'react';

import Routers from 'Routers';

import BottomMenuHooks from './hooks';

import {
  Wrapper,
  StyledLink,
  Text
} from './styles';

const BottomMenu = () => {

  const { switchPage, wrapperRef, currentPage } = BottomMenuHooks();

  return (
    <Wrapper ref={wrapperRef}>
      {
        Routers.map(({path, Icon, name, color} : {path: string, Icon: any, name: string, color: string}, index) => {
          return (
            <StyledLink to={path} onClick={() => switchPage(index)}>
              <Icon style={{ width: '20px' }} className="icon"/>
              <Text isAcitve={currentPage === index} color={color} className="text">{name}</Text>
            </StyledLink>
          )
        })
      }
    </Wrapper>
  )
}

export default BottomMenu