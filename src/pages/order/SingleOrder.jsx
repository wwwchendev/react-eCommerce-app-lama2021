import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as Layout from '@/components/layout'
const { SEO } = Layout
import { Breadcrumb, Confirm, StyledLink, Modal } from '@/components/common'
import Icon from '@/components/icon'
const {
  More,
  DeliveryClockBox,
  DeliveryLoveBox,
  DeliveryReceipt,
  DeliveryReturnBox,
  DeliveryStorageBox,
  DeliveryTickBox,
  DeliveryTruck,
  DeliveryWrongBox,
  TimeLeft,
} = Icon
import customAxios from '@/utils/axios/customAxios'
import { xs, md, sm } from '@/components/layout/responsive'
import AccountSettingList from '../account/AccountSettingList'
import { useDispatch, useSelector } from 'react-redux'
import { AuthUserRequests } from '@/store/authUser'
import {
  numberWithCommas,
  getDateString,
  getDayString,
  getTimeString,
} from '@/utils/format.js'
import { useParams, Link } from 'react-router-dom'
import { useRef } from 'react'
import { Container, Grid } from '@material-ui/core'

const StyledContainer = styled(Container)`
  padding: 2rem 0;
  position: relative;
`

const Aside = styled(Grid)`
  ${sm({ display: 'none' })}
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const VariantInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  ${sm({
  flexDirection: 'column',
  gap: '0.5rem',
})}

  span {
    ${sm({
  display: 'none',
})}
  }
`
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  letter-spacing: 1px;
  font-size: 15px;

  thead {
    background-color: #aaa5a0;
    color: #fff;
  }

  th {
    padding: 8px;
    border: 1px solid #fff;
  }

  tbody {
    & > tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    & > :nth-last-child(3) > td {
      background-color: rgb(236, 228, 218);
      color: rgba(107, 52, 7, 0.8);
    }

    & > :nth-last-child(1) > td {
      background-color: rgb(255, 255, 255);
      border: 0;
      white-space: nowrap;
    }
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    text-align: center;
    box-sizing: border-box;
    padding: 10px 10px;
  }
`
const ImageContainer = styled.div`
  max-height: 60px;
  max-width: 60px;
  width: 100%;
  overflow: hidden;
  display: flex;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
const OrderStatus = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: #fcfbf9;
  line-height: 1.5;
  h5 {
    font-size: 30px;
    letter-spacing: 4px;
    color: #303030;
  }
  span {
    font-size: 16px;
    color: #5e5e5e;
  }
`

const IconWrapper = styled.div`
  height: 100%;
  width: 5rem;
  svg {
    height: 100%;
    width: 100%;
  }
`
const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 3rem;
  h5 {
    letter-spacing: 1px;
    font-size: 16px;
    ${sm({
  letterSpacing: '0',
  fontSize: '14px',
})}
  }
  div {
    text-align: left;
    color: #333;
    p {
      font-weight: bold;
    }
    span {
      font-size: 14px;
    }
  }
`

const Section = styled.section`
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
  line-height: 2;
  width: 100%;
  box-sizing: border-box;
  ${sm({ padding: '1rem 1rem' })}

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  input[type='radio'] {
    margin-right: 0.5rem;
  }

  h3 {
    position: absolute;
    top: -1rem;
    letter-spacing: 2px;
    background-color: #fff;
  }
  &:nth-child(1) {
    ${sm({
  borderBottom: '1px solid #bbbbbb',
  borderRadius: '0px',
  marginBottom: '1rem',
})}
  }
`

const PaymentReminder = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  color: #d31414;
  button {
    cursor: pointer;
    background: #d31414;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 8px;
    font-size: 16px;
    width: 5rem;
    &:hover {
      background-color: #fc2f2f;
      border: 1px solid #fc2f2f;
    }
    &:active {
      font-size: 15px;
    }
  }
`
const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  ${sm({
  flexDirection: 'column',
})}

  &:after {
    position: absolute;
    content: '';
    height: 100%;
    width: 1px;
    background: #bbbbbb;
    left: 50%;
    transform: translateX(50%);
    ${sm({
  display: 'none',
})}
  }
`
const CompleteOrderButton = styled.button`
  cursor: pointer;
  background: rgb(177, 147, 112);
  color: #fff;
  border: 1px solid #fff;
  border-radius: 8px;
  font-size: 16px;
  padding: 0.3rem;
  font-size: 15px;
  &:hover {
    background-color: rgb(214, 176, 133);
    border: 1px solid rgb(214, 176, 133);
  }
  &:active {
    font-size: 15px;
  }
`
const MoreWrapper = styled.div`
  position: absolute;
  top: -1rem;
  right: 0;
`
const DropdownOptions = styled.ul`
  opacity: ${p => (p.$showDropdown ? '1' : '0')};
  position: absolute;
  padding: 0;
  list-style-type: none;
  top: calc(100% - 0.25rem);
  right: 0.5rem;
  box-sizing: border-box;
  transition: opacity 0.2s ease-in-out;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: auto;

  li {
    display: block;
    white-space: nowrap;
    text-align: center;
    width: auto;
    border-bottom: 1px solid #ddd;

    &:last-child {
      border: 0;
    }

    &:hover {
      background: #fcfafa;
    }

    button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      width: 100%;
      padding: 0.75rem 1.5rem;

      &:hover {
        background: #fcfafa;
      }

      &:disabled:hover {
        background: #ffffff;
      }
    }
  }
`

const MoreButton = styled.button`
  z-index: 10;
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  svg {
    height: 100%;
    width: 100%;
  }
`
const LogisticHistoryButton = styled.button`
  z-index: 10;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #333;
  padding: 0.2rem 0.3rem;
  gap: 0.2rem;
  border-radius: 8px;
  svg {
    height: 1rem;
    width: 1rem;
  }
`
const Input = styled.input`
  flex: 1;
  padding: 8px;
  width: 60%;
  border: ${p => (p.$border ? '2px solid #ce4646' : '1px solid #999')};
  border-radius: 5px;
`

export const SingleOrder = () => {
  const navigate = useNavigate()
  //TOKEN
  const authUserState = useSelector(state => state.authUser)
  const TOKEN = authUserState.data?.accessToken
  const dispatch = useDispatch()
  //Redux
  const orderState = useSelector(state => state.order)
  //訂單資料
  const { orderNumber } = useParams()
  const [orderData, setOrderData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const totalAmount = orderData?.products?.reduce(
    (sum, item) => sum + item.amount,
    0,
  )
  const totalCount = orderData?.products?.reduce(
    (sum, item) => sum + item.quantity,
    0,
  ) //計算件數總和
  const shippingTime = orderData?.logistic?.logisticHistory?.find(
    item => item.actionType === '出貨',
  )?.time
  const deliveredTime = orderData?.logistic?.logisticHistory?.find(
    item => item.actionType === '送達',
  )?.time
  const receivedTime = orderData?.logistic?.logisticHistory?.find(
    item => item.actionType === '取貨',
  )?.time
  const replyReturnRequestTime = orderData?.logistic?.logisticHistory?.find(
    item =>
      item.actionType === '同意退貨申請' || item.actionType === '駁回退貨申請',
  )?.time
  const replyReturnRequest = orderData?.logistic?.logisticHistory?.find(
    item =>
      item.actionType === '同意退貨申請' || item.actionType === '駁回退貨申請',
  )
  const closureInfo = orderData?.logistic?.logisticHistory?.find(
    item => item.actionType === '已退貨' || item.actionType === '退貨異常',
  )

  const inputRef = useRef(null)

  const [showDropdown, setShowDropdown] = useState(false)

  //breadcrumb
  const [paths, setPaths] = useState([
    { label: '首頁', path: '/' },
    { label: '會員中心', path: '/account' },
    { label: '訂單紀錄', path: '/orders' },
    { label: `${orderNumber}`, path: `/orders/${orderNumber}` },
  ])

  const fetchOrderData = async () => {
    setLoading(true)
    try {
      const response = await customAxios.get(
        `${import.meta.env.VITE_APIURL}/order/${orderNumber}`,
        { headers: { Authorization: `Bearer ${TOKEN}` } },
      )
      const order = response.data.data
      setOrderData(order)
    } catch (error) {
      setError(error.message || '訂單資料獲取失敗。')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrderData()
  }, [TOKEN, orderNumber, authUserState.data?.username])

  const [expiredTimeCountDown, setExpiredTimeCountDown] = useState('')

  const handleCompleteOrder = async e => {
    setLoading(true)
    try {
      const data = {
        username: authUserState.data.username,
        completedAt: new Date().toISOString(),
      }

      const response = await customAxios.post(
        `${import.meta.env.VITE_APIURL}/order/complete/${orderNumber}`,
        data,
        { headers: { Authorization: `Bearer ${TOKEN}` } },
      )

      if (response.status === 200) {
        fetchOrderData()
      }
    } catch (error) {
      console.error(error)
      setError(error.message || '訂單資料更新失敗。')
    }
    setLoading(false)
  }
  const handleCancelRequest = async e => {
    setLoading(true)
    try {
      const data = {
        username: authUserState.data.username,
        status: '已取消',
        reason: inputRef.current ? inputRef.current.value : '',
        canceledAt: new Date().toISOString(),
      }

      const response = await customAxios.delete(
        `${import.meta.env.VITE_APIURL}/order/${orderNumber}`,
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
          data: data,
        },
      )

      if (response.status === 200) {
        fetchOrderData()
      }
    } catch (error) {
      setError(error.message || '取消訂單時出現錯誤。')
    }
    setLoading(false)
  }

  const handleReturnRequest = async e => {
    setLoading(true)

    try {
      const data = {
        username: authUserState.data.username,
        reason: inputRef.current ? inputRef.current.value : '',
        requestReturnAt: new Date().toISOString(),
      }

      const response = await customAxios.put(
        `${import.meta.env.VITE_APIURL}/order/returnProcessing/${orderNumber}`,
        data,
        { headers: { Authorization: `Bearer ${TOKEN}` } },
      )
      if (response.status === 200) {
        fetchOrderData()
      }
    } catch (error) {
      console.error(error)
      setError(error.message || '申請退貨時出現錯誤。')
    }
    setLoading(false)
  }

  useEffect(() => {
    const updateCountDown = () => {
      if (
        orderData?.payment?.type === '線上付款' &&
        orderData?.payment?.status === '尚未付款' &&
        orderData?.payment?.paymentExpiredTime &&
        new Date(orderData?.payment?.paymentExpiredTime) > new Date()
      ) {
        const current = new Date()
        const countDown =
          new Date(orderData?.payment.paymentExpiredTime) - current

        // 計算分鐘和秒數
        const minutes = Math.floor(countDown / 1000 / 60)
        const seconds = Math.floor((countDown / 1000) % 60)

        // 計算分鐘和秒數
        setExpiredTimeCountDown(`${minutes}:${seconds}`)
      } else {
        setExpiredTimeCountDown(null)
      }
    }

    updateCountDown()
    const interval = setInterval(updateCountDown, 1000)

    return () => clearInterval(interval)
  }, [orderData])

  const maskPhoneNumber = phoneNumber => {
    // 檢查電話號碼的長度是否為 10 位數
    if (phoneNumber?.length === 10) {
      // 將電話號碼前四位和後三位保留，中間三位替換為星號
      return phoneNumber?.slice(0, 4) + '***' + phoneNumber?.slice(7)
    } else {
      // 如果電話號碼不是 10 位數，返回原始電話號碼
      return phoneNumber
    }
  }

  const OrderStatusElement = () => {
    let title = ''
    switch (orderData?.status) {
      case '已成立':
        if (orderData?.logistic?.status === '待出貨') {
          title = '待出貨'
        } else {
          title = '訂單已成立'
        }
        break
      case '已出貨':
        title = '已出貨'
        break
      case '已送達':
        title = '已送達'
        break
      case '退貨作業中':
        if (orderData?.logistic?.status === '申請退貨') {
          title = '申請退貨'
        } else if (orderData?.logistic?.status === '待退貨') {
          title = '待寄回退貨商品'
        } else if (orderData?.logistic?.status === '已取貨') {
          title = '待完成'
        }
        break
      case '已取貨':
        title = '已取貨'
        break
      case '已完成':
        title = '訂單已完成'
        break
      case '已取消':
        title = '訂單已取消'
        break
      case '退貨退款':
        title = '已退貨'
        break
      case '退貨異常':
        title = '退貨異常'
        break
      default:
        break
    }

    const iconData = [
      {
        IconType: <DeliveryReceipt />,
        title: '訂單已成立',
        content: '我們將在確認訂單後迅速安排送貨',
      },
      {
        IconType: <DeliveryStorageBox />,
        title: '待出貨',
        content: '商品正在準備中，稍後將會出貨',
      },
      {
        IconType: <DeliveryTruck />,
        title: '已出貨',
        content: '您的訂單已經交付給物流公司，正在配送中',
      },
      {
        IconType: <DeliveryClockBox />,
        title: '已送達',
        content: '您的訂單已經成功送達，請查收',
      },
      {
        IconType: <DeliveryLoveBox />,
        title: '已取貨',
        content: '完成訂單前(取貨7日內)請務必檢查商品',
      },
      {
        IconType: <DeliveryTickBox />,
        title: '訂單已完成',
        content: '感謝您的購買，訂單已經完成',
      },
      {
        IconType: <DeliveryReturnBox />,
        title: '申請退貨',
        content: '您的退貨申請正在處理中，請耐心等候',
      },
      {
        IconType: <DeliveryReturnBox />,
        title: '待寄回退貨商品',
        content: '請照退貨流程寄回商品，收到商品確認後將辦理退款',
      },
      {
        IconType: <DeliveryReturnBox />,
        title: '待完成',
        content:
          '很遺憾，您的退貨申請不符合退貨政策。訂單將於取貨後7日內結案。',
      },
      {
        IconType: <DeliveryWrongBox />,
        title: '已退貨',
        content: '已完成退貨申請，商品費用將於5~7個工作日返還',
      },
      {
        IconType: <DeliveryWrongBox />,
        title: '訂單已取消',
        content: '您的訂單已經取消，如有疑問請聯繫客服',
      },
      {
        IconType: <DeliveryWrongBox />,
        title: '退貨異常',
        content:
          '退貨商品驗收異常，暫時無法退款。如有需要，請聯繫客服協助處理。',
      },
    ]

    const matchedIconData = iconData.find(item => item.title === title)
    if (!title) {
      return <OrderStatus></OrderStatus>
    }
    return (
      <OrderStatus>
        <div>
          <h5>{matchedIconData.title}</h5>
          <span>{matchedIconData.content}</span>
        </div>
        <IconWrapper>{matchedIconData.IconType}</IconWrapper>
      </OrderStatus>
    )
  }

  //Alert and Confirm
  const initConfirmInfo = {
    active: false,
    iconType: 'info',
    title: '',
    content: '',
    onConfirm: null,
  }
  const [showConfirm, setShowConfirm] = useState(initConfirmInfo)
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Layout.PageLayout>
        <SEO
          title={`訂單紀錄 | RESTART - SHOP`}
          description={null}
          url={null}
        />
        {orderState.loading && (
          <Layout.Loading
            type={'spin'}
            active={true}
            color={'#c9a388'}
            size={'160px'}
            $position={'fixed'}
          />
        )}
        {showConfirm.active && (
          <Confirm
            iconType={showConfirm.iconType}
            title={showConfirm.title}
            content={showConfirm.content}
            onClose={() => {
              setShowConfirm(initConfirmInfo)
            }}
            onConfirm={showConfirm.onConfirm}
          >
            <Input type='text' placeholder='請填寫取消原因' ref={inputRef} />
          </Confirm>
        )}
        {showModal && (
          <Modal
            open={true}
            onClose={() => {
              setShowModal(false)
            }}
            $maxWidth={'300px'}
          >
            <h3>物流紀錄</h3>
            <p>
              出貨時間:{' '}
              {shippingTime ? getDateString(new Date(shippingTime), '/') : '--'}
            </p>
            <p>
              送達時間:{' '}
              {deliveredTime
                ? getDateString(new Date(deliveredTime), '/')
                : '--'}
            </p>
            <p>
              取貨時間:{' '}
              {receivedTime ? getDateString(new Date(receivedTime), '/') : '--'}
            </p>
          </Modal>
        )}
        <StyledContainer>
          <Breadcrumb paths={paths} />

          <Grid
            container
            justifyContent='center'
          >
            <Aside item xs={12} md={2}>
              <AccountSettingList />
            </Aside>
            <Grid item xs={12} md={10} >
              {loading ? (
                <Layout.Loading
                  type={'spin'}
                  active={true}
                  color={'#c9a388'}
                  size={'160px'}
                  $position={'fixed'}
                />
              ) : (
                <>
                  <Main>
                    <OrderStatusElement />
                    <hr />
                    <Block>
                      <Section>
                        <h3>訂單詳情</h3>
                        <MoreWrapper>
                          <MoreButton
                            type='button'
                            onClick={() => {
                              setShowDropdown(p => !p)
                            }}
                          >
                            <More />
                          </MoreButton>
                          <DropdownOptions $showDropdown={showDropdown}>
                            <li>
                              <button
                                onClick={() => {
                                  navigate(`/payment/${orderData?.orderNumber}`)
                                }}
                                disabled={!expiredTimeCountDown}
                              >
                                立即付款
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => {
                                  setShowConfirm({
                                    active: true,
                                    iconType: 'info',
                                    title: `填寫取消原因`,
                                    content: ``,
                                    onConfirm: () => {
                                      handleCancelRequest()
                                      setShowConfirm(initConfirmInfo)
                                    },
                                  })
                                  setShowDropdown(false)
                                }}
                                disabled={
                                  !(
                                    orderData?.status === '已成立' &&
                                    orderData?.logistic?.status === '待確認'
                                  )
                                }
                              >
                                取消訂單
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => {
                                  setShowConfirm({
                                    active: true,
                                    iconType: 'info',
                                    title: `填寫申請退貨原因`,
                                    content: ``,
                                    onConfirm: () => {
                                      handleReturnRequest()
                                      setShowConfirm(initConfirmInfo)
                                    },
                                  })
                                  setShowDropdown(false)
                                }}
                                disabled={orderData?.status !== '已取貨'}
                              >
                                申請退貨
                              </button>
                            </li>
                          </DropdownOptions>
                        </MoreWrapper>

                        <p>訂單編號: {orderData?.orderNumber}</p>
                        <p>訂單狀態: {orderData?.status}</p>
                        <p>
                          訂單日期:{' '}
                          {getDateString(new Date(orderData?.createdAt), '/')}
                        </p>

                        {orderData?.payment?.type === '線上付款' &&
                          orderData?.payment?.status === '尚未付款' && (
                            <>
                              {expiredTimeCountDown ? (
                                <PaymentReminder>
                                  <p>請於 {expiredTimeCountDown} 前完成付款</p>
                                  <button
                                    type='button'
                                    onClick={() => {
                                      navigate(`/payment/${orderNumber}`)
                                    }}
                                  >
                                    立即付款
                                  </button>
                                </PaymentReminder>
                              ) : (
                                <PaymentReminder>
                                  因超過付款時限 如需購買請重新訂購
                                </PaymentReminder>
                              )}
                            </>
                          )}

                        {(orderData?.status === '已取貨' ||
                          (orderData?.status === '退貨作業中' &&
                            orderData?.logistic?.status === '已取貨')) && (
                            <div>
                              <p>
                                已於 {getDateString(new Date(receivedTime), '/')}{' '}
                                取貨
                              </p>
                              <CompleteOrderButton
                                type='button'
                                onClick={handleCompleteOrder}
                              >
                                完成訂單
                              </CompleteOrderButton>
                            </div>
                          )}

                        {orderData?.completedAt && (
                          <p>
                            完成時間:{' '}
                            {getDateString(
                              new Date(orderData?.completedAt),
                              '/',
                            )}
                          </p>
                        )}

                        {orderData?.canceledAt && (
                          <>
                            <p>
                              取消時間:{' '}
                              {orderData?.canceledAt
                                ? getDateString(
                                  new Date(orderData?.canceledAt),
                                  '/',
                                )
                                : '--'}
                            </p>
                            <p>{orderData?.cancelReason}</p>
                          </>
                        )}
                        {orderData?.requestReturnAt && (
                          <>
                            <p>
                              申請退貨時間:{' '}
                              {orderData?.requestReturnAt
                                ? getDateString(
                                  new Date(orderData?.requestReturnAt),
                                  '/',
                                )
                                : '--'}
                            </p>
                            <p>{orderData?.requestReturnReason}</p>
                            <b>
                              申請退貨結果:{' '}
                              {replyReturnRequestTime ? (
                                <>
                                  {`${getDateString(new Date(replyReturnRequestTime))} `}
                                  {replyReturnRequest.actionType ===
                                    '同意退貨申請' ? (
                                    <>
                                      已同意{' '}
                                      <StyledLink
                                        $color='#b94545'
                                        to='/about?type=afterSales'
                                        target='_blank'
                                      >
                                        商品寄回流程
                                      </StyledLink>
                                    </>
                                  ) : (
                                    <>{`不符合退貨標準 ${replyReturnRequest.memo}`}</>
                                  )}
                                </>
                              ) : (
                                '--'
                              )}
                            </b>
                          </>
                        )}

                        {closureInfo?.time && <p>結案時間: {getDateString(new Date(closureInfo?.time), '/')} {closureInfo?.actionType}</p>}

                        {closureInfo?.memo && <p>{closureInfo?.memo} </p>}
                      </Section>
                      <Section>
                        <h3>運送資訊</h3>
                        <p>付款方式: {orderData?.logistic?.option} </p>
                        <div>
                          <p>物流狀態: {orderData?.logistic?.status}</p>
                          {shippingTime && (
                            <LogisticHistoryButton
                              type='button'
                              onClick={() => {
                                setShowModal(true)
                              }}
                            >
                              <TimeLeft />
                              紀錄
                            </LogisticHistoryButton>
                          )}
                        </div>

                        {orderData?.logistic?.deliveryCompany
                          ?.receiptNumber && (
                            <p>
                              物流編號:{' '}
                              {
                                orderData?.logistic?.deliveryCompany
                                  ?.receiptNumber
                              }{' '}
                            </p>
                          )}
                        {orderData?.logistic?.option !== '宅配到府' && (
                          <>
                            <p>
                              超商店號:{' '}
                              {
                                orderData?.logistic?.address?.convenienceStore
                                  ?.storeId
                              }{' '}
                              {
                                orderData?.logistic?.address?.convenienceStore
                                  ?.storeName
                              }
                            </p>
                            <p>
                              超商門市地址:{' '}
                              {orderData?.logistic?.address?.zipcode}
                              {orderData?.logistic?.address?.county}
                              {orderData?.logistic?.address?.district}
                              {orderData?.logistic?.address?.address}
                            </p>
                          </>
                        )}
                        {orderData?.logistic?.option === '宅配到府' && (
                          <>
                            <p>
                              配送地點: {orderData?.logistic?.address?.zipcode}
                              {orderData?.logistic?.address?.county}
                              {orderData?.logistic?.address?.district}
                              {orderData?.logistic?.address?.address}
                            </p>
                          </>
                        )}

                        <p>
                          收件人: {orderData?.logistic?.receiver?.receiverName}{' '}
                        </p>
                        <p>
                          收件人電話:{' '}
                          {maskPhoneNumber(
                            orderData?.logistic?.receiver?.receiverMobileNumber,
                          )}
                        </p>
                        <p>備註事項: {orderData?.memo}</p>
                      </Section>
                    </Block>
                    <hr />
                    <Block>
                      <Section>
                        <h3>顧客資訊</h3>
                        <p>
                          姓名: {orderData?.userInfo?.lastName}
                          {orderData?.userInfo?.firstName}
                        </p>
                        <p>信箱: {orderData?.userInfo?.email}</p>
                        <p>電話: {maskPhoneNumber(orderData?.userInfo?.mobile)}</p>
                      </Section>
                      <Section>
                        <h3>付款資訊</h3>
                        <p>
                          付款方式: {orderData?.payment?.type}
                          {orderData?.payment?.option &&
                            `- ${orderData?.payment?.option}`}
                        </p>
                        <p>付款狀態: {orderData?.payment?.status}</p>
                        <p>
                          付款日期:{' '}
                          {orderData?.payment?.paidAt
                            ? getDateString(
                              new Date(orderData?.payment?.paidAt),
                              '/',
                            )
                            : '--'}
                        </p>
                        <p>發票類型: {orderData?.payment?.invoice?.type}</p>
                        {orderData?.payment?.invoice?.type === '發票載具' && (
                          <p>
                            發票載具類型:{' '}
                            {orderData?.payment?.invoice?.carrierNumber}
                          </p>
                        )}
                      </Section>
                    </Block>
                    <Table>
                      <thead>
                        <tr>
                          <th scope='col' width='40%'>
                            商品資訊
                          </th>
                          <th scope='col' width='20%'>
                            規格
                          </th>
                          <th scope='col' width='12.5%'>
                            單價
                          </th>
                          <th scope='col' width='12.5%'>
                            數量
                          </th>
                          <th scope='col' width='15%'>
                            小計
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderData?.products?.map((product, index) => {
                          return (
                            <tr key={index}>
                              <td data-cell='商品資訊'>
                                <ProductWrapper>
                                  <ImageContainer>
                                    <img
                                      src={`${import.meta.env.VITE_APIURL}/file${product?.variantImage}`}
                                      alt=''
                                    />
                                  </ImageContainer>
                                  <div>
                                    <span>{product?.productNumber}</span>
                                    <h5>{product?.productName}</h5>
                                  </div>
                                </ProductWrapper>
                              </td>
                              <td data-cell='規格'>
                                <VariantInfo>
                                  <p>{product?.variantName}</p>
                                  <span>,</span>
                                  <p>{product?.specificationName}</p>
                                </VariantInfo>
                              </td>
                              <td data-cell='單價'>
                                {numberWithCommas(product?.discountedPrice)}
                              </td>
                              <td>{product?.quantity}</td>
                              <td>{numberWithCommas(product?.amount)}</td>
                            </tr>
                          )
                        })}
                        <tr>
                          <td colSpan='3'>訂單合計</td>
                          <td>{totalCount}</td>
                          <td>{numberWithCommas(totalAmount || 0)}</td>
                        </tr>
                        <tr>
                          <td colSpan='3'>物流費用</td>

                          <td></td>
                          <td>{orderData?.logistic?.fee}</td>
                        </tr>
                        <tr>
                          <td colSpan='3'>應付金額</td>
                          <td></td>
                          <td>
                            NT.{' '}
                            {numberWithCommas(
                              totalAmount + orderData?.logistic?.fee || 0,
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Main>
                </>
              )}
            </Grid>
          </Grid>
        </StyledContainer>
      </Layout.PageLayout>
    </>
  )
}
