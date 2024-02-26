import styled from 'styled-components'
import { tablet } from '@/responsive'
import { useNavigate } from 'react-router-dom'

/* 版型 */
const Container = styled.div`
  position: fixed;
  z-index: 99;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 5px 30px rgba(204, 204, 204, 0.25);
`
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${tablet({ padding: '10px 0px' })};
`
/* 版型 */
/* 左方 */
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 20px;
`

/* 中:Logo */
const Center = styled.div`
  flex: 1;
  white-space: nowrap;
  user-select: none;
`
const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${tablet({ fontSize: '24px' })};
  cursor: pointer;
`
/* 右邊 */
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  padding-right: 20px;
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  ${tablet({ fontSize: '12px' })};
`
export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <Container >
      <Wrapper>
        <Left>
          <MenuItem
            onClick={() => {
              navigate('/#0')
            }}
          >
            Item0
          </MenuItem>
        </Left>
        <Center>
          <Logo
            onClick={() => {
              navigate('/')
            }}
          >
            網站名稱
          </Logo>
        </Center>
        <Right>
          <MenuItem
            onClick={() => {
              navigate('/#1')
            }}
          >
            Item1
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/#2')
            }}
          >
            Item2
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  )
}
