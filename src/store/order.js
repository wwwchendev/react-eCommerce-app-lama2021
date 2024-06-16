/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '@/store/api'

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: 'Order',
  initialState: initialState,
  reducers: {
    requestStarted: (state, action) => {
      state.loading = true
      state.error = null
    },
    requestFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    requestOrdersSuccess: (state, action) => {
      state.loading = false
      // console.log(action.payload.data);
      state.data = action.payload.data
      state.loading = false
    },
    addOrderSuccess: (state, action) => {
      state.loading = false
      // console.log(action.payload);
      const array = [...state.data]
      array.unshift(action.payload.data)
      state.data = array
    },
    updateOrderSuccess: (state, action) => {
      const updatedOrder = action.payload.data
      // console.log(action.payload);
      const index = state.data.findIndex(
        item => item.orderNumber === updatedOrder.orderNumber,
      )
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...updatedOrder,
        }
      }
      state.loading = false
    },
    deleteOrderSuccess: (state, action) => {
      const deletedOrder = action.payload.data
      // console.log(action.payload);
      const index = state.data.findIndex(
        item => item.orderNumber === deletedOrder.orderNumber,
      )
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...deletedOrder,
        }
      }
      state.loading = false
    },
    clearOrderError: (state, action) => {
      state.error = null
    },
  },
})
export default orderSlice.reducer

export const {
  requestStarted,
  requestFailed,
  requestOrdersSuccess,
  addOrderSuccess,
  updateOrderSuccess,
  deleteOrderSuccess,
  clearOrderError,
} = orderSlice.actions

const apiPath = '/order'

export const getOrders = (TOKEN, username) => {
  //請從react元件當中獲取token並傳遞參數
  return apiCallBegan({
    url: `${apiPath}/search`,
    method: 'post',
    data: {
      'searchTerm': username,
      username: username,
    },
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestStarted.type,
    onSuccess: requestOrdersSuccess.type,
    onError: requestFailed.type,
  })
}
export const addOrder = (TOKEN, data) => {
  // console.log(TOKEN, data);
  //請從react元件當中獲取token並傳遞參數
  return apiCallBegan({
    url: `${apiPath}`,
    method: 'post',
    data: data,
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestStarted.type,
    onSuccess: addOrderSuccess.type,
    onError: requestFailed.type,
  })
}
export const updateOrder = (TOKEN, orderNumber, data) => {
  //請從react元件當中獲取token並傳遞參數
  return apiCallBegan({
    url: `${apiPath}/${orderNumber}`,
    method: 'put',
    data: data,
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestStarted.type,
    onSuccess: updateOrderSuccess.type,
    onError: requestFailed.type,
  })
}
export const deleteOrder = (TOKEN, orderNumber) => {
  return apiCallBegan({
    url: `${apiPath}/${orderNumber}`,
    method: 'delete',
    data: { status: '已取消' },
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestStarted.type,
    onSuccess: deleteOrderSuccess.type,
    onError: requestFailed.type,
  })
}

export const orderRequests = {
  get: getOrders,
  add: addOrder,
  // update: updateOrder,
  // delete: deleteOrder
}
