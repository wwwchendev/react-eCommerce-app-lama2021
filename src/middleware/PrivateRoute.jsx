/*
1.取得Auth上下文
2.檢查user資料確認有效身分方可響應相應頁面，否則利用Navigate搭配useLocation轉址到上一頁。
*/
//react
import { useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Alert } from '@/components/common'

export const PrivateRoute = ({ children }) => {
  const { data, loading, error } = useSelector(state => state.authUser)
  const location = useLocation()

  if (!(data && data.accessToken)) {
    return (
      <>
        <Navigate to='/login' state={{ from: location }} replace></Navigate>
      </>
    )
  }

  return children
}
