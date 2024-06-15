import { useEffect, useState } from 'react';
import * as Layout from '@/components/layout';
const { SEO } = Layout;
import styled from 'styled-components';
import { StepNavigation, NumberInput, Alert, Confirm } from '@/components/common'

import { xs, md, sm } from '@/components/layout/responsive';
import Icon from '@/components/icon';
const { Cart2, HeartAdd, HeartTick } = Icon;
import { Add, CloseRounded } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { cartRequests, clearCartError } from '@/store/cart';
import { numberWithCommas } from '@/utils/format.js';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { likedProductRequests } from '@/store/likedProduct';

import { Container, Grid } from '@material-ui/core';
//佈局
const StyledContainer = styled(Container)`
  padding: 8rem 0 10rem 0;
  position: relative;
  hr {
    margin-bottom: 2rem;
  }
  ${sm({
  padding: '8rem 0 '
})}
`;


//表格--商品資訊

const CartItem = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  background-color:#f8f6f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
`
const ProductWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
`
const ProductImageContainer = styled.div`
height: 100%;
width: 100%;
max-width: 144px;
max-height: 144px;
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
img{
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
}
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap:8px;
  width: 100%;
  a{
    display: block;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    color: #4e4e4e;
    ${sm({
  fontSize: '20px',
})}
  }
  span{
    font-size: 14px;
    color: #aaa;
  }
`
const ProductName = styled.h5`
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 2;
  `
const Variant = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 14px;
`;
const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 14px;  
`
const Actions = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

`
//操作
const NumberInputWrapper = styled.div`
height: 1.5rem;
display: flex;
*{
  font-size: 14px;
}
  ${sm({
  justifyContent: 'flex-end',
  margin: '0',
})}
`;
const Button = styled.button`
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background-color: transparent;
   cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
  &:disabled {
    background-color: #f0f0f0;
    color: #aaaaaa;
    border: 2px solid #ddd;
    cursor: not-allowed;
  }
  &:active {
    transform: scale(0.98);
  }
`;
const RemoveItemButton = styled(Button)`
`;
const AddToLikedProductsButton = styled(Button)`
font-size: 2rem;
svg{
  min-width: 1.5rem;
}
`
const CartIconWrapper = styled.div`

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 1rem;
div{
  display: flex;
align-items: center;
justify-content: center;
}
svg{
  width: 50px;
}
`
//頁尾固定總計
const SummarizeWrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  height: 100px;
  padding:5rem 0rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;
  background-color: rgba(231, 224, 224,0.9);
  z-index: 500;
  letter-spacing: 2px;
div{
  display: flex;
  align-items: center;
  gap: 3rem;
  
  ${sm({
  gap: '0rem',
  justifyContent: 'space-between'
})}
  
}
  span {
    color: #d31414;
    font-size: 28px;
  letter-spacing: 1px;
  }
  ${sm({
  gap: '1rem',
  padding: '4rem 2rem',
  justifyContent: 'space-between'
})}
`;
const SummarizeContainer = styled(Container)`
display: flex;
justify-content: flex-end;
`
const CheckoutButton = styled(Button)`
padding:0.5rem 1rem;
width: 4rem;
white-space: nowrap;
  background-color: #810909;
  border: 0;
  color: #ffffff;
`;

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //TOKEN
  const authUser = useSelector(state => state.authUser.data);
  const TOKEN = authUser?.accessToken;
  //Redux
  const cartState = useSelector((state) => state.cart);
  const likedProductState = useSelector((state) => state.likedProduct);

  useEffect(() => {
    dispatch(cartRequests.get(TOKEN, authUser?.username))
  }, [dispatch]);

  //Step元件
  const [currentStep, setCurrentStep] = useState(1);
  //驗證商品是否已收藏
  const verifyDuplicate = (productId) => {
    const index = likedProductState.data.products.findIndex(item => {
      return item?._id === productId
    });
    if (index !== -1) {
      return true
    } else {
      return false
    }
  }
  //更新
  const handleQuantity = (type, item) => {
    const currentQuantity = item.quantity
    const updatedQuantity = type === "inc" ? currentQuantity + 1 : currentQuantity - 1
    const data = {
      "productId": item.productId,
      "variant": {
        "variantId": item.variantId,
        "specificationId": item.specificationId,
        "quantity": updatedQuantity
      }
    }
    dispatch(cartRequests.updateCartItem(TOKEN, authUser.username, data))

  };

  const handleRemove = (item) => {
    setOperateType("remove")
    const data = {
      productId: item.productNumber,
      variant: {
        variantId: item.variantId,
        specificationId: item.specificationId
      }
    }
    dispatch(cartRequests.removeCartItem(TOKEN, authUser.username, data))
  }
  const handleRemoveToLikedFromCart = (item) => {
    setOperateType("removeToLikedFromCart")
    // console.log(item);
    //加入收藏
    dispatch(likedProductRequests.addLikedItem(TOKEN, authUser?.username, { "productId": item.productId }))
    //移除商品
    const data = {
      productId: item.productNumber,
      variant: {
        variantId: item.variantId,
        specificationId: item.specificationId
      }
    }
    dispatch(cartRequests.removeCartItem(TOKEN, authUser.username, data))
  };

  //Alert and Confirm
  const initAlertInfo = {
    active: false,
    iconType: 'info',
    title: '',
    content: '',
  };
  const [showAlert, setShowAlert] = useState(initAlertInfo);
  const initConfirmInfo = {
    active: false,
    iconType: 'info',
    title: '',
    content: '',
    onConfirm: null,
  };
  const [showConfirm, setShowConfirm] = useState(initConfirmInfo);


  //根據當前操作類型顯示Alert或Confirm元件
  const [operateType, setOperateType] = useState("");
  useEffect(() => {
    if (operateType === "remove" && cartState.error === null) {
      setShowAlert({
        iconType: 'success',
        title: '購物車',
        content: '已移除商品',
        active: true,
      });
      setOperateType("")
    }
    if (operateType === "removeToLikedFromCart" && cartState.error === null && likedProductState.error === null) {
      setShowAlert({
        iconType: 'heartAdd',
        title: '收藏清單',
        content: '已移動至收藏清單',
        active: true,
      });

      setOperateType("")
    }
  }, [cartState.data, likedProductState.data]);

  //計算總和
  const totalAmount = cartState.data?.products?.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <SEO title='查看購物車 | RESTART-SHOP' description={null} url={null} />
      {(cartState.loading || likedProductState.loading) && (
        <Layout.Loading
          type={'spin'}
          active={true}
          color={'#c9a388'}
          size={'160px'}
        />
      )}
      {showAlert.active && (
        <Alert
          iconType={showAlert.iconType}
          title={showAlert.title}
          content={showAlert.content}
          onClose={() => {
            setShowAlert(initAlertInfo);
          }}
        />
      )}
      {showConfirm.active && (
        <Confirm
          iconType={showConfirm.iconType}
          title={showConfirm.title}
          content={showConfirm.content}
          onClose={() => {
            setShowConfirm(initConfirmInfo);
          }}
          onConfirm={showConfirm.onConfirm}
        />
      )}
      <StyledContainer style={{ border: '1px solid red' }}>
        <Grid container direction='column' justifyContent='center' alignItems='center'>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12} sm={10} md={8} lg={7}>
              <StepNavigation
                labelArray={['查看購物車', '訂單確認', '訂單結算']}
                currentStep={1}
                disabledSteps={[3]}
                updateStep={(step) => {
                  if (step === 1) {
                    navigate('/cart')
                  } else if (step === 2) {
                    navigate('/checkout')
                  }
                  setCurrentStep(step);
                }} />
              <hr />
            </Grid>
          </Grid>

          <Grid container
            justifyContent='center'
            alignItems='center'
          >
            <Grid item xs={12} sm={10} md={8} lg={7}>
              {
                (cartState.data.products.length === 0 || cartState.data.username !== authUser?.username)
                  ? <CartIconWrapper>
                    <div>
                      <Cart2 $color={"#666666"} />
                      購物車中沒有商品
                    </div>
                    <button onClick={() => { navigate('/products') }}>立刻添加</button>
                  </CartIconWrapper>
                  : (cartState.data.products.map((item, idx) => {
                    const isDuplicate = verifyDuplicate(item.productId)
                    return <CartItem key={idx}>
                      <ProductWrapper >
                        <ProductImageContainer>
                          <Link to={`/products/${item.productNumber} `}>
                            <img src={`${import.meta.env.VITE_APIURL}/file${item.variantImage}`} alt="" />
                          </Link >
                        </ProductImageContainer>

                        <ProductInfo>
                          <span>{item.productNumber}</span>
                          <ProductName>
                            <Link to={`/products/${item.productNumber} `}>
                              {item.productName}
                            </Link >
                          </ProductName>
                          <Variant>
                            <p>{item.variantName}</p>
                            <p>{item.specificationName}</p>
                            <NumberInputWrapper>
                              <NumberInput value={item.quantity}

                                onClickFunction={(e) => { handleQuantity(e, item) }} disableCondition={cartState.loading} />
                            </NumberInputWrapper>
                          </Variant>
                          <PriceWrapper>

                            <p>單價 NT.{numberWithCommas(item.price)}</p>
                            <p>小計 NT.{numberWithCommas(item.price * item.quantity)}</p>
                          </PriceWrapper>
                        </ProductInfo>
                      </ProductWrapper>
                      <Actions>
                        <AddToLikedProductsButton
                          onClick={() => {
                            if (!isDuplicate) {
                              handleRemoveToLikedFromCart(item)
                            }
                          }}
                          $isAdded={isDuplicate}
                          disabled={isDuplicate}
                        >
                          {isDuplicate
                            ? <> <HeartTick /></>
                            : <> <HeartAdd /></>}
                        </AddToLikedProductsButton>

                        <RemoveItemButton
                          type="button"
                          onClick={() => {
                            setShowConfirm({
                              iconType: 'info',
                              title: "購物車",
                              content: `您要移除『${item.productName} ${item.variantName}』嗎？`,
                              active: true,
                              onConfirm: () => {
                                handleRemove(item)
                                setShowConfirm(initConfirmInfo)
                              }
                            });
                          }}>
                          <CloseRounded />
                        </RemoveItemButton>
                      </Actions>
                    </CartItem>
                  })
                  )
              }
            </Grid>
          </Grid>
        </Grid>
      </StyledContainer>

      <SummarizeWrapper>
        <SummarizeContainer >
          <div>
            <p>總金額(不含運費): <span>NT$ {numberWithCommas(totalAmount || 0)}</span> </p>
          </div>
          <CheckoutButton onClick={() => { navigate('/checkout') }}>結帳</CheckoutButton>
        </SummarizeContainer >
      </SummarizeWrapper >
    </>
  );
}
