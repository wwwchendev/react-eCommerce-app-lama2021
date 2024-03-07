import { PageLayout } from '@/components'
import styled from 'styled-components'
import { mobile } from '@/utils/responsive'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginRequest, clearError } from '@/store/user'
import { useSelector } from 'react-redux'

const Container = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url('https://images.unsplash.com/photo-1572705824045-3dd0c9a47945?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 32.5%;
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
  flex-direction: column;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px auto;
  &:disabled {
    background-color: #aaaaaa;
    cursor: not-allowed;
  }
`

const Link = styled.a`
  margin: 5px 0px;
  text-decoration: underline;
  cursor: pointer;
  font-size: 12px;
`

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  & > a {
    margin-left: 5px;
  }
`
const Error = styled.span`
  color: red;
`
export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formInput, setformInput] = useState({
    username: '',
    password: '',
  })
  const userState = useSelector(state => state.user)

  const handleChange = e => {
    const { name, value } = e.target
    setformInput(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleLogin = e => {
    e.preventDefault()
    dispatch(loginRequest(formInput))
    if (userState.error !== null) {
      dispatch(clearError())
    }
  }

  return (
    <PageLayout>
      <Container>
        <Wrapper>
          <Title>登 入</Title>
          <Form onSubmit={handleLogin}>
            <Input
              name='username'
              defaultValue={formInput.username}
              onChange={handleChange}
              placeholder='輸入用戶名稱'
            />
            <Input
              name='password'
              defaultValue={formInput.password}
              onChange={handleChange}
              placeholder='請輸入密碼'
            />
            <Button type='submit' disabled={userState.loading}>
              LOGIN
            </Button>

            {userState.error !== null && <Error>{userState.error.error}</Error>}
            <Link>忘記密碼</Link>
            <FormGroup>
              <span>還不是會員嗎?</span>
              <Link
                onClick={() => {
                  navigate('/register')
                }}
              >
                註冊帳號
              </Link>
            </FormGroup>
          </Form>
        </Wrapper>
      </Container>
    </PageLayout>
  )
}
