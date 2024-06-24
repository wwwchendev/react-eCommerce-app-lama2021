import styled from 'styled-components'
import { Button, StyledLink } from '@/components/common'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthUserRequests, reset } from '@/store/authUser'
import { useState, useEffect } from 'react'
import cryptoJS from '@/utils/cryptoJS.js'
import * as Layout from '@/components/layout'
const { SEO } = Layout
import { Container as MuiContainer, Grid } from '@material-ui/core'
import { xs, sm, md } from '@/components/layout/responsive'

const Wrapper = styled.div`
  background:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url('./images/auth/satin-bg.png') center;
  background-size: cover;
  text-align: center;
  ${StyledLink} {
    margin: 0 auto;
    color: #a19797;
  }
`

const Container = styled(MuiContainer)`
  height: 100%;
  padding: 10.5rem;
  ${md({ padding: '5rem' })};
  ${xs({ padding: '2rem' })};
`
const Row = styled.div`
  display: flex;
  gap: 1rem;
  ${xs({ flexDirection: 'column' })};
`
const Col = styled.div`
  gap: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  label {
    min-width: 4rem;
    text-align: justify;
  }
`
const FormWrapper = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  height: 360px;
  position: relative;
  a {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`

const TabsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #866565;
`

const TabButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #fff;
  color: ${p => (p.$active ? '#866565' : '#ddd')};
  border: 1px solid;
  border-top: 4px solid;
  font-size: 14px;
  cursor: pointer;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`

const SubmitButton = styled(Button)`
  background-color: transparent;
  color: #866565;
  border: 1px solid #866565;
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  &:hover {
    font-weight: bold;
    border: 2px solid #866565;
  }
  &:disabled {
    border: none;
    background-color: #aaaaaa;
    cursor: not-allowed;
  }
`

const PromptMessage = styled.div`
  font-size: 14px;
  color: #ce4646;
  text-align: left;

  position: absolute;
  bottom: -1.2rem;
  left: 0;
`

const Form = styled.form`
  margin-top: 1rem;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`

// 修改 Input 的样式
const Input = styled.input`
  flex: 1;
  padding: 8px;
  width: 100%;
  border: ${p => (p.$border ? '2px solid #ce4646' : '1px solid #999')};
  border-radius: 5px;
`

// 修改 FormFooter 的样式
const FormFooter = styled.div`
  position: relative;
  margin-top: 0.2rem;
  ${PromptMessage} {
    position: absolute;
    bottom: -3rem;
    left: 0;
  }
`

export const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const authUserState = useSelector(state => state.authUser)

  const [formInput, setformInput] = useState({
    username: '',
    password: '',
  })

  const initialPromptMessage = {
    username: '',
    password: '',
  }

  const [promptMessage, setPromptMessage] = useState(initialPromptMessage)

  const [loginClicked, setLoginClicked] = useState(false)
  useEffect(() => {
    const storedLoginState = JSON.parse(
      localStorage.getItem('btnClicked'),
    )?.loginRequest
    if (storedLoginState) {
      setLoginClicked(storedLoginState)
      localStorage.setItem(
        'btnClicked',
        JSON.stringify({ loginRequest: false }),
      )
    }
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setPromptMessage(initialPromptMessage)
    if (authUserState.error !== null) {
      dispatch(reset())
    }
    setformInput(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleLogin = async e => {
    e.preventDefault()
    const { username, password } = formInput
    if (username && password) {
      setLoginClicked(true)
      localStorage.setItem('btnClicked', JSON.stringify({ loginRequest: true }))

      await dispatch(
        AuthUserRequests.login({
          username: formInput.username,
          passwordHash: cryptoJS.encrypt(formInput.password),
        }),
      )
    } else {
      const requireField = ['username', 'password']
      requireField.forEach(f => {
        let emptyField
        switch (f) {
          case 'username':
            emptyField = '用戶名稱'
            break
          case 'password':
            emptyField = '密碼'
            break
          default:
            return
        }

        if (formInput[f] === '') {
          setPromptMessage(prev => {
            return {
              ...prev,
              [f]: `${emptyField}不得為空`,
            }
          })
        }
      })
    }
  }

  return (
    <Layout.PageLayout>
      <SEO title='會員登入 | RESTART-SHOP' description={null} url={null} />
      <Wrapper>
        <Container maxWidth='lg'>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            style={{ height: '100%' }}
          >
            <Grid item xs={12} sm={10} md={7} lg={5}>
              <FormWrapper>
                <TabsWrapper>
                  <TabButton
                    $active={location.pathname === '/register'}
                    onClick={() => {
                      navigate('/register')
                    }}
                  >
                    加入會員
                  </TabButton>
                  <TabButton
                    $active={location.pathname === '/login'}
                    onClick={() => {
                      navigate('/login')
                    }}
                  >
                    會員登入
                  </TabButton>
                </TabsWrapper>
                {authUserState.loading && (
                  <Layout.Loading
                    type={'spin'}
                    active={authUserState.loading}
                    color={'#c9a388'}
                    size={'160px'}
                  />
                )}

                <Form>
                  <Row>
                    <Col>
                      <label htmlFor='用戶名稱'>用戶名</label>
                      <InputWrapper>
                        <Input
                          type='text'
                          name='username'
                          placeholder='用戶名稱'
                          onChange={handleChange}
                          id='用戶名稱'
                          $border={promptMessage.username}
                          autoComplete='username'
                        />
                        <PromptMessage>{promptMessage.username}</PromptMessage>
                      </InputWrapper>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label htmlFor='密碼'>密碼</label>
                      <InputWrapper>
                        <Input
                          type='password'
                          name='password'
                          placeholder='密碼'
                          onChange={handleChange}
                          id='密碼'
                          $border={promptMessage.password}
                          autoComplete='current-password'
                        />
                        <PromptMessage>{promptMessage.password}</PromptMessage>
                      </InputWrapper>
                    </Col>
                  </Row>

                  <FormFooter>
                    {loginClicked && (
                      <PromptMessage>
                        {authUserState?.error?.login}
                      </PromptMessage>
                    )}
                    <SubmitButton
                      type='button'
                      disabled={authUserState.loading}
                      onClick={handleLogin}
                    >
                      登入
                    </SubmitButton>
                  </FormFooter>
                </Form>
                <StyledLink to='/forgetPassword'>忘記密碼</StyledLink>
              </FormWrapper>
            </Grid>
          </Grid>
        </Container>
      </Wrapper>
    </Layout.PageLayout>
  )
}
