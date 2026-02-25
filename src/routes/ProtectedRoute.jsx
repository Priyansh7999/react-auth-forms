import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const {user} = useContext(UserContext);
    if(!user){
        return <Navigate to='/sign-up' />
    }
  return (
    <Outlet />
  )
}
