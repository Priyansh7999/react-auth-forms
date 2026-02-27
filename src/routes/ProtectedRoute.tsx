import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar.js'

export default function ProtectedRoute() {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to='/sign-up' />
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/5 h-full">
        <SideBar />
      </div>
      <div className="flex-1 h-full overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  )
}