import { useEffect } from 'react'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px) scaleX(1.3);
  }
  60% {
    transform: translateY(-10px);
  }
`

const ToTopButton = styled.button`
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 1000;
  background-color: transparent;
  border: none;
  display: flex;
  cursor: ${p => (p.$showButton ? 'pointer' : '')};
  padding: 5px 5px;
  outline: none;
  opacity: ${p => (p.$showButton ? 1 : 0)};
  transition: opacity ease 0.8s;
`

const Icon = styled.img`
  width: 20px;
  opacity: 1;
  transition: all ease 0.2s;

  /* 彈跳動畫 */
  ${ToTopButton}:hover & {
    animation: ${bounceAnimation} 2s ease infinite;
  }
`

export const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY

      // 如果滾動高度超過視窗高度的20%，則顯示按鈕，否則隱藏
      setShowButton(scrollTop > windowHeight * 0.2)
    }

    // 監聽滾動事件
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <ToTopButton $showButton={showButton} onClick={handleScrollToTop}>
      <Icon
        src='/images/icons/widget/double-arrow-up.svg'
        alt='scroll-to-top'
      />
    </ToTopButton>
  )
}
