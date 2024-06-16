import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as Layout from '@/components/layout'
const { SEO } = Layout
import { Breadcrumb } from '@/components/common'
import Icon from '@/components/icon'
const { Search } = Icon
import { md, sm } from '@/components/layout/responsive'
import AccountSettingList from '../account/AccountSettingList'
import { useDispatch, useSelector } from 'react-redux'
import { orderRequests } from '@/store/order'
import {
  numberWithCommas,
  getDayString,
  getDateString,
  getTimeString,
} from '@/utils/format.js'
import { Container, Grid } from '@material-ui/core'

const StyledContainer = styled(Container)`
  padding: 2rem 0;
  min-height: calc(100vh - 360px);
  span {
    font-size: 14px;
  }
  ${md({ padding: '1rem 0rem', gap: '1rem' })}
`

const Aside = styled(Grid)`
  ${sm({ display: 'none' })}
`

const TableContainer = styled.div`
  overflow-x: auto;
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
    ${md({
      display: 'none',
    })}
  }
  tbody {
    ${md({
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    })}
  }
  tbody tr {
    cursor: pointer;
    position: relative;
    * {
      font-weight: 500;
    }
    &:hover {
      color: rgba(107, 52, 7, 0.8);
      background-color: rgb(236, 228, 218);
    }
    &:nth-of-type(even) {
      background-color: #f3f3f3;
    }
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    text-align: center;
    padding: 8px;

    div {
      ${md({
        display: 'flex',
        gap: '0.5rem',
      })}
    }
    &::before {
      content: attr(data-cell);
      display: none;
      ${md({
        display: 'block',
        width: '8rem',
      })}
    }

    ${md({
      display: 'flex',
      alignItems: 'center',
    })}
  }
`

const NoOrderFound = styled.tr`
  td {
    height: 2rem;
    ${md({
      display: 'flex',
      justifyContent: 'center',
    })}
    &::before {
      ${md({
        display: 'none',
      })}
    }

    &:hover {
      background-color: #fff;
      color: #000;
    }
  }
`
// 样式化按钮和容器
const ButtonContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  background-color: #eeeeee;
  margin-bottom: 1rem;
  overflow-x: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    height: 8px;
  }
`

const Button = styled.button`
  flex: 1;
  white-space: nowrap;
  padding: 16px;
  border: none;
  background-color: transparent;
  color: #333;
  border-bottom: ${p => (p.$actived ? '2px solid #333' : 'none')};
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`
const OrderProductImages = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const ImageContainer = styled.div`
  overflow: hidden;
  height: 50px;
  width: 50px;
  display: flex;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ViewButton = styled(Button)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.25rem 0.5rem;
  gap: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 10px;
    height: 10px;
  }
  ${md({
    top: '100%',
    transform: 'translateY(-150%)',
  })}
`

export const Orders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authUserState = useSelector(state => state.authUser)
  const TOKEN = authUserState.data?.accessToken
  const orderState = useSelector(state => state.order)

  const reduceCalculate = (data, key) => {
    return data.reduce((sum, item) => sum + item[key], 0)
  }

  const [paths, setPaths] = useState([
    { label: '首頁', path: '/' },
    { label: '會員中心', path: '/account' },
    { label: '訂單紀錄', path: '/orders' },
  ])

  useEffect(() => {
    dispatch(orderRequests.get(TOKEN, authUserState.data?.username))
  }, [TOKEN])

  const [filterStatus, setFilterStatus] = useState('已完成')

  const filterOrders = (orders, status) => {
    if (status === '所有訂單') return orders
    return orders.filter(order => {
      switch (status) {
        case '待付款':
          return (
            order.status === '已成立' && order.payment.status === '尚未付款'
          )
        case '待出貨':
          return order.status === '已成立' && order.payment.status === '已付款'
        case '待取貨':
          return order.status === '已出貨' || order.status === '已送達'
        case '已取貨':
          return order.status === '已取貨'
        case '已完成':
          return order.status === '已完成'
        case '取消':
          return order.status === '已取消'
        case '退貨退款':
          return (
            order.status === '退貨作業中' ||
            order.status === '退貨退款' ||
            order.status === '退貨異常'
          )
        default:
          return true
      }
    })
  }

  const filteredOrders = filterOrders(orderState.data, filterStatus)

  return (
    <Layout.PageLayout>
      <SEO title={`訂單紀錄 | RESTART - SHOP`} description={null} url={null} />

      <StyledContainer>
        <Breadcrumb paths={paths} />
        <Grid container justifyContent='center'>
          <Aside item xs={12} md={2}>
            <AccountSettingList />
          </Aside>

          <Grid item xs={12} md={10}>
            {orderState.loading ? (
              <Layout.Loading
                type={'spin'}
                active={true}
                color={'#c9a388'}
                size={'160px'}
                $position={'fixed'}
              />
            ) : (
              <>
                <ButtonContainer>
                  <Button
                    onClick={() => setFilterStatus('待付款')}
                    $actived={filterStatus === '待付款'}
                  >
                    待付款{' '}
                    <span>
                      ({filterOrders(orderState.data, '待付款').length})
                    </span>
                  </Button>
                  <Button
                    onClick={() => setFilterStatus('待出貨')}
                    $actived={filterStatus === '待出貨'}
                  >
                    待出貨{' '}
                    <span>
                      ({filterOrders(orderState.data, '待出貨').length})
                    </span>
                  </Button>
                  <Button
                    onClick={() => setFilterStatus('待取貨')}
                    $actived={filterStatus === '待取貨'}
                  >
                    待取貨{' '}
                    <span>
                      ({filterOrders(orderState.data, '待取貨').length})
                    </span>
                  </Button>
                  <Button
                    onClick={() => setFilterStatus('已完成')}
                    $actived={filterStatus === '已完成'}
                  >
                    已完成{' '}
                    <span>
                      ({filterOrders(orderState.data, '已完成').length})
                    </span>
                  </Button>
                  <Button
                    onClick={() => setFilterStatus('取消')}
                    $actived={filterStatus === '取消'}
                  >
                    取消{' '}
                    <span>
                      ({filterOrders(orderState.data, '取消').length})
                    </span>
                  </Button>
                  <Button
                    onClick={() => setFilterStatus('退貨退款')}
                    $actived={filterStatus === '退貨退款'}
                  >
                    退貨退款
                    <span>
                      ({filterOrders(orderState.data, '退貨退款').length})
                    </span>
                  </Button>
                </ButtonContainer>
                <TableContainer>
                  <Table>
                    <thead>
                      <tr>
                        <th scope='col' width='12.5%'>
                          訂單編號
                        </th>
                        <th scope='col' width='12.5%'>
                          訂單日期
                        </th>
                        <th scope='col' width='10%'>
                          合計
                        </th>
                        <th scope='col' width='10%'>
                          訂單狀態
                        </th>
                        <th scope='col' width='18%'>
                          款項狀態
                        </th>
                        <th scope='col' width='27%'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => {
                          return (
                            <tr
                              key={order.orderNumber}
                              onClick={() => {
                                navigate(`/orders/${order.orderNumber}`)
                              }}
                            >
                              <td data-cell='訂單編號'>{order.orderNumber}</td>
                              <td data-cell='訂單日期'>
                                <span>
                                  {getDayString(new Date(order.createdAt), '-')}
                                </span>
                              </td>
                              <td data-cell='訂單金額'>
                                NT.{numberWithCommas(order.total)}
                              </td>
                              <td data-cell='訂單狀態'>
                                <div>
                                  <p>{order.status}</p>
                                  {order.completedAt && (
                                    <span>
                                      {' '}
                                      {getDayString(
                                        new Date(order.completedAt),
                                        '-',
                                      )}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td data-cell='款項狀態'>
                                <span>
                                  {' '}
                                  {order.payment.type} / {order.payment.status}
                                </span>
                              </td>
                              <td data-cell='訂單商品'>
                                <OrderProductImages>
                                  {order.products.map((item, idx) => {
                                    if (idx > 2) {
                                      return
                                    }
                                    return (
                                      <ImageContainer key={idx}>
                                        <img
                                          src={`${import.meta.env.VITE_APIURL}/file${item.variantImage}`}
                                          alt=''
                                        />
                                      </ImageContainer>
                                    )
                                  })}

                                  <span>
                                    共
                                    {numberWithCommas(
                                      reduceCalculate(
                                        order.products,
                                        'quantity',
                                      ),
                                    )}
                                    項
                                  </span>
                                </OrderProductImages>
                                <ViewButton>
                                  檢視
                                  <Search />
                                </ViewButton>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <NoOrderFound>
                          <td scope='row' colSpan='8' data-cell='款項狀態'>
                            尚無訂單紀錄
                          </td>
                        </NoOrderFound>
                      )}
                    </tbody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Grid>
        </Grid>
      </StyledContainer>
    </Layout.PageLayout>
  )
}
