import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import { OffsetProvider } from '@/context/OffsetContext'

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
