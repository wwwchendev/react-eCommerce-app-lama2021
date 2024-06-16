import styled from 'styled-components'
import { md, sm } from '@/components/layout/responsive'
import InfoIcon from './InfoIcon'
import CartCheckIcon from './CartCheckIcon'
import SuccessIcon from './SuccessIcon'
import PartyHornIcon from './PartyHornIcon'
import { useEffect, useState } from 'react'
import Icon from '@/components/icon'
const { HeartTick, HeartAdd, HeartRemove } = Icon

const AlertContainer = styled.div`
  display: block;
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`

const AlertContent = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0%);
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 2000;
  max-width: 450px;
  width: 100%;
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 2;
  font-size: 18px;

  h5 {
    letter-spacing: 2px;
  }
  ${sm({
    width: '90%',
  })};
`

const CloseBtn = styled.button`
  background: transparent;
  border: 1px solid #ddd;
  color: black;
  border-radius: 10px;
  cursor: pointer;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0;
  width: 100%;
  max-width: 3.5rem;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 0.5rem;
`

const IconWrapper = styled.div`
  height: 3rem;
  width: 3rem;
  margin: 0 auto;
  svg {
    max-width: 100%;
    max-height: 100%;
  }
`

export const Alert = ({ onClose, children, title, content, iconType }) => {
  const Icon = () => {
    if (iconType === 'success') {
      return <SuccessIcon />
    } else if (iconType === 'alert') {
      return
    } else if (iconType === 'cartCheck') {
      return <CartCheckIcon />
    } else if (iconType === 'info') {
      return <InfoIcon />
    } else if (iconType === 'celebrate') {
      return <PartyHornIcon />
    } else if (iconType === 'heartAdd') {
      return <HeartAdd />
    } else if (iconType === 'heartRemove') {
      return <HeartRemove />
    } else if (iconType === 'heartTick') {
      return <HeartTick />
    } else {
      return <InfoIcon />
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <AlertContainer>
      <AlertContent>
        {iconType && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <h5>{title}</h5>
        <p>{children}</p>
        <p>{content}</p>
        <CloseBtn onClick={onClose}>確定</CloseBtn>
      </AlertContent>
    </AlertContainer>
  )
}
