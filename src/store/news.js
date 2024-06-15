/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '@/store/api';

const initialState = {
  data: [],
  loading: false,
  error: null,
};
export const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    requestNewsStarted: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    requestNewsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    },
    requestNewsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearNewsError: (state, action) => {
      state.error = null;
    },
  },
});

export default newsSlice.reducer;
export const {
  requestNewsStarted,
  requestNewsSuccess,
  requestNewsFailed,
  clearNewsError,
} = newsSlice.actions;

const apiPath = '/news';

export const getNews = () => {
  //請從react元件當中獲取token並傳遞參數
  return apiCallBegan({
    url: `${apiPath}/all`,
    method: 'get',
    data: null,
    onStart: requestNewsStarted.type,
    onSuccess: requestNewsSuccess.type,
    onError: requestNewsFailed.type,
  });
};

export const newsRequests = {
  getAll: getNews
};
