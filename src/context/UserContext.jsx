import React, { createContext } from 'react'

export const UserContext = createContext()

export default function UserProvider({ children }) {
    const user = {
        name: '',
        email: ''
    }
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}