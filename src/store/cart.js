/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '@/store/api';

const initialState = {
  data: {
    username: '',
    products: [],
    quantity: 0,
    total: 0
  },
  loading: false,
  error: null,
};

const calculateTotal = (products) => {
  return products.reduce((total, product) => total + product.price * product.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    requestCartStarted: (state) => {
      state.loading = true;
      state.error = null;
    },
    requestCartFailed: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    clearCartError: (state) => {
      state.error = null;
    },
    requestUserCartSuccess: (state, action) => {
      const data = action.payload.data;
      const { username, products } = data;
      state.data = { ...state.data, username, products, quantity: products.length };
      state.loading = false;
    },
    addCartItemSuccess: (state, action) => {
      const { username, product } = action.payload.data;
      state.data.username = username;
      state.data.products.push(product);
      state.data.quantity = state.data.products.length;
      state.data.total += product.price * product.quantity;
      state.loading = false;
    },
    updateCartItemSuccess: (state, action) => {
      const { product } = action.payload.data;
      state.data.products = state.data.products.map(item => {
        if (item.productId === product.productId && item.specificationId === product.specificationId) {
          return { ...item, ...product };
        }
        return item;
      });
      state.data.total = calculateTotal(state.data.products);
      state.loading = false;
    },
    removeCartItemSuccess: (state, action) => {
      const { product } = action.payload.data;
      state.data.products = state.data.products.filter(item => item.specificationId !== product.specificationId);
      state.data.quantity = state.data.products.length;
      state.data.total = calculateTotal(state.data.products);
      state.loading = false;
    },
    clearAllCartItemsSuccess: (state, action) => {
      const { username } = action.payload.data;
      if (username === state.data.username) {
        state.data.username = username;
        state.data.products = [];
        state.data.quantity = 0;
        state.data.total = 0;
      }
      state.loading = false;
    },
  },
});

export default cartSlice.reducer;
export const {
  requestCartStarted,
  requestCartFailed,
  requestUserCartSuccess,
  clearCartError,
  addCartItemSuccess,
  updateCartItemSuccess,
  removeCartItemSuccess,
  clearAllCartItemsSuccess
} = cartSlice.actions;

const apiPath = '/cart';

export const getUserCart = (TOKEN, username) => {
  return apiCallBegan({
    url: `${apiPath}/${username}`,
    method: 'get',
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestCartStarted.type,
    onSuccess: requestUserCartSuccess.type,
    onError: requestCartFailed.type,
  });
};

export const addCartItem = (TOKEN, username, data) => {
  return apiCallBegan({
    url: `${apiPath}/${username}`,
    method: 'post',
    data: data,
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestCartStarted.type,
    onSuccess: addCartItemSuccess.type,
    onError: requestCartFailed.type,
  });
};

export const updateCartItem = (TOKEN, username, data) => {
  return apiCallBegan({
    url: `${apiPath}/${username}`,
    method: 'put',
    data: data,
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestCartStarted.type,
    onSuccess: updateCartItemSuccess.type,
    onError: requestCartFailed.type,
  });
};

export const removeCartItem = (TOKEN, username, data) => {
  return apiCallBegan({
    url: `${apiPath}/${username}`,
    method: 'delete',
    data: data,
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestCartStarted.type,
    onSuccess: removeCartItemSuccess.type,
    onError: requestCartFailed.type,
  });
};

export const clearAllCartItems = (TOKEN, username) => {
  return apiCallBegan({
    url: `${apiPath}/clear/${username}`,
    method: 'delete',
    headers: { authorization: `Bearer ${TOKEN}` },
    onStart: requestCartStarted.type,
    onSuccess: clearAllCartItemsSuccess.type,
    onError: requestCartFailed.type,
  });
};

export const cartRequests = {
  get: getUserCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearAllCartItems
};
