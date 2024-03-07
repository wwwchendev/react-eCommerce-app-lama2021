import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APIURL
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

//從本地存儲中讀取用戶資訊，其中包含了當前用戶的訪問令牌（access token）
const user = JSON.parse(localStorage.getItem('persist:root'))?.user
//用於確保user不為空後提取 currentUser 屬性
const currentUser = user && JSON.parse(user).currentUser
// const TOKEN = currentUser?.accessToken
const TOKEN = import.meta.env.VITE_AUTHTOKEN

//匯出axios實例
//用於執行不需要驗證的公開API請求
const publicRequest = axios.create({
  baseURL: BASE_URL,
})

//用於執行需要驗證用戶身分的API請求
const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
})

export default {
  CancelToken: axios.CancelToken,
  publicRequest,
  userRequest,
}
