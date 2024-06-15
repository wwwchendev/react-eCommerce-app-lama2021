import * as Layout from '@/components/layout';
const { SEO } = Layout;
import styled from 'styled-components';
import { md, xs } from '@/components/layout/responsive';
import { Button, StyledLink, Alert } from '@/components/common'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
//utility
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
  min-width: 2rem;
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
export const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [promptMessage, setPromptMessage] = useState({})
  const [formInput, setformInput] = useState({
    email: '',
  })
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target
    setformInput(prevState => ({
      ...prevState,
      [name]: value,
    }))
    setPromptMessage({ email: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (formInput.email) {
      setLoading(true)
      const fetchForgetPassword = async () => {
        const response = await customAxios.post(`${import.meta.env.VITE_APIURL}/auth/forgetPassword/user`, { email: formInput.email });

        setShowSuccess(true)
      };
      await fetchForgetPassword()
      setLoading(false)
    } else {
      setPromptMessage({ email: "電子信箱欄位不可為空" })
    }
  }

  return (
    <Layout.PageLayout>
      <SEO title='忘記密碼 | RESTART-SHOP' description={null} url={null} />
      <Wrapper>
        <Container>
          <Grid container justifyContent='center' alignItems='center' style={{ height: '100%' }}>
            <Grid item xs={12} sm={10} md={7} lg={5} >
              <FormWrapper>
                <Title>忘記密碼</Title>
                <Form>
                  <Field>
                    <InputWrapper $offsetX={"3.5rem"}>
                      <label htmlFor="信箱">Email</label>
                      <Input
                        type='text' name="email" id="信箱"
                        placeholder='輸入註冊時填入的電子信箱'
                        onChange={handleChange}
                        $border={promptMessage.email} />
                      <span>{promptMessage.email}</span>
                    </InputWrapper>
                  </Field>

                  <SubmitButton type="button" onClick={handleSubmit}>
                    寄送重設密碼函
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
                <StyledLink to="/login">返回登入頁面</StyledLink >
              </FormWrapper>
            </Grid>
          </Grid>
        </Container>
      </Wrapper>
      {showSuccess && <Alert title="重設密碼" iconType={"info"} onClose={() => setShowSuccess(false)} >
        請確認信箱並進行密碼重設
      </Alert>}
    </Layout.PageLayout>
  )
}

