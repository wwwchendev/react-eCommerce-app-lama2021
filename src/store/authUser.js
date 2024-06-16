/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '@/store/api'

const initialState = {
  loading: false,
  data: null,
  error: null,
}

const AuthUserSlice = createSlice({
  name: 'AuthUser',
  initialState: initialState,
  reducers: {
    requestStarted: (state, action) => {
      state.loading = true
      state.error = null
    },
    requestFailed: (state, action) => {
      state.loading = false
      const data = action.payload.errors
      console.log(data)
      state.error = data
    },
    loginSuccess: (state, action) => {
      state.loading = false
      const { data } = action.payload
      state.data = { ...data }
    },
    logoutSuccess: (state, action) => {
      state.loading = false
      state.data = null
    },
    registerSuccess: (state, action) => {
      state.loading = false
      const { data } = action.payload
      state.data = { ...data }
    },
    refreshDataSuccess: (state, action) => {
      const updatedData = action.payload.data
      state.data = {
        ...state.data,
        ...updatedData,
      }
      state.loading = false
    },
    refreshTokenSuccess: (state, action) => {
      state.loading = false
      const { data } = action.payload
      state.data = {
        ...state.data,
        accessToken: data.accessToken,
      }
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload.data
    },
    forgetPasswordSuccess: (state, action) => {
      state.loading = false
      const data = action.payload
      state.data = { 'message': data.message }
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false
      const data = action.payload
      state.data = { 'message': data.message }
    },
    reset: (state, action) => {
      state.loading = false
      state.data = null
      state.error = null
    },
  },
})
export default AuthUserSlice.reducer

export const {
  requestStarted,
  requestFailed,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  refreshTokenSuccess,
  updatePasswordSuccess,
  forgetPasswordSuccess,
  resetPasswordSuccess,
  refreshDataSuccess,
  reset,
} = AuthUserSlice.actions

export const loginRequest = data => {
  return apiCallBegan({
    url: `/auth/login/user`,
    method: 'post',
    data: data,
    onStart: requestStarted.type,
    onSuccess: loginSuccess.type,
    onError: requestFailed.type,
  })
}
export const logoutRequest = refreshToken => {
  return apiCallBegan({
    url: `/auth/logout/user`,
    method: 'delete',
    data: { refreshToken },
    onStart: requestStarted.type,
    onSuccess: logoutSuccess.type,
    onError: requestFailed.type,
  })
}
export const registerRequest = data => {
  return apiCallBegan({
    url: `/auth/register/user`,
    method: 'post',
    data: data,
    onStart: requestStarted.type,
    onSuccess: registerSuccess.type,
    onError: requestFailed.type,
  })
}

export const refreshTokenRequest = (TOKEN, data) => {
  console.log('TOKEN過期，自動請求更新')
  return apiCallBegan({
    url: `/auth/refreshToken/user`,
    method: 'post',
    data: { refreshToken: data.refreshToken },
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestStarted.type,
    onSuccess: refreshTokenSuccess.type,
    onError: requestFailed.type,
  })
}

export const updatePasswordRequest = (TOKEN, data) => {
  return apiCallBegan({
    url: `/auth/updatePassword/user`,
    method: 'patch',
    data: data,
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestStarted.type,
    onSuccess: updatePasswordSuccess.type,
    onError: requestFailed.type,
  })
}
export const forgetPasswordRequest = data => {
  return apiCallBegan({
    url: `/auth/forgetPassword/user`,
    method: 'post',
    data: data,
    onStart: requestStarted.type,
    onSuccess: forgetPasswordSuccess.type,
    onError: requestFailed.type,
  })
}
export const resetPasswordRequest = (resetPasswordToken, data) => {
  return apiCallBegan({
    url: `/auth/resetPassword/user?token=${resetPasswordToken}`,
    method: 'post',
    data: data,
    onStart: requestStarted.type,
    onSuccess: resetPasswordSuccess.type,
    onError: requestFailed.type,
  })
}
export const refreshDataRequest = (TOKEN, username) => {
  return apiCallBegan({
    url: `/user/${username}`,
    method: 'get',
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestStarted.type,
    onSuccess: refreshDataSuccess.type,
    onError: requestFailed.type,
  })
}

export const AuthUserRequests = {
  login: loginRequest,
  logout: logoutRequest,
  register: registerRequest,
  refreshToken: refreshTokenRequest,
  updatePassword: updatePasswordRequest,
  forgetPassword: forgetPasswordRequest,
  resetPassword: resetPasswordRequest,
  refreshData: refreshDataRequest,
}
