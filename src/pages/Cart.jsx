import { PageLayout } from '@/components'

import { Add, Remove } from '@material-ui/icons'
import styled from 'styled-components'

import { mobile } from '@/utils/responsive'
import { numberWithCommas } from '@/utils/format'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

// 版型布局
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
// 通用
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`

// 頂部: 繼續購物, 下次再買, 願望清單, 立即結帳
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === 'filled' && 'none'};
  background-color: ${props =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${props => props.type === 'filled' && 'white'};
`
const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`
// 主要內容
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`
// 購物車商品
const Info = styled.div`
  flex: 3;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`
const Image = styled.img`
  width: 200px;
  cursor: pointer;
`
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.$color};
`
const ProductSize = styled.span``

// 商品價格
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({
    width: '50%',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginBottom: '10px',
    justifyContent: 'space-between',
  })}
`
// 商品數量
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  ${mobile({
    marginRight: '30px',
    marginBottom: '0px',
  })}
`
const ProductAmount = styled.input.attrs({ type: 'number' })`
  font-size: 24px;
  margin: 5px;
  width: 50px;
  text-align: center;
  ${mobile({ margin: '0px' })}
`
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`

// 訂單摘要
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  min-height: 50vh;
`
const SummaryTitle = styled.h1`
  font-weight: 200;
`
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.$type === 'total' && '500'};
  font-size: ${props => props.$type === 'total' && '24px'};
`
const SummaryItemText = styled.span``
const SummaryItemCouponWrapper = styled.span`
  display: flex;
`
const SummaryItemInput = styled.input``
const SummaryItemPrice = styled.span``
const Img = styled.img``

export const Cart = () => {
  const cart = useSelector(state => state.cart)
  // console.log(cart)
  return (
    <PageLayout>
      <Wrapper>
        <Title>購物車</Title>
        <Top>
          <TopButton>繼續購物</TopButton>
          <TopTexts>
            <TopText>購物車內的商品({cart.quantity})</TopText>
            <TopText>願望清單(0)</TopText>
          </TopTexts>
          <TopButton type='filled'>立即結帳</TopButton>
        </Top>
        <Bottom>
          {cart.products.length === 0 ? (
            <Info>
              <Img src={'/images/empty/cartEmpty.png'} />
              <p>購物車尚無商品</p>
            </Info>
          ) : (
            <Info>
              {cart.products.map((p, idx) => {
                return (
                  <Product key={idx}>
                    <ProductDetail>
                      <Link to={`/product/${p._id}`}>
                        <Image src={p.img} />
                      </Link>
                      <Details>
                        <ProductName>
                          <b>{p.title}</b>
                        </ProductName>
                        <ProductId>
                          <span>
                            <b>商品編號 </b>
                            {p._id}
                          </span>
                        </ProductId>
                        <ProductSize>
                          <b>款式</b> {p.selectedOption.style}
                          {' | '}
                          <b>尺寸</b> {p.selectedOption.size}
                        </ProductSize>
                        <ProductSize>
                          {' '}
                          $ {numberWithCommas(p.price)}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Remove />
                        <ProductAmount defaultValue={p.quantity} />
                        <Add />
                      </ProductAmountContainer>

                      <ProductPrice>
                        $ {numberWithCommas(p.price * p.quantity)}{' '}
                      </ProductPrice>
                    </PriceDetail>
                    <Hr />
                  </Product>
                )
              })}
            </Info>
          )}
          <Summary>
            <SummaryTitle>訂單摘要</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>商品合計</SummaryItemText>
              <SummaryItemPrice>
                $ {numberWithCommas(cart.total)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>運費</SummaryItemText>
              <SummaryItemPrice>$ {numberWithCommas(49)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>運費折抵</SummaryItemText>
              <SummaryItemPrice>$ {numberWithCommas(49)}</SummaryItemPrice>
            </SummaryItem>
            <Hr />
            <SummaryItem>
              <SummaryItemText>優惠券</SummaryItemText>
              <SummaryItemCouponWrapper>
                <SummaryItemInput />
                <Button>新增</Button>
              </SummaryItemCouponWrapper>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText> </SummaryItemText>
              <SummaryItemPrice>-0.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem $type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                $ {numberWithCommas(cart.total)}
              </SummaryItemPrice>
            </SummaryItem>
            <Button>立即結帳</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </PageLayout>
  )
}
