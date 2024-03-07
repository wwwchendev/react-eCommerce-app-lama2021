import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '@/store/api'

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    requestStarted: (state, action) => {
      state.loading = true
    },
    requestSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
      console.log('请求成功', state)
    },
    requestFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
      console.log('请求错误', state.error)
    },
    clearError: (state, action) => {
      state.error = null
    },
  },
})

export const { requestStarted, requestSuccess, requestFailed, clearError } =
  userSlice.actions
export default userSlice.reducer

const loginUrl = '/auth/login'
const logoutUrl = '/auth/logout'

export const loginRequest = formInput => {
  return apiCallBegan({
    url: loginUrl,
    method: 'post',
    data: formInput,
    onStart: requestStarted.type,
    onSuccess: requestSuccess.type,
    onError: requestFailed.type,
  })
}

export const logoutRequest = () => {
  return apiCallBegan({
    url: logoutUrl,
    method: 'post',
    onStart: requestStarted.type,
    onSuccess: requestSuccess.type,
    onError: requestFailed.type,
  })
}
