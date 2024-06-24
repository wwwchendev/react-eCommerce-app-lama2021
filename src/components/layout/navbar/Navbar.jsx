import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { useConfigs } from '@/context/ConfigsContext'
import { shopInfo } from '@/utils/data'
import { AuthUserRequests } from '@/store/authUser'
import { cartRequests, clearCartError } from '@/store/cart'
//components
import styled from 'styled-components'
import Icon from '@/components/icon'
const { Heart, Cart1, People, ArrowDown } = Icon
import { xs, sm, md, lg, xl } from '@/components/layout/responsive'
import { Button, IconButton } from '@/components/common'
import Announcement from './Announcement'
import { Container } from '@material-ui/core'
import customAxios from '@/utils/axios/customAxios'
import { CloseRounded } from '@material-ui/icons'
import store from '@/store/configureStore'

const HeaderWrapper = styled.div`
  /* 行動版選單打開後背景會覆蓋淡黑色背景 */
  position: fixed;
  z-index: 700;
  top: 0;
  left: 0;
  width: 0%;
  height: 0%;
  background-color: none;
  ${sm({
  width: p => (p.$open ? '100%' : '0%'),
  height: p => (p.$open ? '100%' : '0%'),
  backgroundColor: p => (p.$open ? 'rgba(0, 0, 0, 0.8)' : ''),
})};
`
const HeaderBg = styled.div`
  box-shadow: 0px 5px 16px rgba(204, 204, 204, 0.25);
  position: fixed;
  background-color: #fff;
  width: 100%;
  display: block;
  * {
    margin: 0;
    box-sizing: border-box;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    a {
      text-decoration: none;
    }
  }
  margin-top: ${p => p.$offset}rem;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`
const HeaderItem = styled.div`
  flex: ${p => {
    if (p.$position === 'left') {
      return '0 0 17%'
    } else if (p.$position === 'center') {
      return '0 0 auto'
    } else {
      return '0 0 17%'
    }
  }};

  ${sm({
    flex: p => {
      if (p.$position === 'left') {
        return '0 0 100%'
      } else if (p.$position === 'center') {
        return '0 0 auto'
      } else if (p.$position === 'right') {
        return '0 0 auto'
      }
    },
    order: p => {
      if (p.$position === 'left') {
        return 2
      } else if (p.$position === 'center') {
        return 3
      } else if (p.$position === 'right') {
        return 1
      }
    },
  })};

  &:nth-child(3) {
  display: flex;
  justify-content: flex-end;
    ${sm({
    display: 'none',
  })}
  }
`

// MobileMenuTrigger
const MobileMenuTrigger = styled.div`
  display: none;
  z-index: 100;

  ${sm({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  height: '30px',
  width: '30px',
  right: '0',
  top: '0.5rem',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
})};
`
const MobileMenuLine = styled.span`
  position: absolute;
  width: 24px;
  height: 4px;
  background-color: #c9a388;
  cursor: pointer;
  border-radius: 8px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #c9a388;
    border-radius: 8px;
  }
  &::before {
    top: -8px;
  }
  &::after {
    top: 8px;
  }
`
const MobileMenuHeader = styled.div`
  ${sm({
  display: 'flex',
  height: '50px',
  padding: '0 0rem',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  alignItems: 'center',
  justifyContent: 'flex-end',
})}
`
const CloseBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: #c9a388;
  border: none;
  display: none;
  outline: none;
  height: 100%;
  width: 50px;

  ${sm({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderLeft: '1px solid rgba(0,0,0,0.1)',
})}
`
const MobileMenuWrapper = styled.div`
  display: none;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  ${sm({
  display: 'flex',
})}
`
const SignupAndLogin = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  button {
    border: 1px solid #aa8a74;
    color: #aa8a74;
    background-color: transparent;
    padding: 0.25rem 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      border: 1px solid #aa8a74;
      color: #fff;
      background-color: #aa8a74;
    }
  }
`
//🔺HeaderItem(左)-LOGO
const Logo = styled.h1`
  a {
    text-decoration: none;
    color: #474747;
    font-family: 'Architects Daughter', cursive;
  }
  font-weight: bold;
  text-align: center;
  font-size: 2rem;
  padding: 0 4px;
  white-space: nowrap;
  cursor: pointer;
  ${sm({
  fontSize: '1.8rem',
})};
`
//🔺HeaderItem(中)-Menu
const MenuWrapper = styled.nav`
  display: block;
  z-index: 100;
  ${sm({
  overflowY: 'scroll',
  display: p => (p.$open ? 'block' : 'none'),
  position: 'fixed',
  width: '80%',
  backgroundColor: '#fff',
  boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
  left: '0',
  top: '0',
  height: '100%',
  marginTop: p => `${p.$offset}rem`,
  padding: '0 0 3rem 0',
})};
`
//第一層級選單
const MainMenu = styled.ul``
const MainMenuItem = styled.li`
  display: inline-block;
  margin-left: 24px;
  a {
    font-size: 15px;
    color: ${p => (p.$$open ? '#aa5d5d' : '#000')};
    position: relative;
    ${sm({
  fontSize: '16px',
})}
  }
  &:hover {
    cursor: pointer;
  }
  ${sm({
  display: 'flex',
  flexDirection: p => (p.$flexDirection ? p.$flexDirection : 'column'),
  lineHeight: '3',
  marginLeft: '0px',
  padding: '0 16px',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  width: '100%',
})}
`
const MainMenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  ${sm({
  height: '100%',
  justifyContent: p =>
    p.$justifyContent ? p.$justifyContent : 'space-between',
})}
`
const MainMenuItemTitle = styled(Link)``

//第二層級選單
const SubMenu = styled.div`
  position: absolute;
  z-index: 500;
  background-color: #ffffff;
  box-shadow: -2px 2px 70px -25px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  transition: all 0.5s ease;
  margin-top: ${p => (p.$display ? '16px' : '25px')};
  opacity: ${p => (p.$display ? '1' : '0')};
  visibility: ${p => (p.$display ? 'visible' : 'hidden')};

  /* 用偽元素製作三角形 */
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 20px solid #fff;
    top: -10px;
    right: 50%;
    ${sm({
  display: 'none',
})}
  }

  ${sm({
  position: 'relative',
  width: '100%',
  top: '0px',
  flexDirection: p => (p.$flexDirection ? p.$flexDirection : 'column'),
  transform: 'translateX(0%)',
  visibility: p => (p.$display ? 'visible' : 'hidden'),
  boxShadow: 'none',
  opacity: p => (p.$display ? '1' : '0'),
  textAlign: 'center',
  transition: 'none',
  marginTop: 0,
  padding: '0 1rem',
  display: p => (p.$display ? 'flex' : 'none'),
  flexWrap: 'wrap',
})}
`
const SubMenuLg = styled(SubMenu)`
  margin-top: ${p => (p.$display ? '16px' : '25px')};
  width: 100%;
  max-width: 1000px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem 2rem;
  align-items: flex-start;
  &::after {
    display: none;
  }
  ${sm({
  marginTop: 0,
  display: p => (p.$display ? 'flex' : 'none'),
  flexDirection: p => (p.$flexDirection ? p.$flexDirection : 'column'),
  flexWrap: 'wrap',
  padding: p => (p.$padding ? p.$padding : '0rem 0rem 1rem 2rem'),
})}
`
const SubMenuLgItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2;
  img {
    margin: 0 auto;
    width: auto;
    height: auto;
    object-fit: cover;
    max-width: 100%;
  }
  br {
    ${sm({
  display: 'none',
})}
  }

  ${sm({
  width: '100%',
  flexWrap: 'wrap',
  textAlign: 'left',
  flexDirection: 'column',
})}
`
const SubMenuTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h4 {
    line-height: 2;
    font-weight: bold;
    ${sm({
  fontWeight: 'normal',
})}
  }

  button {
    display: none;
    ${sm({
  display: 'flex',
})}
  }
`
// 最新消息
const NewsWrapper = styled(SubMenu)`
  margin-top: ${p => (p.$display ? '16px' : '25px')};
  width: 100%;
  max-width: 1000px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 2rem;
  align-items: flex-start;
  gap: 8px;
  &::after {
    display: none;
  }
  ${sm({
  margin: 0,
  padding: 0,
  display: p => (p.$display ? 'flex' : 'none'),
})}
`
const NewsImageWrapper = styled(Link)`
  flex: 1;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f3f3f3;
  img {
    margin: 0 auto;
    height: auto;
    max-height: 200px;
    object-fit: cover;
  }
`
//商品列表
const ThirdMenu = styled.ul`
  text-indent: 1rem;
  font-size: 15px;
  color: #555555;
  ${sm({
  position: 'relative',
  width: '100%',
  top: '0px',
  transform: 'translateX(0%)',
  visibility: p => (p.$display ? 'visible' : 'hidden'),
  bosmhadow: 'none',
  opacity: p => (p.$display ? '1' : '0'),
  marginTop: 0,
  display: p => (p.$display ? 'flex' : 'none'),
  flexDirection: p => (p.$flexDirection ? p.$flexDirection : 'column'),
  flexWrap: 'wrap',
  textIndent: '2rem',
})}
`
const AboutMenu = styled(SubMenu)`
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  li {
    line-height: 1;
    margin: 0;
    a {
      display: inline-block;
      padding: 4px;
      font-size: 15px;
      color: #555555;
      transition: color 0.3s ease;
      text-decoration: none;
    }
    &:hover {
      cursor: pointer;
      a {
        color: #aa5d5d;
        font-weight: bold;
      }
    }
  }
  ${sm({
  padding: ' 0 0 1rem 0',
})}
`

//🔺HeaderItem(右)-user
const UserPages = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap:1rem;
`
const UserPagesRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
// 用戶名稱dropdown
const UsernameWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`
const UserName = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 0 0 0 4px;
  white-space: nowrap;
  ${sm({
  fontSize: '16px',
  padding: '0 0 0 8px',
})};
`
const UserDropdown = styled.div`
  position: absolute;
  z-index: 500;
  background-color: #ffffff;
  top: 2.5rem;
  padding: 0.75rem;
  white-space: nowrap;
  text-align: center;
  box-shadow: -2px 2px 70px -25px rgba(0, 0, 0, 0.3);
  transition: all 0.5s ease;
  opacity: ${p => (p.$display ? '1' : '0')};
  visibility: ${p => (p.$display ? 'visible' : 'hidden')};

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  li {
    line-height: 1;
    margin: 0;
    a {
      display: inline-block;
      padding: 4px;
      font-size: 15px;
      color: #555555;
      transition: color 0.3s ease;
      text-decoration: none;
    }
    &:hover {
      cursor: pointer;
      a {
        color: #aa5d5d;
        font-weight: bold;
      }
    }
  }
  ${sm({
  position: 'relative',
  width: '100%',
  top: '0px',
  flexDirection: p => (p.$flexDirection ? p.$flexDirection : 'column'),
  transform: 'translateX(0%)',
  visibility: p => (p.$display ? 'visible' : 'hidden'),
  boxShadow: 'none',
  opacity: p => (p.$display ? '1' : '0'),
  textAlign: 'center',
  transition: 'none',
  marginTop: 0,
  display: p => (p.$display ? 'flex' : 'none'),
  flexWrap: 'wrap',
  padding: '0.5rem 0',
})}

  /* 用偽元素製作三角形 */
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 20px solid #fff;
    top: -10px;
    right: 50%;
    ${sm({
  display: 'none',
})}
  }
`
// 購物車和Badge
const CartIconWrapper = styled.div`
  position: relative;
  margin-right: 4px;
`
const Badge = styled.div`
  position: absolute;
  top: -4px;
  right: -3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #d31414;
  width: 12px;
  height: 12px;
  span {
    font-size: 10px;
    color: white;
  }
`

export const Navbar = () => {
  const navigate = useNavigate()
  const { CSSVariables } = useConfigs()
  const announcement = CSSVariables.announcement
  const dispatch = useDispatch()
  const user = useSelector(state => state.authUser.data)
  const cart = useSelector(state => state.cart.data)
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  //TOKEN
  const TOKEN = user?.accessToken

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await customAxios.get(
          `${import.meta.env.VITE_APIURL}/news/all?limit=4`,
        )
        const data = response.data.data.map((item, idx) => ({
          title: item.title,
          image: `${import.meta.env.VITE_APIURL}/file${item.coverImage}`,
          linkUrl: `/news/${item.title}`,
          key: idx,
        }))
        setNews(data)
      } catch (error) {
        console.error(error)
        setError('無法獲取最新消息。')
      }
      setLoading(false)
    }
    fetchNews()
  }, [])

  useEffect(() => {
    if ((!cart || !(cart?.username === user?.username)) && user?.accessToken) {
      dispatch(cartRequests.get(TOKEN, user?.username))
    }
  }, [TOKEN, user?.username])

  const handleLogout = async e => {
    e.preventDefault()
    dispatch(AuthUserRequests.logout(user.refreshToken))
    store.dispatch({ type: 'RESET' }) //清除持久persist
    localStorage.removeItem('btnClicked')
    setShowDropdown({
      news: false,
      products: false,
      about: false,
      user: false,
    })
    navigate('/')
  }

  const closeSidebarMenu = () => {
    setIsMobileMenuOpen(false)
    setShowDropdown({
      news: false,
      products: false,
      about: false,
      user: false,
    })
  }

  const [showDropdown, setShowDropdown] = useState({
    news: false,
    products: false,
    about: false,
    user: false,
  })
  const [showProductsDropdown, setShowProductsDropdown] = useState({
    '新品上市': false,
    '上衣': false,
    '外套': false,
    '褲子': false,
    '裙子': false,
    '連身套裝': false,
    '包包': false,
    '配件': false,
  })
  return (
    <>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      <Announcement />
      <HeaderWrapper $open={isMobileMenuOpen}>
        <HeaderBg $offset={announcement.actived ? announcement.height : 0}>
          <Container>
            <Header>
              {/*🔺LOGO */}
              <HeaderItem $position={'left'}>
                <Logo>
                  <Link to='/'>{shopInfo.shopName}</Link>
                </Logo>
              </HeaderItem>

              {/*🔺Menu */}
              <HeaderItem $position={'center'}>
                <MenuWrapper
                  $offset={announcement.actived ? announcement.height : 0}
                  $open={isMobileMenuOpen}
                >
                  {/* 行動版的選單上方的關閉列 */}
                  <MobileMenuHeader>
                    <CloseBtn
                      onClick={() => {
                        closeSidebarMenu()
                      }}
                    >
                      <CloseRounded />
                    </CloseBtn>
                  </MobileMenuHeader>

                  {/* 選單結構 */}
                  <MainMenu>
                    {/* 行動版的User區塊 */}
                    <MobileMenuWrapper>
                      {user && user.accessToken ? (
                        <>
                          <UserPages>
                            {/* 行動版用戶名稱 */}
                            <UsernameWrapper
                              onClick={() => {
                                setShowDropdown(prev => {
                                  return { user: !prev.user }
                                })
                              }}
                            >
                              <IconButton icon={People} />
                              <UserName>
                                {`${user.lastName} ${user.firstName} `}
                              </UserName>
                              <IconButton
                                icon={ArrowDown}
                                $size='1rem'
                                $hoverColor={'#aa5d5d'}
                              />
                            </UsernameWrapper>

                            <UserPagesRight>
                              {/* 行動版收藏 */}
                              <IconButton
                                icon={Heart}
                                onClick={() => {
                                  navigate('/likedProducts')
                                  closeSidebarMenu()
                                }}
                                $strokeColor={'#333'}
                                $fillColor={'#fff'}
                              />
                              {/* 行動版購物車 */}
                              <CartIconWrapper
                                onClick={() => {
                                  navigate('/cart')
                                }}
                              >
                                <IconButton icon={Cart1} />
                                <Badge>
                                  <span>
                                    {cart?.username === user?.username
                                      ? cart.quantity
                                      : ''}
                                  </span>
                                </Badge>
                              </CartIconWrapper>
                            </UserPagesRight>
                          </UserPages>
                          {/* 行動版user dropdown */}
                          <UserDropdown $display={showDropdown.user}>
                            <ul>
                              <li>
                                <Link
                                  to='/orders'
                                  onClick={() => {
                                    closeSidebarMenu()
                                  }}
                                >
                                  訂單紀錄
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to='/account'
                                  onClick={() => {
                                    closeSidebarMenu()
                                  }}
                                >
                                  修改會員資料
                                </Link>
                              </li>
                              <li>
                                <Link onClick={handleLogout}>登出</Link>
                              </li>
                            </ul>
                          </UserDropdown>
                        </>
                      ) : (
                        <SignupAndLogin>
                          <button
                            type='button'
                            onClick={() => {
                              navigate('/register')
                              closeSidebarMenu()
                            }}
                          >
                            註冊
                          </button>
                          <button
                            type='button'
                            onClick={() => {
                              navigate('/login')
                              closeSidebarMenu()
                            }}
                          >
                            登入
                          </button>
                        </SignupAndLogin>
                      )}
                    </MobileMenuWrapper>
                    {/* 首頁 */}
                    <MainMenuItem>
                      <MainMenuItemTitle
                        to='/'
                        onClick={() => {
                          closeSidebarMenu()
                        }}
                      >
                        首頁
                      </MainMenuItemTitle>
                    </MainMenuItem>
                    {/* 最新消息 */}
                    <MainMenuItem $open={showDropdown.news}>
                      <MainMenuItemWrapper>
                        <MainMenuItemTitle
                          to='/news'
                          onClick={() => {
                            closeSidebarMenu()
                          }}
                        >
                          最新消息
                        </MainMenuItemTitle>
                        <IconButton
                          icon={ArrowDown}
                          $size='1rem'
                          onClick={() => {
                            setShowDropdown(prev => {
                              return { news: !prev.news }
                            })
                          }}
                        />
                      </MainMenuItemWrapper>

                      <NewsWrapper $display={showDropdown.news}>
                        {news.map((item, idx) => {
                          return (
                            <SubMenuLgItem key={idx}>
                              <NewsImageWrapper
                                to={item.linkUrl}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                <img src={item.image} alt={item.title} />
                              </NewsImageWrapper>
                              <Link
                                to={item.linkUrl}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                <p>{item.title}</p>
                              </Link>
                            </SubMenuLgItem>
                          )
                        })}
                      </NewsWrapper>
                    </MainMenuItem>
                    {/* 商品列表 */}
                    <MainMenuItem $open={showDropdown.products}>
                      <MainMenuItemWrapper>
                        <MainMenuItemTitle
                          to='/products'
                          onClick={() => {
                            closeSidebarMenu()
                          }}
                        >
                          商品列表
                        </MainMenuItemTitle>
                        <IconButton
                          icon={ArrowDown}
                          $size='1rem'
                          onClick={() => {
                            setShowDropdown(prev => ({
                              products: !prev.products,
                            }))
                          }}
                        />
                      </MainMenuItemWrapper>
                      <SubMenuLg $display={showDropdown.products}>
                        <SubMenuLgItem>
                          <SubMenuTitleWrapper
                            $display={showProductsDropdown['新品上市']}
                          >
                            <h4>新品上市</h4>
                            <IconButton
                              icon={ArrowDown}
                              $size='1rem'
                              onClick={() => {
                                setShowProductsDropdown(prev => ({
                                  '新品上市': !prev['新品上市'],
                                }))
                              }}
                            />
                          </SubMenuTitleWrapper>
                          <ThirdMenu
                            $display={showProductsDropdown['新品上市']}
                          >
                            <li>
                              <Link
                                to={`/products?release=202406`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                202406 預購
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?release=20240523`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                20240523
                              </Link>
                            </li>
                          </ThirdMenu>
                          <br />

                          <SubMenuTitleWrapper
                            onClick={() => {
                              navigate('/products?category=熱銷推薦')
                              closeSidebarMenu()
                            }}
                          >
                            <h4>熱銷推薦</h4>
                          </SubMenuTitleWrapper>
                        </SubMenuLgItem>

                        <SubMenuLgItem>
                          <SubMenuTitleWrapper
                            $display={showProductsDropdown['上衣']}
                          >
                            <h4>上衣</h4>
                            <IconButton
                              icon={ArrowDown}
                              $size='1rem'
                              onClick={() => {
                                setShowProductsDropdown(prev => ({
                                  '上衣': !prev['上衣'],
                                }))
                              }}
                            />
                          </SubMenuTitleWrapper>
                          <ThirdMenu $display={showProductsDropdown['上衣']}>
                            <li>
                              <Link
                                to={`/products?category=上衣&subCategory=無袖`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                無袖{' '}
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?category=上衣&subCategory=長袖`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                長袖
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?category=上衣&subCategory=短袖`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                短袖
                              </Link>
                            </li>
                          </ThirdMenu>

                          <SubMenuTitleWrapper
                            $display={showProductsDropdown['外套']}
                          >
                            <h4>外套</h4>
                            <IconButton
                              icon={ArrowDown}
                              $size='1rem'
                              onClick={() => {
                                setShowProductsDropdown(prev => ({
                                  '外套': !prev['外套'],
                                }))
                              }}
                            />
                          </SubMenuTitleWrapper>
                          <ThirdMenu $display={showProductsDropdown['外套']}>
                            <li>
                              <Link
                                to={`/products?category=外套&subCategory=皮衣`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                皮衣{' '}
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?category=外套&subCategory=西裝外套`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                西裝外套
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?category=外套&subCategory=連帽外套`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                連帽外套
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?category=外套&subCategory=針織外套`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                針織外套
                              </Link>
                            </li>
                          </ThirdMenu>
                        </SubMenuLgItem>

                        <SubMenuLgItem>
                          <SubMenuTitleWrapper
                            $display={showProductsDropdown['褲子']}
                          >
                            <h4>褲子</h4>
                            <IconButton
                              icon={ArrowDown}
                              $size='1rem'
                              onClick={() => {
                                setShowProductsDropdown(prev => ({
                                  '褲子': !prev['褲子'],
                                }))
                              }}
                            />
                          </SubMenuTitleWrapper>
                          <ThirdMenu $display={showProductsDropdown['褲子']}>
                            <li>
                              <Link
                                to={`/products?category=褲子&subCategory=長褲`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                長褲{' '}
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?category=褲子&subCategory=短褲`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                短褲
                              </Link>
                            </li>
                          </ThirdMenu>
                          <SubMenuTitleWrapper
                            $display={showProductsDropdown['裙子']}
                          >
                            <h4>裙子</h4>
                            <IconButton
                              icon={ArrowDown}
                              $size='1rem'
                              onClick={() => {
                                setShowProductsDropdown(prev => ({
                                  '裙子': !prev['裙子'],
                                }))
                              }}
                            />
                          </SubMenuTitleWrapper>
                          <ThirdMenu $display={showProductsDropdown['裙子']}>
                            <li>
                              <Link
                                to={`/products?category=裙子&subCategory=長裙`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                長裙{' '}
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?category=裙子&subCategory=短裙`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                短裙
                              </Link>
                            </li>
                          </ThirdMenu>
                        </SubMenuLgItem>
                        <SubMenuLgItem>
                          <SubMenuTitleWrapper
                            $display={showProductsDropdown['連身套裝']}
                          >
                            <h4>連身套裝</h4>
                            <IconButton
                              icon={ArrowDown}
                              $size='1rem'
                              onClick={() => {
                                setShowProductsDropdown(prev => ({
                                  '連身套裝': !prev['連身套裝'],
                                }))
                              }}
                            />
                          </SubMenuTitleWrapper>
                          <ThirdMenu
                            $display={showProductsDropdown['連身套裝']}
                          >
                            <li>
                              <Link
                                to={`/products?category=連身套裝&subCategory=連衣裙`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                連衣裙{' '}
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?category=連身套裝&subCategory=成套組合`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                成套組合
                              </Link>
                            </li>
                          </ThirdMenu>
                        </SubMenuLgItem>
                        <SubMenuLgItem>
                          <SubMenuTitleWrapper
                            $display={showProductsDropdown['包包']}
                          >
                            <h4>包包</h4>
                            <IconButton
                              icon={ArrowDown}
                              $size='1rem'
                              onClick={() => {
                                setShowProductsDropdown(prev => ({
                                  '包包': !prev['包包'],
                                }))
                              }}
                            />
                          </SubMenuTitleWrapper>
                          <ThirdMenu $display={showProductsDropdown['包包']}>
                            <li>
                              <Link
                                to={`/products?category=包包&subCategory=肩背包`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                肩背包{' '}
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?category=包包&subCategory=後背包`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                後背包
                              </Link>
                            </li>
                          </ThirdMenu>
                          <SubMenuTitleWrapper
                            $display={showProductsDropdown['配件']}
                          >
                            <h4>配件</h4>
                            <IconButton
                              icon={ArrowDown}
                              $size='1rem'
                              onClick={() => {
                                setShowProductsDropdown(prev => ({
                                  '配件': !prev['配件'],
                                }))
                              }}
                            />
                          </SubMenuTitleWrapper>
                          <ThirdMenu $display={showProductsDropdown['配件']}>
                            <li>
                              <Link
                                to={`/products?category=配件&subCategory=襪子`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                襪子{' '}
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/products?category=配件&subCategory=披肩圍巾`}
                                onClick={() => {
                                  closeSidebarMenu()
                                }}
                              >
                                披肩圍巾
                              </Link>
                            </li>
                          </ThirdMenu>
                        </SubMenuLgItem>
                      </SubMenuLg>
                    </MainMenuItem>
                    {/* 關於 */}
                    <MainMenuItem $open={showDropdown.about}>
                      <MainMenuItemWrapper>
                        <MainMenuItemTitle
                          to='/about'
                          onClick={() => {
                            closeSidebarMenu()
                          }}
                        >
                          關於
                        </MainMenuItemTitle>
                        <IconButton
                          icon={ArrowDown}
                          $size='1rem'
                          onClick={() => {
                            setShowDropdown(prev => {
                              return { about: !prev.about }
                            })
                          }}
                        />
                      </MainMenuItemWrapper>
                      <AboutMenu $display={showDropdown.about}>
                        <ul>
                          <li>
                            <Link
                              to='/about?type=brand'
                              onClick={() => {
                                closeSidebarMenu()
                              }}
                            >
                              品牌介紹
                            </Link>
                          </li>
                          <li>
                            <Link
                              to='/about?type=qa'
                              onClick={() => {
                                closeSidebarMenu()
                              }}
                            >
                              購物說明
                            </Link>
                          </li>
                          <li>
                            <Link
                              to='/about?type=afterSales'
                              onClick={() => {
                                closeSidebarMenu()
                              }}
                            >
                              退換貨政策
                            </Link>
                          </li>
                        </ul>
                      </AboutMenu>
                    </MainMenuItem>
                  </MainMenu>
                </MenuWrapper>
              </HeaderItem>

              {/*🔺user */}
              <HeaderItem $position={'right'}>
                <UserPages>
                  {user && user.accessToken ? (
                    <>
                      <UsernameWrapper
                        onClick={() => {
                          setShowDropdown(prev => {
                            return { user: !prev.user }
                          })
                        }}
                      >
                        <IconButton icon={People} />
                        <UserName>
                          {`${user.lastName} ${user.firstName} `}
                        </UserName>
                        <IconButton
                          icon={ArrowDown}
                          $size='1rem'
                          $hoverColor={'#aa5d5d'}
                        />

                      </UsernameWrapper>
                      <UserDropdown $display={showDropdown.user}>
                        <ul>
                          <li
                            onClick={() => {
                              closeSidebarMenu()
                            }}>
                            <Link
                              to='/orders'
                            >
                              訂單紀錄
                            </Link>
                          </li>
                          <li onClick={() => {
                            closeSidebarMenu()
                          }}>
                            <Link to='/account'  >
                              修改會員資料
                            </Link>
                          </li>
                          <li>
                            <Link onClick={handleLogout}>登出</Link>
                          </li>
                        </ul>
                      </UserDropdown>

                      <UserPagesRight>
                        <IconButton
                          icon={Heart}
                          onClick={() => {
                            navigate('/likedProducts')
                          }}
                          $strokeColor={'#333'}
                          $fillColor={'#fff'}
                        />
                        <CartIconWrapper
                          onClick={() => {
                            navigate('/cart')
                          }}
                        >
                          <IconButton icon={Cart1} />
                          <Badge>
                            <span>
                              {cart?.username === user?.username
                                ? cart.quantity
                                : ''}
                            </span>
                          </Badge>
                        </CartIconWrapper>
                      </UserPagesRight>
                    </>
                  ) : (
                    <SignupAndLogin>
                      <button
                        type='button'
                        onClick={() => {
                          navigate('/register')
                          closeSidebarMenu()
                        }}
                      >
                        註冊
                      </button>
                      <button
                        type='button'
                        onClick={() => {
                          navigate('/login')
                          closeSidebarMenu()
                        }}
                      >
                        登入
                      </button>
                    </SignupAndLogin>
                  )}
                </UserPages>
              </HeaderItem>

              {/* mobile menu trigger */}
              <MobileMenuTrigger
                onClick={() => {
                  setIsMobileMenuOpen(true)
                }}
              >
                <MobileMenuLine />
              </MobileMenuTrigger>
            </Header>
          </Container>
        </HeaderBg>
      </HeaderWrapper>
    </>
  )
}
