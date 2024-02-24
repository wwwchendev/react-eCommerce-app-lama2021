import { PageLayout } from '@/components'
import styled from 'styled-components'
import { mobile } from '@/responsive'

const Container = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url('https://images.unsplash.com/photo-1632613714614-e817d3814a8e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`
const Input = styled.input`
  flex: 1;
  min-width: ${p => (p.$width ? p.$width : 40)}%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`
const Agreement = styled.div`
  width: 100%;
  font-size: 12px;
  margin: 20px 0px;
`
const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 5px;
`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 0 auto;
`

const Register = () => {
  return (
    <PageLayout>
      <Container>
        <Wrapper>
          <Title>註 冊</Title>
          <Form>
            <Input placeholder='名字' />
            <Input placeholder='姓氏' />
            <Input placeholder='email' $width={80} />
            <Input placeholder='密碼' />
            <Input placeholder='確認密碼' />
            <Agreement>
              <CheckBox />
              我同意根據 <b>隱私權政策</b> 處理個人資料
            </Agreement>
            <Button>CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
    </PageLayout>
  )
}

export default Register
