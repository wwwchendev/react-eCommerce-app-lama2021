import styled from 'styled-components';
import { sm } from '@/components/layout/responsive';
import InfoIcon from './InfoIcon';
import CartCheckIcon from './CartCheckIcon';
import SuccessIcon from './SuccessIcon';
import PartyHornIcon from './PartyHornIcon';
import { useEffect, useState } from 'react'
import Icon from '@/components/icon';
const { HeartAdd } = Icon;

const AlertContainer = styled.div`
  display: block;
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const AlertContent = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0%);
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 2000;
  max-width: 450px;
  max-height: 230px;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 2;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;

  h5 {
    letter-spacing: 2px;
  }
  ${sm({
  width: '90%',
})};
`;

const ButtonWrapper = styled.div`
display: flex;
  justify-content: center;  
gap: 1rem;
/* border: 1px solid red; */
width: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  button{
  display: flex;
  align-items: center;
  justify-content: center;    
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  max-width: 3.5rem;
  padding: 0.2rem 0;
  letter-spacing: 2px;
  border-radius: 10px;
  }
  
`
const TrueButton = styled.button`
background: #ddd;
border: 1px solid #ddd;
color: black;
`;
const FalseButton = styled.button`
  background: transparent;
  border: 1px solid #ddd;
  color: black;
`;

const IconWrapper = styled.div`
  height: 3rem;
  width: 3rem;
  margin: 0 auto;
  svg {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const Confirm = ({ onClose, onConfirm, children, title, content, iconType, hiddenCancelButton }) => {
  const Icon = () => {
    if (iconType === 'success') {
      return <SuccessIcon />;
    } else if (iconType === 'alert') {
      return;
    } else if (iconType === 'cartCheck') {
      return <CartCheckIcon />;
    } else if (iconType === 'info') {
      return <InfoIcon />;
    } else if (iconType === 'celebrate') {
      return <PartyHornIcon />;
    } else if (iconType === 'heartAdd') {
      return <HeartAdd />;
    } else {
      return <InfoIcon />;
    }
  };


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AlertContainer>
      <AlertContent>
        {iconType && (
          <IconWrapper >
            <Icon />
          </IconWrapper>
        )}
        <h5>{title}</h5>
        <p>{children}</p>
        <p>{content}</p>

        <ButtonWrapper>
          {!hiddenCancelButton && <FalseButton onClick={onClose}>取消</FalseButton>}
          <TrueButton onClick={onConfirm}>確定</TrueButton>
        </ButtonWrapper>
      </AlertContent>
    </AlertContainer>
  );
};
