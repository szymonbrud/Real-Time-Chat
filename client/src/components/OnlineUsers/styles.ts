import styled from 'styled-components';

export const MainWrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 24vw;
  height: 40vh;
  margin-left: 13vw;
`;

export const User = styled.p`
  font-size: 20px;
  margin: 15px 0 0 10px;
  position: relative;

  ::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 0;
    transform: translateY(70%);
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.blue};
  }
`;

export const SectionName = styled.p`
  font-weight: 600;
  font-size: 25px;
  margin: 0 0 10px 0;
`;

export const BlueText = styled.span`
  color: ${({ theme }) => theme.colors.blue};
`;
