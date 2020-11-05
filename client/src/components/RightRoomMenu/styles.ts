import styled from 'styled-components';

export const MainWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const BackArrowWrapper = styled.div`
  width: 45px;
  height: 45px;
  background-color: #8D9CF4;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 40px;
  left: 40px;
`;

export const BackArrow = styled.img`
  width: 28px;
`;

export const OptionBoard = styled.button`
  width: 100%;
  height: 60px;
  background: #F5F6FA;
  display: flex;
  align-items: center;
  padding-left: 40px;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.ropa};
  border: 0;
`;