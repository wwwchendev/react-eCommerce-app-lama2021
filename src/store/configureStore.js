import { configureStore, combineReducers } from '@reduxjs/toolkit'
//middleware
// import logger from 'redux-logger'
import api from '@/store/middleware/api'
import error from '@/store/middleware/error'
//reducer
import cartReducer from '@/store/cart'
import likedProductReducer from '@/store/likedProduct'
import authUserReducer from '@/store/authUser'
import newsReducer from '@/store/news'
import orderReducer from '@/store/order'
import logisticReducer from '@/store/logistic'

// persist
// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({
  authUser: authUserReducer,
  news: newsReducer,
  likedProduct: likedProductReducer,
  cart: cartReducer,
  order: orderReducer,
  logistic: logisticReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined; // 重置所有狀態(用於登出)
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      // logger,
      api,
      error
    ),
})

export default store

export const persistor = persistStore(store)
