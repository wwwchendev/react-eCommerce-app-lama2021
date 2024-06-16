import { useEffect, useState, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import * as Layout from '@/components/layout'
import { CookieConsent } from '@/components/layout'
import { useCookies } from 'react-cookie'
import { useLocation, Outlet, Link } from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}
  /* 設置卷軸樣式 */
  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }

  ::-webkit-scrollbar-thumb {
    background: #afa09b;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #7a6c60; /* 當鼠標懸停時的顏色 */
  }

  ::-webkit-scrollbar-track {
    background: #dbd1d1; /* 卷軸軌道的顏色 */
    border-radius: 6px;
  }
  *{
    box-sizing: border-box;
  }
`

const Container = styled.div`
  position: relative;
  height: 100%;
`

function App() {
  const [cookies] = useCookies(['cookieConsent'])
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <GlobalStyle />
      <Layout.Navbar />
      <Container>
        <Outlet />
      </Container>
      {!cookies.cookieConsent && <CookieConsent />}
    </>
  )
}

export default App
