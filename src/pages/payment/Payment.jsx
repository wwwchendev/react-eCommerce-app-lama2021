import { useEffect, useState } from 'react';
import * as Layout from '@/components/layout';
const { SEO } = Layout;
import styled from 'styled-components';
import { StepNavigation, NumberInput, Alert, Confirm } from '@/components/common'

import { md, sm } from '@/components/layout/responsive';
import Icon from '@/components/icon';
const { Success, Cancel } = Icon;
import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { cartRequests, clearCartError } from '@/store/cart';
import { numberWithCommas } from '@/utils/format.js';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

//utility
import customAxios from '@/utils/axios/customAxios'
//佈局
const StyledContainer = styled(Container)`
  padding: 8rem 0 2rem 0 ;
  position: relative;
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 0 ;
  min-height: 50vh;
`;
const CartIconWrapper = styled.div`
height:3rem;
width: 3rem;
display: flex;
align-items: center;
justify-content: center;
letter-spacing: 1px;
color: #666666;
svg{
  height: 100%;
}
`;

const Section = styled.section`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
line-height: 2;

  ${sm({ padding: '1rem 1rem' })}

  input[type="radio"] {
    margin-right: 0.5rem;
  }

  h3 {
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 2px;
    background-color: #fff;

  }
  ${sm({
  padding: '1rem 0.5rem',
})}
`;
const Reminder = styled(Section)`
background-color: #fdfdfd;
display: flex;
justify-content: center;
align-items: center;
gap: 2rem;
margin-bottom: 2rem;
h4{
  font-size: 18px;
}
span{
  color:#d31414;
  font-weight: bold;
}
${sm({
  flexDirection: 'column',
  gap: '0.5rem',

  textAlign: 'center'
})}
`
const OnlinePayment = styled(Section)`
border-radius: 4px 4px  0  0;
position: relative;
  padding: 3rem;
`
const Button = styled.button`
  display: block;
  cursor: pointer;
  border-radius: 4px ;
  height: 2.5rem;

  &:disabled {
    background-color: #f0f0f0;
    color: #aaaaaa;
    border: 2px solid #ddd;
    cursor: not-allowed;
  }

  font-size: 18px;
  &:active {
  font-size: 16px;
  }

  background-color: #810909;
  border: 0;
  color: #ffffff;
  width: 100%;
`;
const OutlineButton = styled(Button)`
border: 1px solid  #810909;
color:  #810909;
background-color:#ffffff;
`;
const PayButton = styled(Button)`
position: absolute;
left:0;
right: 0;
bottom: -1rem;
  height: 2.5rem;
`;
const OnlinePaymentOption = styled.div`
display: flex;
`
const ImageWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
img{
  max-width:200px ;
  border: 1px solid #ddd;
}
  ${sm({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem'
})}
`
const OnlinePaymentOptions = styled.div`
display: flex;
justify-content: center;
gap: 3rem;
  ${sm({ flexDirection: 'column' })}
`



export const Payment = () => {
  const navigate = useNavigate();

  const { orderNumber } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //Redux
  //TOKEN
  const authUser = useSelector(state => state.authUser.data);
  const TOKEN = authUser?.accessToken;
  //表單管理
  const [paymentOption, setPaymentOption] = useState(null)


  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true);
      try {
        const response = await customAxios.get(`${import.meta.env.VITE_APIURL}/order/${orderNumber}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
        const order = response.data.data;

        // 權限檢查
        if (order?.username !== authUser?.username) {
          throw new Error('您沒有權限訪問此訂單。');
        } else {
          setOrderData(order); // 只有在權限檢查通過後才設置訂單數據
        }

      } catch (error) {
        console.error(error);
        setError(error.message || '訂單資料獲取失敗。');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [TOKEN, orderNumber, authUser?.username]);

  //是否在付款期限內
  const [expiredTimeCountDown, setExpiredTimeCountDown] = useState(null)
  useEffect(() => {
    const updateCountDown = () => {
      if (
        orderData?.payment?.type === "線上付款" &&
        orderData?.payment?.status === "尚未付款" &&
        orderData?.payment?.paymentExpiredTime &&
        new Date(orderData?.payment?.paymentExpiredTime) > new Date()
      ) {
        const current = new Date();
        const countDown = new Date(orderData.payment.paymentExpiredTime) - current;

        // 計算分鐘和秒數
        const minutes = Math.floor((countDown / 1000) / 60);
        const seconds = Math.floor((countDown / 1000) % 60);

        // 計算分鐘和秒數
        setExpiredTimeCountDown(`${minutes}:${seconds}`);
      } else {
        setExpiredTimeCountDown(null);
      }
    };

    updateCountDown();
    const interval = setInterval(updateCountDown, 1000);

    return () => clearInterval(interval);
  }, [orderData]);


  //Alert and Confirm
  const initAlertInfo = {
    active: false,
    iconType: 'info',
    title: '',
    content: '',
  };
  const [showAlert, setShowAlert] = useState(initAlertInfo);


  const handleSubmit = async () => {
    if (paymentOption !== null) {
      setLoading(true);
      try {
        const data = {
          ...orderData,
          payment: {
            ...orderData.payment,
          }
        }
        data.payment.status = "已付款";
        data.payment.option = paymentOption;
        data.payment.paidAt = new Date();

        const response = await customAxios.put(`${import.meta.env.VITE_APIURL}/order/${orderNumber}`,
          data, { headers: { Authorization: `Bearer ${TOKEN}` } });

        if (response.statusText === "OK") {
          const order = response.data.data;
          setOrderData(order)
        }

      } catch (error) {
        console.error(error);
        setError(error.message || '更新訂單資料時發生錯誤。');
      } finally {
        setLoading(false);
      }
    } else {
      setShowAlert({
        active: true,
        iconType: 'info',
        title: '請選擇支付方式',
        content: '',
      })
    }

  };


  if (error) {
    return (
      <Alert
        iconType="error"
        title="錯誤"
        content={error || "獲取訂單時出現錯誤"}
        onClose={() => navigate('/orders')}
      />
    );
  }


  return (
    <>
      <SEO title='訂單結算 | RESTART-SHOP' description={null} url={null} />
      {<>
        {
          showAlert.active && (
            <Alert
              iconType={showAlert.iconType}
              title={showAlert.title}
              content={showAlert.content}
              onClose={() => {
                setShowAlert(initAlertInfo);
              }}
            />
          )
        }
        <StyledContainer style={{ border: '1px solid red' }}>
          <Grid container direction='column' justifyContent='center' alignItems='center' >
            <Grid container justifyContent='center' alignItems='center'  >
              <Grid item xs={12} sm={10} md={8} lg={7}>
                <StepNavigation
                  labelArray={['查看購物車', '訂單確認', '訂單結算']}
                  currentStep={3}
                  updateStep={null}
                  disabledSteps={[1, 2]}
                />
                <hr />
              </Grid>
            </Grid>

            <Wrapper>
              {loading ? <Layout.Loading
                type={'spin'}
                active={true}
                color={'#c9a388'}
                size={'160px'}
              />
                : <> {
                  (orderData?.payment?.type === "線上付款" && (orderData?.logistic?.status === "待確認" && orderData?.payment?.status === "尚未付款"))
                    ? <>{
                      (expiredTimeCountDown !== null)
                        ? <>
                          <Reminder>
                            <CartIconWrapper>
                              <Success />
                            </CartIconWrapper>
                            <div>
                              <h4>感謝您的訂購！您的訂單已成立</h4>
                              <p>訂單編號: <Link to={`/orders/${orderData?.orderNumber}`} target='_blank'>{orderData?.orderNumber}</Link> ,
                                應付金額:<span>NT$ {orderData?.total}</span></p>

                              <p>請在 <span>{expiredTimeCountDown} </span>前完成付款，以確保訂單順利處理。</p>
                              <p>提醒：如超過時間繳費，系統將自動取消逾期訂單</p>

                            </div>
                          </Reminder>
                          <OnlinePayment>
                            <h3>選擇支付方式</h3>
                            <OnlinePaymentOptions>
                              <OnlinePaymentOption>
                                <input type="radio" id="信用卡"
                                  name="paymentMethod"
                                  value="信用卡"
                                  onChange={() => { setPaymentOption("信用卡") }}
                                  checked={paymentOption === '信用卡'}
                                />
                                <ImageWrapper onClick={() => { setPaymentOption("信用卡") }}>
                                  <img src='/images/payment/creditCard.png' alt="" />
                                  <label htmlFor="信用卡">信用卡</label>
                                </ImageWrapper>
                              </OnlinePaymentOption>
                              <OnlinePaymentOption>
                                <input type="radio" id="LINE PAY"
                                  name="paymentMethod"
                                  value="LINE PAY"
                                  onChange={() => { setPaymentOption("LINE PAY") }}
                                  checked={paymentOption === 'LINE PAY'}
                                />
                                <ImageWrapper onClick={() => { setPaymentOption("LINE PAY") }}>
                                  <img src='/images/payment/linepay.png' alt="" />
                                  <label htmlFor="LINE PAY">LINE PAY</label>
                                </ImageWrapper>
                              </OnlinePaymentOption>
                            </OnlinePaymentOptions>
                            <PayButton type="button" onClick={handleSubmit}>立即付款</PayButton>
                          </OnlinePayment>
                        </>
                        : <>
                          <Reminder>
                            <CartIconWrapper>
                              <Cancel />
                            </CartIconWrapper>
                            <div>
                              <h4>付款超時 已自動取消</h4>
                              <p>訂單編號: <Link to={`/orders/${orderData?.orderNumber}`} target='_blank'>{orderData?.orderNumber}</Link> ,
                                訂單金額:<span>NT$ {orderData?.total}</span> </p>
                              <p>由於未在指定時間內完成付款，訂單 <b>{orderData?.orderNumber}</b> 已取消。</p>
                              <p>如需重新訂購，敬請再次下單。</p>
                            </div>
                          </Reminder>
                          <Button onClick={() => { navigate(`/orders/${orderData?.orderNumber}`) }}>查看訂單紀錄</Button>
                          <br />
                          <OutlineButton onClick={() => { navigate(`/`) }}>回首頁</OutlineButton>
                        </>
                    }</>
                    : (<>
                      <Reminder>
                        <CartIconWrapper>
                          <Success />
                        </CartIconWrapper>
                        <div>
                          <h4>{orderData?.payment?.type === "線上付款" ? "感謝您的訂購！已收到訂單款項" : "感謝您的訂購！您的訂單已成立"}</h4>
                          <p>我們會迅速處理您的訂單  <Link to={`/orders/${orderData?.orderNumber}`} target='_blank'>{orderData?.orderNumber}</Link> 並安排送貨。</p>
                        </div>
                      </Reminder>
                      <Button onClick={() => { navigate(`/orders/${orderData?.orderNumber}`) }}>查看訂單</Button>
                    </>)
                }
                </>
              }
            </Wrapper>
          </Grid>



          {/* <pre>{JSON.stringify(orderData?.logistic?.status, null, 2)}</pre>
            <pre>{JSON.stringify(orderData?.payment?.type, null, 2)}</pre> */}
          {/*  <pre>{JSON.stringify(expiredTimeCountDown, null, 2)}</pre> */}

          {/* <pre>{JSON.stringify(orderData, null, 2)}</pre> */}
        </StyledContainer>
      </>
      }
    </>
  );
}