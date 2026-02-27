import { Toaster } from 'react-hot-toast'
import UserProvider, { UserContext } from './context/UserContext'
import AppRoute from './routes/AppRoute'

export default function App() {
  return (
    <UserProvider>
      <Toaster/>
      <AppRoute />
    </UserProvider>
  )
}
