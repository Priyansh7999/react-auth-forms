import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage.js'
import SignIn from '../pages/SignIn.js'
import SignUp from '../pages/SignUp.js'
import PageNotFound from '../pages/PageNotFound.js'
import ProtectedRoute from './ProtectedRoute.js'
import CreateTicket from '../pages/CreateTicket.js'
import ViewAllTickets from '../pages/ViewAllTickets.js'
import ViewSingleTicket from '../pages/ViewSingleTicket.tsx'

export default function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/create-ticket' element={<CreateTicket />} />
                    <Route path="/tickets" element={<ViewAllTickets/>} />
                    <Route path="/tickets/:id" element={<ViewSingleTicket/>} />
                </Route>
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
