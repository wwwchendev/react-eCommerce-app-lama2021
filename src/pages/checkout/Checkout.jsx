import { useEffect, useState } from 'react'
import * as Layout from '@/components/layout'
const { SEO } = Layout
import styled from 'styled-components'
import {
  StepNavigation,
  NumberInput,
  Alert,
  Confirm,
} from '@/components/common'

import { xs, md, sm } from '@/components/layout/responsive'
import Icon from '@/components/icon'
const { CheckBlank, CheckSquare } = Icon
import { useDispatch, useSelector } from 'react-redux'
import { cartRequests, clearCartError } from '@/store/cart'
import { numberWithCommas } from '@/utils/format.js'
import { Link, useNavigate } from 'react-router-dom'
import { orderRequests } from '@/store/order'
import { Container, Grid } from '@material-ui/core'

// Layout
const StyledContainer = styled(Container)`
  padding: 8rem 0 2rem 0;
  position: relative;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1.5rem;
`

//通用
const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  ${xs({ flexDirection: 'column' })};
`
const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  label {
    min-width: 4rem;
    text-align: justify;
  }
`
const Field = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`
const RadioWrapper = styled.div`
  width: 7rem;
`
const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 0;
  p {
    min-width: 5rem;
  }
  select,
  input[type='text'],
  textarea {
    max-width: 100%;
    width: 100%;
    padding: 0.5rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #999;
  }
`
const Input = styled.input`
  max-width: 100%;
  padding: 0.5rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #999;
`

//訂單詳情
const TableContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  max-height: 360px;
  overflow-y: auto;
  position: relative;
  ${sm({ padding: '0.5rem' })}

  h3 {
    position: absolute;
    top: -1rem;
    letter-spacing: 2px;
    background-color: #fff;
  }
`
const Th = styled.th`
  background-color: #dad5d1;
  padding: 0.5rem 0;
  position: sticky;
  top: 0;
  width: ${p => p.width || 'auto'};
  background-color: #e4e0df;
  &:nth-child(2) {
    ${sm({ display: 'none' })}
  }
`
const Table = styled.table`
  width: 100%;
  max-width: 100%;
  line-height: 1.5;

  thead {
    width: 100%;
    ${sm({ display: 'none' })}
  }

  tr {
    ${sm({
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5rem 0rem',
})}
  }

  td {
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      text-align: center;
      font-size: 1rem;
      ${sm({
  display: 'none',
})}
    }

    &::before {
      content: attr(data-label);
      display: none;
      position: absolute;
      ${sm({
  display: 'block',
  fontWeight: 'bold',
  width: '6rem',
  letterSpacing: '2px',
})}
      text-align: justify;
    }
  }
`
const ProductImageContainer = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${sm({ width: '100%', height: 'auto' })}
  }
`
const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  line-height: 1.5;

  a {
    display: block;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    color: #4e4e4e;
    ${sm({ fontSize: '20px' })}
  }

  span {
    font-size: 14px;
    color: #aaa;
  }
  h5 {
    letter-spacing: 1px;
    font-size: 1.1rem;
  }

  ${sm({ alignItems: 'center', textAlign: 'left' })}
`
const VariantWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${sm({ justifyContent: 'flex-end' })}
`
const SmInfoWrapper = styled.div`
  display: none;
  font-size: 1rem;

  div {
    display: flex;
    gap: 1rem;
  }
  ${sm({
  display: 'flex',
  flexDirection: 'column',
})}
`
// Sections
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
    letter-spacing: 2px;
    background-color: #fff;
  }
`
//訂單詳情
const OrderDetails = styled(Section)``
//1.收貨資訊
const ShippingMethod = styled(Section)``
const HomeDeliveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border: 1px solid #bbaaaa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  p {
    min-width: 5rem;
  }
`
const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  ${Row} {
    gap: '1rem';
  }
`
//2.支付方式
const PaymentMethod = styled(Section)``
//3.發票開立方式
const InvoiceMethod = styled(Section)``

//側邊明細
const TotalAmount = styled(Section)`
  background-color: #fdfdfd;
  position: sticky;
  top: 100px;
  margin-top: 1.5rem;
`
const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 0.5rem;
`
const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
  * {
    &:nth-child(1) {
      font-weight: bold;
      color: #575757;
    }
  }
  &:nth-child(1),
  &:nth-child(3) {
    span {
      color: #d31414;
      font-weight: bolder;
      font-size: 24px;
      margin-right: 4px;
    }
  }
  &:nth-child(3) {
    p {
      font-weight: bold;
      color: #0e0e0e;
    }
  }
`
const IconWrapper = styled.div`
  height: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  svg {
    height: 100%;
  }
`
const AgreementWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  word-wrap: wrap;
  gap: 0.25rem;
  ${IconWrapper} {
    margin-top: 8px;
  }
`
const CheckoutButton = styled.button`
  padding: 0.5rem 2rem;
  display: block;
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

  ${sm({ maxWidth: '400px' })}
  border: 5px solid blue;
  background-color: #810909;
  border: 0;
  color: #ffffff;
  width: 100%;
`

const LoadingContainer = styled.div`
  position: fixed;
  top: 90px;
  z-index: 500;
  width: 100%;
  height: 100%;
`

export const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //TOKEN
  const authUserState = useSelector(state => state.authUser)
  const TOKEN = authUserState.data?.accessToken
  //Redux
  const cartState = useSelector(state => state.cart)
  const orderState = useSelector(state => state.order)
  //訂單資訊
  const [cartItems, setCartItems] = useState(null)
  const totalAmount = cartState.data?.products?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const totalCount = cartState.data?.products?.reduce(
    (sum, item) => sum + item.quantity,
    0,
  ) //計算件數總和
  useEffect(() => {
    if (!cartItems) {
      dispatch(cartRequests.get(TOKEN, authUserState.data?.username))
      setCartItems(cartState.data.products)
    }
  }, [])

  //表單管理
  const initialFormData = {
    username: authUserState.data?.username,
    status: '未成立',
    products: cartState.data?.products || [],
    productSubtotal: totalAmount,
    logistic: {
      option: '',
      fee: 0,
      address: {
        option: '',
        zipcode: '',
        county: '',
        district: '',
        address: '',
        convenienceStore: {
          storeName: '',
          storeId: '',
        },
      },
      receiver: {
        receiverName: '',
        receiverMobileNumber: '',
      },
    },
    shippingDiscount: 0,
    total: 0,
    payment: {
      status: '尚未付款',
      type: '',
      option: '',
      invoice: {
        type: '',
        carrierNumber: '',
      },
    },
    memo: '',
  }
  const [form, setForm] = useState(initialFormData)

  const handleFormChange = e => {
    const { name, value, type } = e.target

    if (name === 'logisticOption') {
      let shippingFee
      switch (value) {
        case '宅配到府':
          shippingFee = 150
          break
        case '超商取貨-711':
          shippingFee = 45
          break
        case '超商取貨-全家':
          shippingFee = 45
          break
        default:
          return
      }
      setForm(prev => ({
        ...prev,
        logistic: {
          ...prev.logistic,
          option: value,
          fee: parseInt(shippingFee),
          address: {
            option: value === '宅配到府' ? '' : 'anotherAddress',
            zipcode: '',
            county: '',
            district: '',
            address: '',
            convenienceStore: {
              storeName: '',
              storeId: '',
            },
          },
        },
        total: prev.productSubtotal + shippingFee,
      }))
      return
    }
    if (name === 'homeDeliveryOption') {
      let addressData
      if (value === 'defaultAddress') {
        addressData = {
          option: 'defaultAddress',
          zipcode: authUserState.data?.address?.zipcode,
          county: authUserState.data?.address?.county,
          district: authUserState.data?.address?.district,
          address: authUserState.data?.address?.address,
        }
      } else {
        addressData = {
          option: 'anotherAddress',
          zipcode: '',
          county: '',
          district: '',
          address: '',
          convenienceStore: {
            storeName: '',
            storeId: '',
          },
        }
      }
      setForm(prevState => ({
        ...prevState,
        logistic: {
          ...prevState.logistic,
          address: addressData,
        },
      }))
      return
    }
    if (
      name === 'zipcode' ||
      name === 'county' ||
      name === 'district' ||
      name === 'address' ||
      name === 'convenienceStore'
    ) {
      if (form.logistic?.option === '宅配到府') {
        setForm(prevState => ({
          ...prevState,
          logistic: {
            ...prevState.logistic,
            address: {
              ...prevState.logistic.address,
              [name]: value,
            },
          },
        }))
        return
      } else {
        //超商取貨
        setForm(prev => ({
          ...prev,
          logistic: {
            ...prev.logistic,
            address: {
              ...prev.logistic.address,
              option: 'anotherAddress',
              [name]: value,
            },
          },
        }))
        if (name === 'district') {
          setForm(prev => ({
            ...prev,
            logistic: {
              ...prev.logistic,
              address: {
                ...prev.logistic.address,
                zipcode: '111',
              },
            },
          }))
        }
        if (name === 'convenienceStore') {
          setForm(prev => ({
            ...prev,
            logistic: {
              ...prev.logistic,
              address: {
                ...prev.logistic.address,
                address: '大北路14號16號1樓',
                convenienceStore: {
                  storeName: '文林門市',
                  storeId: value,
                },
              },
            },
          }))
        }
        return
      }
    }
    if (name === 'receiverName' || name === 'receiverMobileNumber') {
      setForm(prevState => ({
        ...prevState,
        logistic: {
          ...prevState.logistic,
          receiver: {
            ...prevState.logistic.receiver,
            [name]: value,
          },
        },
      }))
      return
    }
    if (name === 'payment') {
      setForm(prev => ({
        ...prev,
        payment: {
          ...prev.payment,
          type: value,
        },
      }))
      return
    }
    if (name === 'invoiceOption') {
      setForm(prev => ({
        ...prev,
        payment: {
          ...prev.payment,
          invoice: {
            type: value,
            carrierNumber: '',
          },
        },
      }))
      return
    }
    if (name === 'carrierNumber') {
      setForm(prev => ({
        ...prev,
        payment: {
          ...prev.payment,
          invoice: {
            ...prev.payment.invoice,
            carrierNumber: value,
          },
        },
      }))
      return
    }

    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }))
    return
  }

  //handleSubmit
  const handleSubmit = () => {
    const {
      username,
      status,
      products,
      productSubtotal,
      logistic,
      shippingDiscount,
      total,
      payment,
      memo,
    } = form
    const { address, receiver } = logistic

    const structuredProducts = products.map((item, index) => {
      return {
        productId: item.productId,
        productNumber: item.productNumber,
        productName: item.productName,
        variantId: item.variantId,
        variantName: item.variantName,
        specificationId: item.specificationId,
        specificationName: item.specificationName,
        discountedPrice: item.price,
        quantity: item.quantity,
      }
    })

    const data = {
      username: username,
      status: '已成立',
      products: structuredProducts,
      productSubtotal: productSubtotal,
      logistic: {
        option: logistic.option,
        fee: logistic.fee,
        address: {
          zipcode: address?.zipcode,
          county: address?.county,
          district: address?.district,
          address: address?.address,
          convenienceStore: {
            storeName: address?.convenienceStore?.storeName,
            storeId: address?.convenienceStore?.storeId,
          },
        },
        receiver: {
          receiverName: receiver.receiverName,
          receiverMobileNumber: receiver.receiverMobileNumber,
        },
      },
      shippingDiscount: shippingDiscount,
      total: total,
      payment: {
        status: payment.status,
        type: payment.type,
        option: payment.option,
        invoice: {
          type: payment.invoice.type,
          carrierNumber: payment.invoice.carrierNumber,
        },
      },
      memo: memo,
    }

    //新增訂單
    setOperateType('createOrder')
    dispatch(orderRequests.add(TOKEN, data))
  }
  //根據當前操作類型顯示Alert或Confirm元件
  const [operateType, setOperateType] = useState('')

  useEffect(() => {
    if (operateType === 'createOrder') {
      if (orderState.error === null) {
        //跳訂單成立通知
        // setShowAlert({
        //   iconType: 'success',
        //   title: '訂單已成立',
        //   content: `請於期限(${getExporedTime()})前完成付款，逾期將自動取消訂單，感謝您的支持`,
        //   active: true,
        // });

        //清空購物車中的商品
        setOperateType('clearCartItems')
        dispatch(
          cartRequests.clearAllCartItems(TOKEN, authUserState.data.username),
        )
      } else {
        alert('新增時出現錯誤')
      }
    }

    if (operateType === 'clearCartItems') {
      if (cartState.error === null) {
        setOperateType('')
        const orderNumber = orderState.data[0]?.orderNumber
        navigate(`/payment/${orderNumber}`)
      }
    }
  }, [orderState.data, cartState.data, orderState.error, cartState.error])

  //TodoList
  const [completedTodo, setCompletedTodo] = useState({
    orderDetails: true,
    shippingMethod: false,
    paymentMethod: false,
    invoiceMethod: false,
    agreement: false,
  })
  const checkAllComplete = () => {
    return Object.values(completedTodo).every(status => status === true)
  }
  useEffect(() => {
    if (
      form.logistic?.receiver?.receiverName !== '' &&
      form.logistic?.receiver?.receiverMobileNumber !== ''
    ) {
      if (
        form.logistic?.option === '超商取貨-全家' ||
        form.logistic?.option === '超商取貨-711'
      ) {
        if (
          !form.logistic?.address?.convenienceStore?.storeName ||
          !form.logistic?.address?.convenienceStore?.storeId
        ) {
          setCompletedTodo(p => ({ ...p, shippingMethod: false }))
          return
        }
      }
      if (
        !form.logistic?.address?.zipcode ||
        !form.logistic?.address?.county ||
        !form.logistic?.address?.district ||
        !form.logistic?.address?.address
      ) {
        setCompletedTodo(p => ({ ...p, shippingMethod: false }))
        return
      } else {
        setCompletedTodo(p => ({ ...p, shippingMethod: true }))
      }
    } else {
      setCompletedTodo(p => ({ ...p, shippingMethod: false }))
    }

    if (form.payment.type !== '') {
      setCompletedTodo(p => ({ ...p, paymentMethod: true }))
    } else {
      setCompletedTodo(p => ({ ...p, paymentMethod: false }))
    }

    if (form.payment?.invoice?.type !== '') {
      if (
        form.payment?.invoice?.type === '發票載具' &&
        form.payment?.invoice?.carrierNumber === ''
      ) {
        setCompletedTodo(p => ({ ...p, invoiceMethod: false }))
        return
      }
      setCompletedTodo(p => ({ ...p, invoiceMethod: true }))
    } else {
      setCompletedTodo(p => ({ ...p, invoiceMethod: false }))
    }
  }, [form])

  //Alert and Confirm
  const initAlertInfo = {
    active: false,
    iconType: 'info',
    title: '',
    content: '',
  }
  const [showAlert, setShowAlert] = useState(initAlertInfo)

  return (
    <>
      <SEO title='訂單確認 | RESTART-SHOP' description={null} url={null} />

      {(cartState.loading || orderState.loading) && (
        <LoadingContainer>
          <Layout.Loading
            type={'spin'}
            active={true}
            color={'#c9a388'}
            size={'160px'}
            $position={'fixed'}
          />
        </LoadingContainer>
      )}
      {showAlert.active && (
        <Alert
          iconType={showAlert.iconType}
          title={showAlert.title}
          content={showAlert.content}
          onClose={() => {
            setShowAlert(initAlertInfo)
          }}
        />
      )}
      <StyledContainer style={{ border: '1px solid red' }}>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12} sm={10} md={8} lg={7}>
              <StepNavigation
                labelArray={['查看購物車', '訂單確認', '訂單結算']}
                currentStep={2}
                disabledSteps={[3]}
                updateStep={step => {
                  if (step === 1) {
                    navigate('/cart')
                  } else if (step === 2) {
                    navigate('/checkout')
                  }
                }}
              />
              <hr />
            </Grid>
          </Grid>

          <Grid container justifyContent='center' spacing={3}>
            <Grid item xs={12} lg={8}>
              <Main>
                <OrderDetails>
                  <h3>訂單詳情</h3>
                  <TableContainer>
                    <Table>
                      <thead>
                        <tr>
                          <Th scope='col' width='45%'>
                            商品資訊
                          </Th>
                          <Th scope='col' width='20%'>
                            規格
                          </Th>
                          <Th scope='col' width='10%'>
                            售價
                          </Th>
                          <Th scope='col' width='10%'>
                            數量
                          </Th>
                          <Th scope='col' width='15%'>
                            合計
                          </Th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartState.data.products.map((item, idx) => (
                          <tr key={idx}>
                            <td>
                              <ProductInfo>
                                <Link to={`/products/${item.productNumber} `}>
                                  <ProductImageContainer>
                                    <img
                                      src={`${import.meta.env.VITE_APIURL}/file${item.variantImage}`}
                                      alt=''
                                    />
                                  </ProductImageContainer>
                                </Link>
                                <div>
                                  <span>{item.productNumber}</span>
                                  <Link to={`/products/${item.productNumber}`}>
                                    <h5>{item.productName}</h5>
                                  </Link>

                                  <SmInfoWrapper>
                                    <p>
                                      {item.variantName}{' '}
                                      {item.specificationName}
                                    </p>
                                    <div>
                                      <p>
                                        單價 NT.{numberWithCommas(item.price)}
                                      </p>
                                      <p>
                                        共 {numberWithCommas(item.quantity)} 件
                                      </p>
                                      <p>
                                        小計 NT.
                                        {numberWithCommas(
                                          item.price * item.quantity,
                                        )}
                                      </p>
                                    </div>
                                  </SmInfoWrapper>
                                </div>
                              </ProductInfo>
                            </td>
                            <td data-label='規格'>
                              <VariantWrapper>
                                <p>規格：{item.variantName}</p>
                                <p>尺寸：{item.specificationName}</p>
                              </VariantWrapper>
                            </td>
                            <td data-label='價格'>
                              <p>{numberWithCommas(item.price)}</p>
                            </td>
                            <td data-label='數量'>{item.quantity} 件</td>
                            <td data-label='合計'>
                              <p>
                                NT $
                                {numberWithCommas(item.price * item.quantity)}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </TableContainer>
                </OrderDetails>

                <ShippingMethod>
                  <h3>1.收貨資訊</h3>
                  <Row>
                    <Col>
                      <InputWrapper>
                        <p>物流選項</p>
                        <select
                          name='logisticOption'
                          value={form.logistic.option}
                          onChange={handleFormChange}
                        >
                          <option value='' disabled={true}>
                            選擇物流配送方式
                          </option>
                          <option value='宅配到府'>宅配到府 /$150</option>
                          <option value='超商取貨-711'>
                            超商取貨-711 /$45
                          </option>
                          <option value='超商取貨-全家'>
                            超商取貨-全家 /$45
                          </option>
                        </select>
                      </InputWrapper>
                    </Col>
                  </Row>

                  {form.logistic?.option === '宅配到府' && (
                    <HomeDeliveryWrapper>
                      <Field>
                        <RadioWrapper>
                          <input
                            type='radio'
                            id='defaultAddress'
                            name='homeDeliveryOption'
                            value='defaultAddress'
                            onChange={handleFormChange}
                            checked={
                              form.logistic?.option === '宅配到府' &&
                              form.logistic?.address?.option ===
                              'defaultAddress'
                            }
                          />
                          <label htmlFor='defaultAddress'>預設地址 </label>
                        </RadioWrapper>
                        <Row>
                          <Col>
                            <Input
                              type='text'
                              disabled={true}
                              value={`${authUserState.data?.address?.zipcode}${authUserState.data?.address?.county}${authUserState.data?.address?.district}${authUserState.data?.address?.address}`}
                            />
                          </Col>
                        </Row>
                      </Field>
                      <Field>
                        <RadioWrapper>
                          <input
                            type='radio'
                            id='anotherAddress'
                            name='homeDeliveryOption'
                            value='anotherAddress'
                            onChange={handleFormChange}
                            checked={
                              form.logistic?.option === '宅配到府' &&
                              form.logistic?.address?.option ===
                              'anotherAddress'
                            }
                          />
                          <label htmlFor='anotherAddress'>指定地址 </label>
                        </RadioWrapper>
                        <AddressWrapper>
                          <Row>
                            <Col>
                              <Row>
                                <Col>
                                  <Input
                                    type='text'
                                    name='zipcode'
                                    placeholder='郵遞區號'
                                    value={
                                      form.logistic?.address?.option ===
                                        'anotherAddress'
                                        ? form.logistic?.address?.zipcode
                                        : ''
                                    }
                                    onChange={handleFormChange}
                                    disabled={
                                      form.logistic?.address?.option ===
                                      'defaultAddress'
                                    }
                                  />
                                </Col>
                                <Col>
                                  <Input
                                    type='text'
                                    name='county'
                                    placeholder='縣市'
                                    value={
                                      form.logistic?.address?.option ===
                                        'anotherAddress'
                                        ? form.logistic?.address?.county
                                        : ''
                                    }
                                    onChange={handleFormChange}
                                    disabled={
                                      form.logistic?.address?.option ===
                                      'defaultAddress'
                                    }
                                  />
                                </Col>
                                <Col>
                                  <Input
                                    type='text'
                                    name='district'
                                    placeholder='鄉鎮市區'
                                    value={
                                      form.logistic?.address?.option ===
                                        'anotherAddress'
                                        ? form.logistic?.address?.district
                                        : ''
                                    }
                                    onChange={handleFormChange}
                                    disabled={
                                      form.logistic?.address?.option ===
                                      'defaultAddress'
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Input
                                    type='text'
                                    name='address'
                                    placeholder='路段巷弄號碼'
                                    value={
                                      form.logistic?.address?.option ===
                                        'anotherAddress'
                                        ? form.logistic?.address?.address
                                        : ''
                                    }
                                    onChange={handleFormChange}
                                    disabled={
                                      form.logistic?.address?.option ===
                                      'defaultAddress'
                                    }
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </AddressWrapper>
                      </Field>
                    </HomeDeliveryWrapper>
                  )}

                  {(form.logistic?.option === '超商取貨-711' ||
                    form.logistic?.option === '超商取貨-全家') && (
                      <HomeDeliveryWrapper>
                        <Field>
                          <p>選擇門市</p>
                          <AddressWrapper>
                            <Row>
                              <Col>
                                <Row>
                                  <Col>
                                    <InputWrapper>
                                      <select
                                        name='county'
                                        value={
                                          form.logistic?.address?.option ===
                                            'anotherAddress'
                                            ? form.logistic?.address?.county
                                            : ''
                                        }
                                        onChange={handleFormChange}
                                      >
                                        <option value='' disabled={true}>
                                          選擇縣市
                                        </option>
                                        <option value='台北市'>台北市</option>
                                      </select>
                                    </InputWrapper>
                                  </Col>
                                  <Col>
                                    <InputWrapper>
                                      <select
                                        name='district'
                                        value={
                                          form.logistic?.address?.option ===
                                            'anotherAddress'
                                            ? form.logistic?.address?.district
                                            : ''
                                        }
                                        onChange={handleFormChange}
                                        disabled={!form.logistic?.address?.county}
                                      >
                                        <option value='' disabled={true}>
                                          選擇區域
                                        </option>
                                        <option value='士林區'>士林區</option>
                                      </select>
                                    </InputWrapper>
                                  </Col>
                                  <Col>
                                    <InputWrapper>
                                      <select
                                        name='convenienceStore'
                                        value={
                                          form.logistic?.address?.option ===
                                            'anotherAddress'
                                            ? form.logistic?.address
                                              ?.convenienceStore?.storeId
                                            : ''
                                        }
                                        onChange={handleFormChange}
                                        disabled={
                                          !form.logistic?.address?.district
                                        }
                                      >
                                        <option value='' disabled={true}>
                                          選擇門市
                                        </option>
                                        <option value='240950'>
                                          240950 文林門市
                                        </option>
                                      </select>
                                    </InputWrapper>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <Input
                                      type='text'
                                      name='convenienceStoreAddress'
                                      placeholder='路段巷弄號碼'
                                      value={
                                        form.logistic?.address?.option ===
                                          'anotherAddress'
                                          ? form.logistic?.address?.address
                                          : ''
                                      }
                                      disabled={true}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </AddressWrapper>
                        </Field>
                      </HomeDeliveryWrapper>
                    )}
                  <Row>
                    <Col>
                      <InputWrapper>
                        <p>收件人</p>
                        <input
                          type='text'
                          name='receiverName'
                          value={form.logistic?.receiver.receiverName}
                          onChange={handleFormChange}
                        />
                      </InputWrapper>
                    </Col>
                    <Col>
                      <InputWrapper>
                        <p>電話</p>
                        <input
                          type='text'
                          name='receiverMobileNumber'
                          value={form.logistic?.receiver.receiverMobileNumber}
                          onChange={handleFormChange}
                        />
                      </InputWrapper>
                    </Col>
                  </Row>

                  <InputWrapper>
                    <p>備註事項</p>
                    <textarea
                      name='memo'
                      value={form.memo}
                      onChange={handleFormChange}
                    />
                  </InputWrapper>
                </ShippingMethod>

                <PaymentMethod>
                  <h3>2.支付方式</h3>
                  <div>
                    <input
                      type='radio'
                      name='payment'
                      id='線上付款'
                      value='線上付款'
                      checked={form.payment.type === '線上付款'}
                      onChange={handleFormChange}
                    />
                    <label htmlFor='線上付款'>線上付款</label>
                  </div>
                  <div>
                    <input
                      type='radio'
                      name='payment'
                      id='貨到付款'
                      value='貨到付款'
                      checked={form.payment.type === '貨到付款'}
                      onChange={handleFormChange}
                    />
                    <label htmlFor='貨到付款'>貨到付款</label>
                  </div>
                </PaymentMethod>
                <InvoiceMethod>
                  <h3>3.發票開立方式</h3>
                  <RadioWrapper>
                    <input
                      type='radio'
                      name='invoiceOption'
                      id='紙本發票'
                      value='紙本發票'
                      checked={form.payment?.invoice?.type === '紙本發票'}
                      onChange={handleFormChange}
                    />
                    <label htmlFor='紙本發票'>紙本發票</label>
                  </RadioWrapper>
                  <Field>
                    <RadioWrapper>
                      <input
                        type='radio'
                        name='invoiceOption'
                        id='發票載具'
                        value='發票載具'
                        checked={form.payment?.invoice?.type === '發票載具'}
                        onChange={handleFormChange}
                      />
                      <label htmlFor='發票載具'>發票載具</label>
                    </RadioWrapper>
                    <Input
                      type='text'
                      name='carrierNumber'
                      id=''
                      onChange={handleFormChange}
                      value={form.payment?.invoice?.carrierNumber}
                      disabled={form.payment?.invoice?.type !== '發票載具'}
                    />
                  </Field>
                </InvoiceMethod>
              </Main>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TotalAmount>
                <Subtotal>
                  <p>
                    <span>{totalCount}</span>件商品，商品金額
                  </p>
                  <p>NT$ {numberWithCommas(totalAmount)}</p>
                </Subtotal>
                <Subtotal>
                  <p>物流費用</p>
                  <p>
                    {form?.logistic?.option} NT$
                    {numberWithCommas(form?.logistic?.fee || 0)}
                  </p>
                </Subtotal>
                <Subtotal>
                  <p>總 計</p>
                  <p>
                    NT${' '}
                    <span>
                      {numberWithCommas(totalAmount + form?.logistic?.fee)}
                    </span>
                  </p>
                </Subtotal>

                <CheckList>
                  <IconWrapper>
                    {completedTodo.orderDetails ? (
                      <CheckSquare />
                    ) : (
                      <CheckBlank />
                    )}
                    <p>確認訂單商品</p>
                  </IconWrapper>
                  <IconWrapper>
                    {completedTodo.shippingMethod ? (
                      <CheckSquare />
                    ) : (
                      <CheckBlank />
                    )}
                    <p>收貨資訊</p>
                  </IconWrapper>
                  <IconWrapper>
                    {completedTodo.paymentMethod ? (
                      <CheckSquare />
                    ) : (
                      <CheckBlank />
                    )}
                    <p>支付方式</p>
                  </IconWrapper>
                  <IconWrapper>
                    {completedTodo.invoiceMethod ? (
                      <CheckSquare />
                    ) : (
                      <CheckBlank />
                    )}
                    <p>發票開立方式</p>
                  </IconWrapper>
                  <AgreementWrapper>
                    <IconWrapper
                      onClick={() => {
                        setCompletedTodo(p => ({
                          ...p,
                          agreement: !p.agreement,
                        }))
                      }}
                    >
                      {completedTodo.agreement ? (
                        <CheckSquare />
                      ) : (
                        <CheckBlank />
                      )}
                    </IconWrapper>
                    <p>
                      我同意辦理退貨時，依照restart-shop
                      <Link to='/about?type=afterSales' target='_blank'>
                        退換貨流程
                      </Link>
                      以加速退貨退款作業。
                    </p>
                  </AgreementWrapper>
                </CheckList>

                <CheckoutButton
                  onClick={handleSubmit}
                  disabled={!checkAllComplete()}
                >
                  提交訂單
                </CheckoutButton>
              </TotalAmount>
            </Grid>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  )
}
