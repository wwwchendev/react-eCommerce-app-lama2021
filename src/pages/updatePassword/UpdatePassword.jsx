import * as Layout from '@/components/layout'
const { SEO } = Layout
import styled from 'styled-components'
import { Button, Breadcrumb, Alert, Confirm } from '@/components/common'
import { useNavigate, useLocation } from 'react-router-dom'
import { md, sm } from '@/components/layout/responsive'
import { useEffect, useState } from 'react'
import AccountSettingList from '../account/AccountSettingList'
import { useDispatch, useSelector } from 'react-redux'
import cryptoJS from '@/utils/cryptoJS.js'
import { AuthUserRequests, reset } from '@/store/authUser'
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
  min-height: 1rem;
`
const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 2rem;
  background-color: #ffffff;
  ${sm({ padding: '2rem 0.75rem' })}
`
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 14px;
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
const Field = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  label {
    min-width: 4rem;
  }
  ${sm({ gap: '0.5rem' })}
`

const StyledText = styled.p`
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  font-size: 1.25rem;
  min-height: rem;
`

export const UpdatePassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.authUser.data)
  //TOKEN
  const authUserState = useSelector(state => state.authUser)
  const TOKEN = authUserState.data?.accessToken
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [paths, setPaths] = useState([
    { label: '首頁', path: '/' },
    { label: '會員中心', path: '/account' },
    { label: '變更密碼', path: '/updatePassword' },
  ])

  //表單
  const initialFormData = {
    password: '',
    newPassword: '',
    checkedPassword: '',
  }
  const [formInput, setformInput] = useState(initialFormData)
  const initialPromptMessage = {
    password: '',
    newPassword: '',
    checkedPassword: '',
  }
  const [promptMessage, setPromptMessage] = useState(initialPromptMessage)

  const handleChange = e => {
    const { name, value } = e.target
    setPromptMessage(initialPromptMessage)
    setformInput(prevState => ({
      ...prevState,
      [name]: value,
    }))
    if (authUserState.error !== null) {
      dispatch(reset())
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { password, newPassword, checkedPassword } = formInput

    if (password && newPassword && checkedPassword) {
      if (newPassword !== checkedPassword) {
        setPromptMessage({
          checkedPassword: '兩次輸入密碼不一致',
        })
      } else {
        setLoading(true)
        const updatePassword = async () => {
          const updatedData = {
            'username': authUserState.data.username,
            'oldPasswordHash': cryptoJS.encrypt(password),
            'newPasswordHash': cryptoJS.encrypt(newPassword),
            'checkedPasswordHash': cryptoJS.encrypt(checkedPassword),
          }
          try {
            const response = await customAxios.patch(
              `${import.meta.env.VITE_APIURL}/auth/updatePassword/user`,
              updatedData,
              { headers: { Authorization: `Bearer ${TOKEN}` } },
            )
            setShowConfirm(true)
            localStorage.removeItem('persist:root')
            setTimeout(() => {
              dispatch(AuthUserRequests.logout(user.refreshToken))
            }, 3000)
          } catch (error) {
            setPromptMessage(error.response.data.errors)
          }
        }
        await updatePassword()
        setLoading(false)
      }
    } else {
      const requireField = ['password', 'newPassword', 'checkedPassword']
      requireField.forEach((f, idx) => {
        let emptyField
        switch (f) {
          case 'password':
            emptyField = '舊密碼'
            break
          case 'newPassword':
            emptyField = '新密碼'
            break
          case 'checkedPassword':
            emptyField = '再次確認密碼'
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
      <SEO title='變更密碼 | RESTART-SHOP' description={null} url={null} />
      <StyledContainer>
        {showConfirm && (
          <Confirm
            title='密碼已變更'
            iconType={'success'}
            onClose={() => setShowConfirm(false)}
            hiddenCancelButton={true}
            onConfirm={() => setShowConfirm(false)}
          >
            請重新登入 (3秒後轉址到登入頁面)
          </Confirm>
        )}

        <Breadcrumb paths={paths} />

        <Grid container justifyContent='center'>
          {loading && (
            <Layout.Loading
              type={'spin'}
              active={true}
              color={'#c9a388'}
              size={'160px'}
            />
          )}
          <Aside item xs={12} md={2}>
            <AccountSettingList />
          </Aside>
          <Grid item xs={12} md={10}>
            <Grid container justifyContent='center'>
              <Grid item xs={12} md={7}>
                <FormWrapper>
                  <FormTitle>變更密碼</FormTitle>
                  <Form>
                    <StyledText>變更密碼</StyledText>
                    <Field>
                      <InputWrapper $offsetX={'5rem'}>
                        <label htmlFor='舊密碼'>舊密碼</label>
                        <Input
                          type='password'
                          name='password'
                          onChange={handleChange}
                          $autoComplete='current-password'
                          placeholder='原本的密碼'
                          id='舊密碼'
                          $border={promptMessage?.password}
                        />
                        <span>{promptMessage?.password}</span>
                      </InputWrapper>
                    </Field>
                    <Field>
                      <InputWrapper $offsetX={'5rem'}>
                        <label htmlFor='新密碼'>新密碼</label>
                        <Input
                          type='password'
                          name='newPassword'
                          onChange={handleChange}
                          $autoComplete='new-password'
                          placeholder='新的密碼'
                          id='新密碼'
                          $border={promptMessage?.newPassword}
                        />
                        <span>{promptMessage?.newPassword}</span>
                      </InputWrapper>
                    </Field>
                    <Field>
                      <InputWrapper $offsetX={'5rem'}>
                        <label htmlFor='再次確認密碼'>再次確認</label>
                        <Input
                          type='password'
                          name='checkedPassword'
                          onChange={handleChange}
                          $autoComplete='new-password'
                          placeholder='輸入新密碼進行檢核(必要)'
                          id='再次確認密碼'
                          $border={promptMessage?.checkedPassword}
                        />
                        <span>{promptMessage?.checkedPassword}</span>
                      </InputWrapper>
                    </Field>
                    <SubmitButton type='button' onClick={handleSubmit}>
                      提交
                    </SubmitButton>
                  </Form>
                </FormWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledContainer>

    </Layout.PageLayout>
  )
}
