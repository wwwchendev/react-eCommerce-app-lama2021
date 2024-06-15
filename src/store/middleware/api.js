import axios from 'axios'
import { apiCallBegan } from '@/store/api'
import { jwtDecode } from 'jwt-decode';
import { AuthUserRequests } from '@/store/authUser';

const api = store => next => async action => {
  if (action.type !== apiCallBegan.type) {
    return next(action)
  }
  // console.log(action.payload);
  const { dispatch, getState } = store;
  const { url, method, data, onStart, onSuccess, onError, headers } =
    action.payload;


  const requestConfig = {
    baseURL: import.meta.env.VITE_APIURL,
    url,
    method,
    data,
    headers: headers || {},
  };
  if (headers) {
    //取得token和有效期限
    const accessToken = getState().authUser?.data?.accessToken;
    const refreshToken = getState().authUser?.data?.refreshToken;
    const decodedAccessToken = jwtDecode(accessToken);
    // {type: 'employee', id: '11304001', iat: 1715838569, exp: 1715852969}

    // 判斷TOKEN是否過期，自動請求refresh
    const currentDate = Math.floor(Date.now() / 1000);
    const refreshUrl = "/auth/refreshToken/user"
    if (decodedAccessToken.exp < currentDate && url !== refreshUrl) {
      // console.log('TOKEN過期了', accessToken, decodedAccessToken,
      //   {
      //     "發放時間": new Date(decodedAccessToken.iat * 1000).toLocaleString(),
      //     "有效時間": new Date(decodedAccessToken.exp * 1000).toLocaleString()
      //   });
      await dispatch(AuthUserRequests.refreshToken(accessToken, { refreshToken }))
      const newAccessToken = getState().authUser?.data?.accessToken;
      // console.log('更新的TOKEN', newAccessToken, jwtDecode(newAccessToken),
      //   {
      //     "發放時間": new Date(jwtDecode(newAccessToken).iat * 1000).toLocaleString(),
      //     "有效時間": new Date(jwtDecode(newAccessToken).exp * 1000).toLocaleString()
      //   });

      requestConfig.headers.authorization = `Bearer ${newAccessToken}`;
    }
    // console.log(
    //   'TOKEN狀態',
    //   decodedAccessToken,
    //   {
    //     "發放時間": new Date(decodedAccessToken.iat * 1000).toLocaleString(),
    //     "有效時間": new Date(decodedAccessToken.exp * 1000).toLocaleString()
    //   }
    // );
  }

  if (onStart) dispatch({ type: onStart })
  try {
    const response = await axios.request(requestConfig);
    dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    console.log(error);
    const response = error.response.data;
    const tokenErrorMessage = response.errors.token;
    if (tokenErrorMessage === 'jwt expired') {
      console.log('過期處理');
    }
    if (response.message === "刷新驗證令牌失敗") {
      alert('驗證令牌已過期，請重新登入')
      store.dispatch({ type: 'RESET' });
    };

    // console.log('API中間件捕捉錯誤:', `${requestConfig.baseURL}${requestConfig.url}`, error.response.data);
    //存store錯誤
    dispatch({ type: onError, payload: error.response.data });
    //打印錯誤
    dispatch({ type: 'SHOW_ERROR', payload: error.response.data });
  }
}

export default api