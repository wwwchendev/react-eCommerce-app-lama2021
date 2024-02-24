import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import Home from '@/pages/Home'
import ProductList from '@/pages/ProductList'
import NotFound from '@/pages/NotFound'
import { OffsetProvider } from '@/context/OffsetContext'
import Product from './pages/Product'

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
