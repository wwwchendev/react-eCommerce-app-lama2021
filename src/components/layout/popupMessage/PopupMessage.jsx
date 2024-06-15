import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie';
import { Close } from '@material-ui/icons';
import { Button } from '@/components/common'
import { useNavigate, useLocation } from 'react-router-dom'
import { md, sm } from '@/components/layout/responsive';

const Container = styled.div`
z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ${Button} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const InnerWrapper = styled.div`
  position: relative;
  height: 500px;
  width: 400px;
    /* border: 1px solid #ff0b48; */
`;

const ContentContainer = styled.div`
height: 100%;
border-radius: 50% 50% 0 0;
overflow: hidden;
cursor: pointer;
`
const Content = styled.div`
/* border: 1px solid #0b0fff; */
height: 100%;
background-image: url("https://images.unsplash.com/photo-1512117245022-861aeca0d689?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
background-size: cover;
`

const Bottom = styled.div`
  width: 10rem;
  display: flex;
  width: 100%;
  height: 50px;
`
const BottomItem = styled.div`
  flex: ${(p) => (p.$flex ? p.$flex : '')};
  text-align: center;
  transition: all 0.5s ease;
  button {
    font-size: ${(p) => (p.$fontSize ? p.$fontSize : '')};
    width: 100%;
    height: 100%;
    background-color: ${(p) => (p.$bg ? p.$bg : "")};
    color: ${(p) => (p.$color ? p.$color : "")};
    border: none;
    cursor: pointer;
  }

`;

const CloseContainer = styled.div`
 /* border: 1px solid #a8eb2d; */
position: absolute;
z-index: 100;
top: 0.5rem;
right: 0.5rem;
color: #fff;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap:4px;
font-size: 12px;
`

const CloseButton = styled(Button)`
  background-color:#68400f;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
  background-color:rgb(63, 63, 63);
  }
`;


const ThumbnailContainer = styled.div`  
 /* border: 1px solid #0b0fff; */
position: fixed;
z-index: 9;
bottom:4.5rem;
right: 1.5rem;
width: 120px;
height: 145px;
${sm({
  display: 'none'
})}
${CloseContainer} {
  top: 0rem;
right: 0rem;
}
${InnerWrapper} { 
  width: 100%;
  height: 100%;
border-radius: 50% 50% 0 0;
overflow: hidden;
}
`
export const PopupMessage = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const [hoveredBottomItem, setHoveredBottomItem] = useState('action');
  //關閉視窗
  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(false);
  //本日不再顯示
  const [cookies, setCookie] = useCookies(['popupMessage']);
  //檢查該頁面是否顯示插件
  const isDisplayPage = (pathname) => {
    const displayPages = ['/', '/news', '/products'];
    if (displayPages.includes(pathname)) {
      return true;
    }
    const productMatch = /^\/products\/[^/]+$/;
    const newsMatch = /^\/news\/[^/]+$/;
    return productMatch.test(pathname) || newsMatch.test(pathname);
  };

  useEffect(() => {
    if (isDisplayPage(location.pathname)) {
      if (cookies.popupMessage?.main !== false) {
        setShowPopupMessage(true);
        document.body.style.overflow = 'hidden';
      }
      setShowThumbnail(true);
      if (cookies.popupMessage?.thumbnail === false) {
        setShowThumbnail(false);
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [cookies]);


  if (!isDisplayPage(location.pathname)) { return null; }


  const handleAction = () => {
    navigate('/products/P202405007')
    handleClose()
  }

  //設置cookie
  const handleDontShowToday = (type) => {
    const now = new Date();
    const expireTime = now.getTime() + 1000 * 3600 * 24;
    const expireDate = new Date(expireTime);
    if (type === "main") {
      setCookie('popupMessage', { main: false }, { path: '/', expires: expireDate });
    } else if (type === "thumbnail") {
      setCookie('popupMessage', { main: false, thumbnail: false }, { path: '/', expires: expireDate });
    }


    handleClose();
  };

  //關閉視窗
  const handleClose = () => {
    setShowPopupMessage(false)
    setShowThumbnail(true)
    document.body.style.overflow = 'auto';
  }

  return (
    showPopupMessage
      ? (
        <Container>
          <InnerWrapper >
            <CloseContainer>
              <CloseButton type="button" onClick={handleClose}>
                <Close />
              </CloseButton>
              Close
            </CloseContainer>
            <ContentContainer onClick={() => {
              handleAction()
              handleDontShowToday("main")
            }}>
              <Content />
            </ContentContainer>
            <Bottom>
              <BottomItem
                $bg="#68400f"
                $flex={hoveredBottomItem === 'dontShow' ? '2' : '1'}
                $fontSize={hoveredBottomItem === 'dontShow' ? '18px' : '14px'}
                $color={hoveredBottomItem === 'dontShow' ? '#fff' : 'rgb(255, 255, 255,0.5)'}
                onMouseEnter={() => setHoveredBottomItem('dontShow')}
                onMouseLeave={() => setHoveredBottomItem('action')}
              >
                <button type="button" onClick={() => {
                  handleDontShowToday("main")
                }}>
                  本日不再彈出
                </button>
              </BottomItem>
              <BottomItem
                $bg="#5f300a"
                $flex={hoveredBottomItem === 'dontShow' ? '1' : '2'}
                $fontSize={hoveredBottomItem === 'action' ? '20px' : '14px'}
                $color={hoveredBottomItem === 'action' ? '#ffffff' : 'rgb(255, 255, 255,0.5)'}
                onMouseEnter={() => setHoveredBottomItem('action')}
                onMouseLeave={() => setHoveredBottomItem('action')}
              >
                <button
                  type="button"
                  onClick={() => {
                    handleAction()
                    handleDontShowToday()
                  }}
                  style={{ letterSpacing: '5px' }}>
                  立即搶購🔥</button>
              </BottomItem>
            </Bottom>
          </InnerWrapper>
        </Container>)
      : showThumbnail ? (
        <ThumbnailContainer>
          <CloseContainer>
            <CloseButton type="button"
              onClick={
                () => {
                  setShowThumbnail(false)
                  handleDontShowToday("thumbnail")
                }
              }
            >
              <Close />
            </CloseButton>
          </CloseContainer>
          <InnerWrapper>
            <ContentContainer onClick={() => {
              handleAction()
              handleDontShowToday("thumbnail")
            }}>
              <Content />
            </ContentContainer>
          </InnerWrapper>
        </ThumbnailContainer >
      ) : null
  )
}
