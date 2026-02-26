import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
   const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to='/sign-in' />
    }
  return (
    <Outlet />
  )
}
