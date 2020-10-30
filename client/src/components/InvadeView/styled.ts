import styled from 'styled-components'

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #8D9CF4;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const BackArrowWrapper = styled.div`
  width: 45px;
  height: 45px;
  background: #B6C0FF;
  position: absolute;
  top: 38px;
  left: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

export const Text = styled.p`
  color: white;
  font-size: 18px;
  font-family: ${({theme}) => theme.fonts.ropa};
`;

export const LinkWrapper = styled.div`
  width: calc(100% - 60px);
  margin: 52px 30px 0;
  background-color: white;
  border-radius: 5px;
  height: 39px;
  display: flex;
  align-items: center;
  padding: 0 0 0 18px;
  overflow: hidden;
  font-size: 14px;
`;

export const CopyButton = styled.button`
  background-color: #38507E;
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: none;
  color: white;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.ropa}; 
  display: flex;
  align-items: center;
  justify-content: center;  
  margin: 22px 0 0 0;
  position: relative;

  :focus{
    outline: 0;
  }
`;

export const InsideButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 4px;
`;

export const CopyIcon = styled.img`
  width: 15px;
  margin-right: 5px;
`;

export const ArrowIcon = styled.img`
  width: 30px;
`;

export const QrImage = styled.img`
  margin-top: 70px;
`;

export const LoadingText = styled.p`
  color: #38507E;
`;