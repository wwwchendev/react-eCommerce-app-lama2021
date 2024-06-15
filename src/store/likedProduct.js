/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '@/store/api';

const initialState = {
  data: {
    username: '',
    products: [],
  },
  loading: false,
  error: null,
};

const likedProductSlice = createSlice({
  name: 'likedProduct',
  initialState: initialState,
  reducers: {
    requestLikedProductStarted: (state) => {
      state.loading = true;
      state.error = null;
    },
    requestLikedProductFailed: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    requestUserLikedProductSuccess: (state, action) => {
      const data = action.payload.data;
      const { username, products } = data;
      state.data = { ...state.data, username, products };
      state.loading = false;
    },
    addLikedProductItemSuccess: (state, action) => {
      const { username, product } = action.payload.data;

      state.data.username = username;
      const index = state.data.products.findIndex(item => {
        return item._id === product._id
      });
      if (index === -1) {
        state.data.products.push(product);
      }
      state.loading = false;
    },
    removeLikedProductItemSuccess: (state, action) => {
      const { productId } = action.payload.data;
      state.data.products = state.data.products.filter(item => {
        return item._id !== productId
      });
      state.loading = false;
    },
    clearLikedProductError: (state) => {
      state.error = null;
    },
  },
});

export default likedProductSlice.reducer;
export const {
  requestLikedProductStarted,
  requestLikedProductFailed,
  requestUserLikedProductSuccess,
  addLikedProductItemSuccess,
  removeLikedProductItemSuccess,
  clearLikedProductError
} = likedProductSlice.actions;

const apiPath = '/likedProduct';

export const getUserLikedProducts = (TOKEN, username) => {
  return apiCallBegan({
    url: `${apiPath}/${username}`,
    method: 'get',
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestLikedProductStarted.type,
    onSuccess: requestUserLikedProductSuccess.type,
    onError: requestLikedProductFailed.type,
  });
};

export const addLikedItem = (TOKEN, username, data) => {
  return apiCallBegan({
    url: `${apiPath}/${username}`,
    method: 'post',
    data: data,
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestLikedProductStarted.type,
    onSuccess: addLikedProductItemSuccess.type,
    onError: requestLikedProductFailed.type,
  });
};

export const removeLikedItem = (TOKEN, username, data) => {
  return apiCallBegan({
    url: `${apiPath}/${username}`,
    method: 'delete',
    data: data,
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestLikedProductStarted.type,
    onSuccess: removeLikedProductItemSuccess.type,
    onError: requestLikedProductFailed.type,
  });
};

export const likedProductRequests = {
  get: getUserLikedProducts,
  addLikedItem,
  removeLikedItem,
};
