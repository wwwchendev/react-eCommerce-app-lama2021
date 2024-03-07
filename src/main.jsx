import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import Home from '@/pages/Home'
import ProductList from '@/pages/ProductList'
import NotFound from '@/pages/NotFound'
import { OffsetProvider } from '@/context/OffsetContext'
import Product from './pages/Product'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
// import { useSelector } from 'react-redux';

// const user = useSelector((state) => state.user.currentUser) || {};
let user
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/productList',
          element: <ProductList />,
        },
        {
          path: '/product/:id',
          element: <Product />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/success',
          element: <Cart />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
        {
          path: '/register',
          element: user ? <Navigate to='/' /> : <Register />,
        },
        {
          path: '/login',
          element: user ? <Navigate to='/' /> : <Login />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BASENAME,
  },
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <OffsetProvider>
    <RouterProvider router={router} />
  </OffsetProvider>,
)
