import axios from 'axios';
import { apiCallBegan } from '@/store/api';

const api = store => next => async action => {
  if (action.type !== apiCallBegan.type) {
    return next(action);
  }
  const { dispatch } = store;
  const { url, method, data, onStart, onSuccess, onError } = action.payload;
  if (onStart) dispatch({ type: onStart });
  try {
    const response = await axios.request({
      baseURL: import.meta.env.VITE_APIURL,
      url,
      method,
      data,
    });

    dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    dispatch({ type: onError, payload: { error: error.message } });
    dispatch({ type: 'SHOW_ERROR', payload: { error: error.message } });
  }
};

export default api;