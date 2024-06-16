import * as Layout from '@/components/layout'
const { SEO, Loading } = Layout
import styled from 'styled-components'
import { xs, sm, md } from '@/components/layout/responsive'
import { Button, StyledLink, Alert, Confirm } from '@/components/common'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { AuthUserRequests, reset } from '@/store/authUser'
import cryptoJS from '@/utils/cryptoJS.js'
import { Container as MuiContainer, Grid } from '@material-ui/core'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url('./images/auth/satin-bg.png') center;
  background-size: cover;
`

const Container = styled(MuiContainer)`
  height: 100%;
  padding: 3rem;
`

const FormWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  height: 640px;
  ${xs({ height: '840px', padding: '1rem' })};
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

const Form = styled.form`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  flex: 1;
  padding: 8px;
  width: 100%;
  border: ${p => (p.$border ? '2px solid #ce4646' : '1px solid #999')};
  border-radius: 5px;
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
  margin: 0rem;
  width: 100%;
  font-size: 1rem;
  &:hover {
    font-weight: bold;
    border: 2px solid #866565;
  }
  &:disabled {
    background-color: #aaaaaa;
    cursor: not-allowed;
  }
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
const FormRadioWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 3rem;
  padding: 8px;
  border: ${p => (p.$border ? '2px solid #ce4646' : '')};
  border-radius: 5px;
  ${xs({ gap: '4rem' })};
`
const FormRadio = styled.div`
div{
  display: flex;
  align-items: center;
  position: relative;
}
  
  label {
    position: absolute;
    cursor: pointer;
    font-size: 15px;
    left: 1.5rem;
  }
`
const Agreement = styled.div`
  display: flex;
  width: auto;
  margin: 0.5rem 0 0 0;
  color: #857878;
  letter-spacing: 2px;
  font-size: 14px;
  ${StyledLink} {
    color: #857878;
  }
`
const PromptMessage = styled.div`
  min-height: 0.8rem;
  font-size: 13px;
  color: #ce4646;
  position: absolute;
  bottom: -1.1rem;
  left: 0;
  white-space: nowrap;
`

const FormFooter = styled.div`
  position: relative;
  ${PromptMessage} {
    position: absolute;
    bottom: -1.4rem;
    left: 0;
  }
`

export const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()
  //redux
  const dispatch = useDispatch()
  const authUserState = useSelector(state => state.authUser)

  //表單
  const initialFormData = {
    username: '',
    lastName: '',
    firstName: '',
    gender: '',
    birthdate: '',
    mobile: '',
    phone: '',
    email: '',
    address: {
      zipcode: '',
      county: '',
      district: '',
      address: '',
    },
    password: '',
    checkedPassword: '',
  }
  const [formInput, setformInput] = useState(initialFormData)
  const initialPromptMessage = {
    username: '',
    lastName: '',
    firstName: '',
    gender: '',
    birthdate: '',
    sm: '',
    phone: '',
    email: '',
    address: {
      zipcode: '',
      county: '',
      district: '',
      address: '',
    },
    password: '',
    checkedPassword: '',
  }
  const [promptMessage, setPromptMessage] = useState(initialPromptMessage)
  const [registerClicked, setRegisterClicked] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const storedRegisterState = JSON.parse(
      localStorage.getItem('btnClicked'),
    )?.registerRequest

    if (storedRegisterState) {
      setRegisterClicked(storedRegisterState)
      if (authUserState.error === null) {
        setShowConfirm(true)
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
      localStorage.setItem(
        'btnClicked',
        JSON.stringify({ registerRequest: false }),
      )
    }
  }, [authUserState.data])

  const handleChange = e => {
    const { name, value } = e.target
    setPromptMessage(initialPromptMessage)
    if (authUserState.error !== null) {
      dispatch(reset())
    }
    if (
      name === 'zipcode' ||
      name === 'county' ||
      name === 'district' ||
      name === 'address'
    ) {
      setformInput(prevState => ({
        ...prevState,
        'address': {
          ...prevState.address,
          [name]: value,
        },
      }))
    } else {
      setformInput(prevState => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleRegister = async e => {
    e.preventDefault()
    const {
      username,
      lastName,
      firstName,
      gender,
      birthdate,
      mobile,
      phone,
      email,
      address,
      password,
      checkedPassword,
    } = formInput

    if (
      username &&
      lastName &&
      firstName &&
      gender &&
      birthdate &&
      mobile &&
      email &&
      address.zipcode &&
      address.county &&
      address.district &&
      address.address &&
      password &&
      checkedPassword
    ) {
      if (password !== checkedPassword) {
        setPromptMessage(prev => {
          return {
            ...prev,
            checkedPassword: `兩次輸入密碼不一致`,
          }
        })
      } else {
        setRegisterClicked(true)
        localStorage.setItem(
          'btnClicked',
          JSON.stringify({ registerRequest: true }),
        )

        await dispatch(
          AuthUserRequests.register({
            username: username,
            passwordHash: cryptoJS.encrypt(formInput.password),
            lastName,
            firstName,
            gender,
            birthdate,
            email,
            phone,
            mobile,
            address,
          }),
        )
      }
    } else {
      const requireAdressField = ['zipcode', 'county', 'district', 'address']
      requireAdressField.forEach((f, idx) => {
        let emptyField
        switch (f) {
          case 'zipcode':
            emptyField = '郵遞區號'
            break
          case 'county':
            emptyField = '縣市'
            break
          case 'district':
            emptyField = '鄉鎮市區'
            break
          case 'address':
            emptyField = '詳細地址'
            break
          default:
            return
        }
        if (formInput['address'][f] === '') {
          setPromptMessage(prev => {
            return {
              ...prev,
              address: {
                ...prev.address,
                [f]: `${emptyField}不得為空`,
              },
            }
          })
        }
      })

      const requireField = [
        'username',
        'lastName',
        'firstName',
        'gender',
        'birthdate',
        'mobile',
        'email',
        'password',
        'checkedPassword',
      ]
      requireField.forEach((f, idx) => {
        let emptyField
        switch (f) {
          case 'username':
            emptyField = '用戶名稱'
            break
          case 'lastName':
            emptyField = '姓氏'
            break
          case 'firstName':
            emptyField = '姓名'
            break
          case 'gender':
            emptyField = '性別'
            break
          case 'birthdate':
            emptyField = '生日'
            break
          case 'mobile':
            emptyField = '行動電話'
            break
          case 'email':
            emptyField = '信箱'
            break
          case 'password':
            emptyField = '密碼'
            break
          case 'checkedPassword':
            emptyField = '確認密碼'
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
      <SEO title='加入會員 | RESTART-SHOP' description={null} url={null} />
      <Wrapper>
        {showConfirm && (
          <Confirm
            title='註冊成功'
            iconType={'celebrate'}
            onClose={() => setShowConfirm(false)}
            hiddenCancelButton={true}
            onConfirm={() => {
              navigate('/login')
            }}
          >
            請進行登入 (3秒後自動轉址)
          </Confirm>
        )}
        <Container>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            style={{ height: '100%' }}
          >
            <Grid item xs={12} sm={10} md={7} lg={6}>
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
                        />

                        <PromptMessage>{promptMessage.username}</PromptMessage>
                      </InputWrapper>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <label htmlFor='姓氏'>姓氏</label>
                      <InputWrapper>
                        <Input
                          type='text'
                          name='lastName'
                          placeholder='姓氏'
                          onChange={handleChange}
                          id='姓氏'
                          $border={promptMessage.lastName}
                        />
                        <PromptMessage>{promptMessage.lastName}</PromptMessage>
                      </InputWrapper>
                    </Col>
                    <Col>
                      <label htmlFor='名字'>名字</label>
                      <InputWrapper>
                        <Input
                          type='text'
                          name='firstName'
                          placeholder='名字'
                          onChange={handleChange}
                          id='名字'
                          $border={promptMessage.firstName}
                        />
                        <PromptMessage>{promptMessage.firstName}</PromptMessage>
                      </InputWrapper>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <label htmlFor='生日'>生日</label>
                      <InputWrapper>
                        <Input
                          type='date'
                          name='birthdate'
                          onChange={handleChange}
                          id='生日'
                          $border={promptMessage.birthdate}
                        />
                        <PromptMessage>{promptMessage.birthdate}</PromptMessage>
                      </InputWrapper>
                    </Col>
                    <Col>
                      <label>性別</label>

                      <InputWrapper>
                        <FormRadioWrapper $border={promptMessage.gender}>
                          <FormRadio>
                            <div>
                              <Input
                                type='radio'
                                id='先生'
                                name='gender'
                                value='先生'
                                checked={formInput.gender === '先生'}
                                onChange={handleChange}
                              />
                              <label htmlFor='先生'>先生</label>
                            </div>
                          </FormRadio>
                          <FormRadio>
                            <div>
                              <Input
                                type='radio'
                                id='小姐'
                                name='gender'
                                value='小姐'
                                checked={formInput.gender === '小姐'}
                                onChange={handleChange}
                              />
                              <label htmlFor='小姐'>小姐</label>
                            </div>
                          </FormRadio>
                        </FormRadioWrapper>
                        <PromptMessage>{promptMessage.gender}</PromptMessage>
                      </InputWrapper>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <label htmlFor='email'>email</label>

                      <InputWrapper>
                        <Input
                          type='email'
                          name='email'
                          placeholder='電子郵件'
                          onChange={handleChange}
                          id='email'
                          $border={promptMessage.email}
                        />
                        <PromptMessage>{promptMessage.email}</PromptMessage>
                      </InputWrapper>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label htmlFor='行動電話'>電話</label>

                      <InputWrapper>
                        <Input
                          type='phone'
                          name='mobile'
                          placeholder='行動電話'
                          onChange={handleChange}
                          id='行動電話'
                          $border={promptMessage.mobile}
                        />
                        <PromptMessage>{promptMessage.mobile}</PromptMessage>
                      </InputWrapper>
                    </Col>
                    <Col>
                      <label htmlFor='市話'>市話</label>

                      <InputWrapper>
                        <Input
                          type='phone'
                          name='phone'
                          placeholder='市話(可選)'
                          onChange={handleChange}
                          id='市話'
                          $border={promptMessage.phone}
                        />
                        <PromptMessage>{promptMessage.phone}</PromptMessage>
                      </InputWrapper>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label htmlFor='郵遞區號'>地址</label>
                      <InputWrapper>
                        <Input
                          type='zipcode'
                          name='zipcode'
                          placeholder='郵遞區號'
                          onChange={handleChange}
                          id='郵遞區號'
                          $border={promptMessage.address?.zipcode}
                        />
                        <PromptMessage>
                          {promptMessage.address?.zipcode}
                        </PromptMessage>
                      </InputWrapper>

                      <InputWrapper>
                        <Input
                          type='county'
                          name='county'
                          placeholder='縣市'
                          onChange={handleChange}
                          id='縣市'
                          $border={promptMessage.address?.county}
                        />

                        <PromptMessage>
                          {promptMessage.address?.county}
                        </PromptMessage>
                      </InputWrapper>
                      <InputWrapper>
                        <Input
                          type='district'
                          name='district'
                          placeholder='鄉鎮市區'
                          onChange={handleChange}
                          id='鄉鎮市區'
                          $border={promptMessage.address?.district}
                        />

                        <PromptMessage>
                          {promptMessage.address?.district}
                        </PromptMessage>
                      </InputWrapper>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label htmlFor='' />
                      <InputWrapper>
                        <Input
                          type='address'
                          name='address'
                          placeholder='詳細地址路段樓層'
                          onChange={handleChange}
                          id='詳細地址'
                          $border={promptMessage.address?.address}
                        />
                        <PromptMessage>
                          {promptMessage.address?.address}
                        </PromptMessage>
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
                          onChange={handleChange}
                          autoComplete='new-password'
                          placeholder='密碼'
                          id='密碼'
                          $border={promptMessage.password}
                        />
                        <PromptMessage>{promptMessage.password}</PromptMessage>
                      </InputWrapper>
                    </Col>
                    <Col>
                      <label htmlFor='確認密碼'>確認密碼</label>
                      <InputWrapper>
                        <Input
                          type='password'
                          placeholder='確認密碼'
                          name='checkedPassword'
                          onChange={handleChange}
                          autoComplete='new-password'
                          id='確認密碼'
                          $border={promptMessage.checkedPassword}
                        />

                        <PromptMessage>
                          {promptMessage.checkedPassword}
                        </PromptMessage>
                      </InputWrapper>
                    </Col>
                  </Row>

                  <Agreement>
                    提交註冊表示同意
                    <StyledLink to='/about?type=privatePolicy' target='_blank'>
                      <b>隱私權保護政策</b>
                    </StyledLink>
                  </Agreement>

                  <FormFooter>
                    {registerClicked && (
                      <PromptMessage>
                        {authUserState?.error?.register}
                      </PromptMessage>
                    )}
                    <SubmitButton
                      type='button'
                      disabled={authUserState.loading}
                      onClick={handleRegister}
                    >
                      註冊
                    </SubmitButton>
                  </FormFooter>
                </Form>
              </FormWrapper>
            </Grid>
          </Grid>
        </Container>
      </Wrapper>
    </Layout.PageLayout >
  )
}
