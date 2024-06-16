import styled from 'styled-components'
import { md, sm } from '@/components/layout/responsive'
import { Button, StyledLink } from '@/components/common'
import { useCookies } from 'react-cookie'

const Container = styled.div`
  z-index: 999;
  background-color: #3f3f3f;
  color: #fff;
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  width: 400px;
  min-height: 160px;
  line-height: 1.75;
  border-radius: 5px;
  ${md({
  width: '100%',
  minHeight: '150px',
  borderRadius: '0',
  bottom: 0,
  left: 0,
})}
  button {
    color: #ff9e1b;
    border: 1px solid #ff9e1b;
    background-color: transparent;
    padding: 0.5rem;
    width: 4rem;
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
  }
`
const Wrapper = styled.div`
  padding: 20px 30px;
`

export const CookieConsent = () => {
  const [cookie, setCookie] = useCookies(['cookieConsent'])

  function giveCookieConsent() {
    setCookie('cookieConsent', true, { path: '/' })
  }

  return (
    <Container>
      <Wrapper>
        我們使用Cookies來改善您的用戶體驗，繼續瀏覽本網站即表示您接受本公司使用Cookie來收集數據，
        <StyledLink $color='#ff9e1b' to='/about?type=privatePolicy'>
          詳情請參閱隱私政策
        </StyledLink>
        <Button onClick={giveCookieConsent}>確認</Button>
      </Wrapper>
    </Container>
  )
}
