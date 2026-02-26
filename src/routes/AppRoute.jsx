import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import PageNotFound from '../pages/PageNotFound'
import ProtectedRoute from './ProtectedRoute'
import CreateTicket from '../pages/CreateTicket'

export default function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/create-ticket' element={<CreateTicket />} />
                </Route>
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
