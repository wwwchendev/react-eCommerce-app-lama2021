import styled from 'styled-components'
import { Search } from '@material-ui/icons' //https://mui.com/material-ui/material-icons/
import { Badge } from '@material-ui/core'
import { ShoppingCartOutlined } from '@material-ui/icons'
import { tablet } from '@/responsive'

/* 版型 */
const Container = styled.div`
  height: 60px;
  position: fixed;
  z-index: 99;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 5px 20px rgba(204, 204, 204, 0.1); 
  margin-top: 30px;
  ${tablet({ height: '50px' })};
`
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${tablet({ padding: '10px 0px' })};
`
/* 版型 */
/* 左:語系搜尋框 */
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${tablet({ display: 'none' })}
`
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`
const Input = styled.input`
  border: none;
  ${tablet({ width: '70px' })}
`
/* 中:Logo */
const Center = styled.div`
  flex: 1;
`
const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${tablet({ fontSize: '24px' })};
`
/* 右:註冊登入購物車 */
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${tablet({ justifyContent: 'center' })}
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  white-space: nowrap;
  ${tablet({ fontSize: '12px', marginLeft: '10px' })};
`
export const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>TW</Language>
          <SearchContainer>
            <Input placeholder='搜尋商品..' />
            <Search style={{ color: 'gray', fontSize: '16px' }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>LAMA.</Logo>
        </Center>
        <Right>
          <MenuItem>註冊</MenuItem>
          <MenuItem>登入</MenuItem>
          <MenuItem>
            <Badge overlap='rectangular' badgeContent={4} color='secondary'>
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  )
}
