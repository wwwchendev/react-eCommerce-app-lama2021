import { Send } from '@material-ui/icons'
import styled from 'styled-components'
import { mobile } from '@/utils/responsive'

const Container = styled.div`
  height: 50vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: 'center' })}
`

const InputContainer = styled.div`
  width: 40%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: '80%' })}
`

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Newsletter = () => {
  return (
    <Container>
      <Title>訂閱電子報</Title>
      <Desc>即時取得會員權益通知、最新優惠訊息</Desc>
      <InputContainer>
        <Input placeholder='輸入電子信箱' />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  )
}
