import * as Layout from '@/components/layout'
const { SEO } = Layout
import styled from 'styled-components'
import { Button, Breadcrumb, Confirm } from '@/components/common'

import { xs, md, sm } from '@/components/layout/responsive'
import { useEffect, useState } from 'react'
import AccountSettingList from './AccountSettingList'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDayString } from '@/utils/format.js'
import cryptoJS from '@/utils/cryptoJS.js'
import { AuthUserRequests, reset } from '@/store/authUser'
import { Alert } from '@/components/common'
//utility
import customAxios from '@/utils/axios/customAxios'
import { Container, Grid } from '@material-ui/core'

const StyledContainer = styled(Container)`
  padding: 2rem 0 4rem 0rem;
`

const Aside = styled(Grid)`
  ${sm({ display: 'none' })}
`

const FormWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  max-width: ${p => (p.$maxWidth ? p.$maxWidth : '')};
  margin: 0 auto;
`
const FormTitle = styled.div`
  background-color: #aaa5a0;
  color: #ffffff;
  letter-spacing: 2px;
  padding: 0.5rem 1rem;
`
const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  gap: 16px;
  background-color: #ffffff;
  ${xs({ padding: '1rem' })}
`
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  span {
    position: absolute;
    bottom: -1.2rem;
    left: ${p => (p.$offsetX ? p.$offsetX : '')};
    color: #ce4646;
  }
`
const Input = styled.input`
  flex: 1;
  padding: 8px;
  width: 100%;
  font-size: 14px;
  border: ${p => (p.$border ? '2px solid #ce4646' : '1px solid #999')};
  border-radius: 5px;
`
const SubmitButton = styled(Button)`
  background-color: transparent;
  color: #866565;
  border: 1px solid #866565;
  display: block;
  margin-top: 1.5rem;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  &:hover {
    font-weight: bold;
    border: 2px solid #866565;
  }
  &:disabled {
    background-color: #aaaaaa;
    cursor: not-allowed;
  }
`

const FormRadioWrapper = styled.div`
  flex: 1;
  display: flex;
  padding: 8px;
  width: 100%;
  border: ${p => (p.$border ? '2px solid #ce4646' : '')};
  border-radius: 5px;
`
const FormRadio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${Input} {
    margin-right: 8px;
  }
  label {
    cursor: pointer;
    font-size: 15px;
  }
`
const StyledText = styled.p`
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  font-size: 1.25rem;
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
    min-width: 3rem;
    text-align: justify;
  }
`

export const Account = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [verified, setVerified] = useState(false)
  //TOKEN
  const authUserState = useSelector(state => state.authUser)
  const user = authUserState.data
  const TOKEN = authUserState.data?.accessToken
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [paths, setPaths] = useState([
    { label: '首頁', path: '/' },
    { label: '會員中心', path: '/account' },
    { label: '修改會員資料', path: '/account' },
  ])

  //表單
  const initialFormData = {
    username: user?.username,
    lastName: user?.lastName,
    firstName: user?.firstName,
    gender: user?.gender,
    birthdate: getDayString(new Date(user?.birthdate), '-'),
    mobile: user?.mobile,
    phone: user?.phone,
    email: user?.email,
    address: {
      zipcode: user?.address?.zipcode,
      county: user?.address?.county,
      district: user?.address?.district,
      address: user?.address?.address,
    },
    password: '',
  }
  const [formInput, setformInput] = useState(initialFormData)
  const initialPromptMessage = {
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
  const [promptMessage, setPromptMessage] = useState(initialPromptMessage)
  const handleChange = e => {
    const { name, value } = e.target
    setPromptMessage(initialPromptMessage)

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
    if (authUserState.error !== null) {
      dispatch(reset())
    }
  }
  const handleVerify = async e => {
    e.preventDefault()
    if (formInput.password) {
      setLoading(true)
      const verifyUser = async () => {
        const response = await customAxios.get(
          `${import.meta.env.VITE_APIURL}/user/${authUserState.data.username}`,
          { headers: { Authorization: `Bearer ${TOKEN}` } },
        )
        const storedPasswordHash = response.data.data.passwordHash
        if (cryptoJS.encrypt(formInput.password) === storedPasswordHash) {
          setVerified(true)
        } else {
          setPromptMessage({ password: '輸入密碼錯誤' })
        }
      }
      await verifyUser()
      setLoading(false)
    } else {
      setPromptMessage(prev => {
        return {
          ...prev,
          password: '密碼驗證欄位不得為空',
        }
      })
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const { firstName, lastName, email, mobile, phone, address } = formInput
    if (
      firstName &&
      lastName &&
      email &&
      mobile &&
      address.zipcode &&
      address.county &&
      address.district &&
      address.address
    ) {
      setLoading(true)
      const updateUser = async () => {
        const updatedData = {
          lastName,
          firstName,
          sm,
          phone,
          email,
          address: {
            zipcode: address?.zipcode,
            county: address?.county,
            district: address?.district,
            address: address?.address,
          },
        }
        try {
          const response = await customAxios.put(
            `${import.meta.env.VITE_APIURL}/user/${authUserState.data.username}`,
            updatedData,
            { headers: { Authorization: `Bearer ${TOKEN}` } },
          )
          await dispatch(
            AuthUserRequests.refreshData(TOKEN, authUserState.data.username),
          )
          setShowSuccess(true)
        } catch (error) {
          setPromptMessage(error.response.data.errors)
        }
      }
      await updateUser()
      setLoading(false)
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

      const requireField = ['lastName', 'firstName', 'sm', 'email']
      requireField.forEach((f, idx) => {
        let emptyField
        switch (f) {
          case 'lastName':
            emptyField = '姓氏'
            break
          case 'firstName':
            emptyField = '姓名'
            break
          case 'sm':
            emptyField = '行動電話'
            break
          case 'email':
            emptyField = '信箱'
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
      <SEO title='會員中心 | RESTART-SHOP' description={null} url={null} />
      <StyledContainer>
        <Breadcrumb paths={paths} />
        {showSuccess && (
          <Alert
            title='修改會員資料'
            iconType={'success'}
            onClose={() => setShowSuccess(false)}
          >
            {' '}
            資料已修改
          </Alert>
        )}
        <Grid container justifyContent='center'>
          <Aside item xs={12} md={2}>
            <AccountSettingList />
          </Aside>
          <Grid item xs={12} md={10}>
            <Grid container justifyContent='center'>
              <Grid item xs={12} md={7}>
                {verified ? (
                  <FormWrapper>
                    <FormTitle>修改會員資料</FormTitle>
                    <Form>
                      <Row>
                        <Col>
                          <label htmlFor='用戶名稱'>帳號</label>
                          <InputWrapper>
                            <Input
                              type='text'
                              name='username'
                              placeholder='用戶名稱'
                              onChange={handleChange}
                              id='用戶名稱'
                              $border={promptMessage.username}
                              value={formInput.username}
                              disabled={true}
                            />
                          </InputWrapper>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <label htmlFor='姓氏'>姓氏</label>
                          <InputWrapper $offsetX={'4rem'}>
                            <Input
                              type='text'
                              name='lastName'
                              placeholder='姓氏'
                              onChange={handleChange}
                              id='姓氏'
                              $border={promptMessage.lastName}
                              value={formInput.lastName}
                            />
                            <span>{promptMessage.lastName}</span>
                          </InputWrapper>
                        </Col>
                        <Col>
                          <label htmlFor='名字'>名字</label>
                          <InputWrapper $offsetX={'4rem'}>
                            <Input
                              type='text'
                              name='firstName'
                              placeholder='名字'
                              onChange={handleChange}
                              id='名字'
                              $border={promptMessage.firstName}
                              value={formInput.firstName}
                            />
                            <span>{promptMessage.firstName}</span>
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
                              value={formInput.birthdate}
                              disabled={true}
                            />
                            <span>{promptMessage.birthdate}</span>
                          </InputWrapper>
                        </Col>
                        <Col>
                          <label>性別</label>
                          <InputWrapper>
                            <FormRadioWrapper $border={promptMessage.gender}>
                              <FormRadio>
                                <Input
                                  type='radio'
                                  id='先生'
                                  name='gender'
                                  value='先生'
                                  checked={formInput.gender === '先生'}
                                  onChange={handleChange}
                                  disabled={true}
                                />
                                <label htmlFor='先生'>先生</label>
                              </FormRadio>
                              <FormRadio>
                                <Input
                                  type='radio'
                                  id='小姐'
                                  name='gender'
                                  value='小姐'
                                  checked={formInput.gender === '小姐'}
                                  onChange={handleChange}
                                  disabled={true}
                                />
                                <label htmlFor='小姐'>小姐</label>
                              </FormRadio>
                            </FormRadioWrapper>
                          </InputWrapper>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <label htmlFor='email'>email</label>
                          <InputWrapper $offsetX={'4rem'}>
                            <Input
                              type='email'
                              name='email'
                              placeholder='電子郵件'
                              onChange={handleChange}
                              id='email'
                              $border={promptMessage.email}
                              value={formInput?.email}
                            />
                            <span>{promptMessage.email}</span>
                          </InputWrapper>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <label htmlFor='行動電話'>電話</label>
                          <InputWrapper $offsetX={'4rem'}>
                            <Input
                              type='phone'
                              name='mobile'
                              placeholder='行動電話'
                              onChange={handleChange}
                              id='行動電話'
                              $border={promptMessage.mobile}
                              value={formInput?.mobile}
                            />
                            <span>{promptMessage.sm}</span>
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
                              value={formInput?.phone}
                            />
                            <span>{promptMessage.phone}</span>
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
                              value={formInput?.address?.zipcode}
                            />
                            <span>{promptMessage?.address?.zipcode}</span>
                          </InputWrapper>

                          <InputWrapper>
                            <Input
                              type='county'
                              name='county'
                              placeholder='縣市'
                              onChange={handleChange}
                              id='縣市'
                              $border={promptMessage.address?.county}
                              value={formInput?.address?.county}
                            />
                            <span>{promptMessage.address?.county}</span>
                          </InputWrapper>

                          <InputWrapper>
                            <Input
                              type='district'
                              name='district'
                              placeholder='鄉鎮市區'
                              onChange={handleChange}
                              id='鄉鎮市區'
                              $border={promptMessage.address?.district}
                              value={formInput?.address?.district}
                            />
                            <span>{promptMessage.address?.district}</span>
                          </InputWrapper>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <label htmlFor=''> </label>
                          <InputWrapper>
                            <Input
                              type='address'
                              name='address'
                              placeholder='詳細地址路段樓層'
                              onChange={handleChange}
                              id='詳細地址'
                              $border={promptMessage.address?.address}
                              value={formInput?.address?.address}
                            />
                            <span>{promptMessage.address?.address}</span>
                          </InputWrapper>
                        </Col>
                      </Row>
                      <SubmitButton type='button' onClick={handleSubmit}>
                        變更
                      </SubmitButton>
                    </Form>
                  </FormWrapper>
                ) : (
                  <FormWrapper>
                    <FormTitle>修改會員資料</FormTitle>
                    <Form>
                      <StyledText>
                        為保護會員個人信息 請先進行密碼驗證
                      </StyledText>
                      <Col>
                        <InputWrapper>
                          <Input
                            type='password'
                            name='password'
                            onChange={handleChange}
                            autoComplete='current-password'
                            placeholder='輸入密碼進行驗證(必要)'
                            id='密碼'
                            $border={promptMessage.password}
                          />
                          <span>{promptMessage.password}</span>
                        </InputWrapper>
                      </Col>
                      <SubmitButton type='button' onClick={handleVerify}>
                        提交
                      </SubmitButton>
                    </Form>
                  </FormWrapper>
                )}
                {loading && (
                  <Layout.Loading
                    type={'spin'}
                    active={true}
                    color={'#c9a388'}
                    size={'160px'}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledContainer>
    </Layout.PageLayout>
  )
}
