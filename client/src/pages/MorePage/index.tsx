import React from 'react'

import useAuthenticationHook from 'authentication/useAuthenticationHooks';

import { Wrapper } from './styles'

const More = () => {
  const { logout} = useAuthenticationHook();
    return (
        <Wrapper>
          <h1>More</h1>
        <button style={{ background: 'red', width: '200px', height: '70px' }} onClick={logout}>LOG OUT</button>
        </Wrapper>
    );
}

export default More;