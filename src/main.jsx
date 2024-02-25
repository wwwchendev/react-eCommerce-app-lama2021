import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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

const router = createBrowserRouter([
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
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <OffsetProvider>
    <RouterProvider router={router} />
  </OffsetProvider>,
)
