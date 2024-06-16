//context
import { ConfigsProvider } from './context/ConfigsContext'
// import { OffsetProvider } from '@/context/OffsetContext'
//redux
import store, { persistor } from '@/store/configureStore'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
//route
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PrivateRoute, RedirectIfLoggedIn } from '@/middleware'
//page
import App from '@/App'
import {
  Home,
  About,
  News,
  SingleNews,
  Product,
  ProductList,
  Register,
  Login,
  Cart,
  Checkout,
  Payment,
  NotFound,
  ForgetPassword,
  ResetPassword,
  UpdatePassword,
  Account,
  Orders,
  SingleOrder,
  LikedProducts,
} from '@/pages'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '*',
          element: <NotFound />,
        },
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/news',
          element: <News />,
        },
        {
          path: '/news/:title',
          element: <SingleNews />,
        },
        {
          path: '/products',
          element: <ProductList />,
        },
        {
          path: '/products/:id',
          element: <Product />,
        },
        {
          path: '/register',
          element: (
            <RedirectIfLoggedIn>
              <Register />
            </RedirectIfLoggedIn>
          ),
        },
        {
          path: '/login',
          element: (
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          ),
        },
        {
          path: '/forgetPassword',
          element: (
            <RedirectIfLoggedIn>
              <ForgetPassword />
            </RedirectIfLoggedIn>
          ),
        },
        {
          path: '/resetPassword',
          element: (
            <RedirectIfLoggedIn>
              <ResetPassword />
            </RedirectIfLoggedIn>
          ),
        },
        {
          path: '/cart',
          element: (
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          ),
        },
        {
          path: '/checkout',
          element: (
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          ),
        },
        {
          path: '/payment/:orderNumber',
          element: (
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          ),
        },
        {
          path: '/orders',
          element: (
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          ),
        },
        {
          path: '/orders/:orderNumber',
          element: (
            <PrivateRoute>
              <SingleOrder />
            </PrivateRoute>
          ),
        },
        {
          path: '/account',
          element: (
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          ),
        },
        {
          path: '/updatePassword',
          element: (
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          ),
        },
        {
          path: '/likedProducts',
          element: (
            <PrivateRoute>
              <LikedProducts />
            </PrivateRoute>
          ),
        },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BASENAME,
  },
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigsProvider>
        <RouterProvider router={router} />
      </ConfigsProvider>
    </PersistGate>
  </Provider>,
)
