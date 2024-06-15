import axios from 'axios';
import store from '@/store/configureStore';

// 創建一個 Axios 實例
const BASE_URL = import.meta.env.VITE_APIURL;

const customAxios = axios.create({
  baseURL: BASE_URL, // API URL
  timeout: 10 * 1000, // 設置超時時間為10s
});

// 設置請求攔截器，在每次發送請求之前將 token 添加到請求頭
customAxios.interceptors.request.use(
  config => {
    try {
      const persist = JSON.parse(localStorage.getItem('persist:root'));
      const authUser = JSON.parse(persist.authUser);
      const token = authUser.data?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error parsing auth data from localStorage:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);




// 設置響應攔截器，當收到 401 錯誤時刷新 token
customAxios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;


      try {
        const persist = JSON.parse(localStorage.getItem('persist:root'));
        const authUser = JSON.parse(persist.authUser);
        const refreshToken = authUser.data?.refreshToken;

        const response = await axios.post(`${BASE_URL}/auth/refreshToken/user`, { refreshToken });

        if (response.status === 200) {
          const newToken = response.data.data.accessToken;
          authUser.data.accessToken = newToken;
          persist.authUser = JSON.stringify(authUser);
          localStorage.setItem('persist:root', JSON.stringify(persist));

          customAxios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

          return customAxios(originalRequest);
        }
      } catch (refreshError) {
        if (refreshError.response && refreshError.response.data.message === "刷新驗證令牌失敗") {
          alert('驗證令牌已過期，請重新登入')
          store.dispatch({ type: 'RESET' });
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
