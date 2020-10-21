import styled, {css} from 'styled-components'
import { Link } from 'react-router-dom';
import { AnyARecord } from 'dns';


export const Wrapper = styled.div`
  width: 100%;
  height: 76px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 17px 17px 0 0;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-decoration: none;
  height: 40px;
`

export const Text = styled.p`
  margin: 5px 0 0 0;
  font-size: 10px;
  color: #BBBBC2;

  ${({isAcitve, color}: {isAcitve: boolean, color: string}) => isAcitve && css`
    /* color: ${color} */
  `}
`;