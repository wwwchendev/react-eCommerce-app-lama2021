import * as Layout from '@/components/layout';
const { SEO } = Layout;
import styled from 'styled-components';
import { md, xs } from '@/components/layout/responsive';
import { Button, StyledLink, Confirm } from '@/components/common'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
//utility
import cryptoJS from '@/utils/cryptoJS.js';
import customAxios from '@/utils/axios/customAxios'
import { Container as MuiContainer, Grid } from '@material-ui/core';

const Wrapper = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url('./images/auth/cement-bg.png') center;
  background-size: cover;
  text-align: center;
  ${StyledLink} {
    text-align: center;
    width:100%;
    text-decoration: none;
    cursor: pointer;
    display: block;
    margin: 0.75rem auto;
    color:#cebcbc;
    &:hover{
      font-weight: bold;
    }
  }
`

const Container = styled(MuiContainer)`
height: 100%;
  padding: 12rem ;
  ${md({ padding: '5rem' })};
  ${xs({ padding: '2rem' })};

`
const FormWrapper = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  height: 300px;
  position: relative;
  a{
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  }
`;


const Title = styled.h1`
text-align: center;
font-size: 1.5rem;
`
const Form = styled.form`
/* border: 1px solid red; */
padding: 1.5rem 0 ;  
min-height: 170px;
`

const Input = styled.input`
  flex: 1;
  padding: 8px;
  width:100%;
  border: ${p => p.$border ? "2px solid #ce4646" : "1px solid #999"} ;
  border-radius: 5px;
`
const SubmitButton = styled(Button)`
  background-color: transparent;
  color:#866565;
  border:1px solid #866565;
  display: block;
  margin-top: 2rem ;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;  
  &:hover{
  font-weight: bold;
  border:2px solid #866565;
}
  &:disabled {
    background-color: #aaaaaa;
    cursor: not-allowed;
  }
`
const Field = styled.div`
/* border: 1px solid red; */
gap: 0.5rem;
display: flex;
align-items: center;
margin-bottom: 1.2rem ;
label{
  min-width: 4.5rem;
  text-align: justify;
}
`
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap:1rem;
  font-size: 14px;
flex: 1;
  span{
    position: absolute;
    bottom: -1.2rem;
    left: ${p => p.$offsetX ? p.$offsetX : ""};
    color: #ce4646;
  }
`

export const ResetPassword = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [promptMessage, setPromptMessage] = useState({})
  const [showConfirm, setShowConfirm] = useState(false);

  const [formInput, setformInput] = useState({
    newPassword: '',
    checkedPassword: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setformInput(prevState => ({
      ...prevState,
      [name]: value,
    }))
    setPromptMessage({
      newPassword: '',
      checkedPassword: '',
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (formInput.newPassword && formInput.checkedPassword) {
      setLoading(true)

      const resetPassword = async () => {
        try {
          const response = await customAxios.post(`${import.meta.env.VITE_APIURL}/auth/resetPassword/user?token=${token}`, { passwordHash: cryptoJS.encrypt(formInput.checkedPassword) });
          setShowConfirm(true)
          setTimeout(() => {
            navigate('/login');
          }, 3000)
        } catch (error) {
          setPromptMessage(error.response.data.errors)
        }
      };
      await resetPassword()

      setLoading(false)
    } else {
      const requireField = ["newPassword", "checkedPassword"];
      requireField.forEach((f, idx) => {
        let emptyField;
        switch (f) {
          case 'newPassword':
            emptyField = '新密碼';
            break;
          case 'checkedPassword':
            emptyField = '確認密碼';
            break;
          default:
            return;
        }
        if (formInput[f] === '') {
          setPromptMessage(prev => {
            return {
              ...prev,
              [f]: `${emptyField}不得為空`,
            };
          });
        }
      })

    }
  }

  return (
    <Layout.PageLayout>
      <SEO title='重設密碼 | RESTART-SHOP' description={null} url={null} />

      {showConfirm && (
        <Confirm title="密碼已變更" iconType={"success"} onClose={() => setShowConfirm(false)} hiddenCancelButton={true}
          onConfirm={() => setShowConfirm(false)}
        >
          請重新登入 (3秒後轉址到登入頁面)
        </Confirm>
      )}
      <Wrapper>
        <Container>
          <Grid container justifyContent='center' alignItems='center' style={{ height: '100%' }}>
            <Grid item xs={12} sm={10} md={7} lg={5} >
              <FormWrapper>
                <Title>重設密碼</Title>
                <Form>
                  <Field>
                    <InputWrapper $offsetX={"5.5rem"}>
                      <label htmlFor="新密碼">輸入新密碼</label>
                      <Input
                        type='password' placeholder='新密碼'
                        id="新密碼" onChange={handleChange}
                        $border={promptMessage.newPassword} name="newPassword"
                      />
                      <span>{promptMessage.newPassword}</span>
                    </InputWrapper>
                  </Field>
                  <Field>
                    <InputWrapper $offsetX={"5.5rem"}>
                      <label htmlFor="確認密碼">確認密碼</label>
                      <Input
                        type='password' placeholder='兩次輸入密碼須一致'
                        id="確認密碼" onChange={handleChange}
                        $border={promptMessage.checkedPassword} name="checkedPassword"
                      />
                      <span>{promptMessage.checkedPassword}</span>
                    </InputWrapper>
                  </Field>

                  <SubmitButton type="button" onClick={handleSubmit}>
                    送出
                  </SubmitButton>
                  {
                    loading && (
                      <Layout.Loading
                        type={'spin'}
                        active={true}
                        color={'#c9a388'}
                        size={'160px'}
                      />
                    )
                  }
                </Form>
              </FormWrapper>
            </Grid>
          </Grid>
        </Container>
      </Wrapper>
    </Layout.PageLayout>
  )
}

