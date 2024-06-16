import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const RedirectIfLoggedIn = ({ children }) => {
  const { data, loading, error } = useSelector(state => state.authUser)
  const location = useLocation()
  // if (loading) { return <div>載入中...</div> }
  if (data && data.accessToken) {
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
  }

  return children
}
