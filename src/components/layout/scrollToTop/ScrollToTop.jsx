import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px) scaleX(1.3);
  }
  60% {
    transform: translateY(-4px);
  }
`

const ToTopButton = styled.button`
z-index: 888;
  position: fixed;
  bottom:28px;
  right: 24px;
  background-color: #fff;
  border: none;
  display: flex;
  cursor: ${p => (p.$showButton ? 'pointer' : '')};
  padding:6px 8px;
  outline: none;
  opacity: ${p => (p.$showButton ? 1 : 0)};
  transition: opacity ease 0.8s;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  /* border:1.5px solid #000000; */
  border-radius: 5px;
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
