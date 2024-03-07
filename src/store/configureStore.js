import { configureStore } from '@reduxjs/toolkit';
//middleware
import logger from 'redux-logger';
import api from '@/store/middleware/api';
import error from '@/store/middleware/error';
//reducer
// import cartReducer from '@/store/carts';

const store = configureStore({
  reducer: {
    // carts: cartReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    logger,
    api,
    error,
  ],
});

export default store;