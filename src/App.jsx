import UserProvider, { UserContext } from './context/UserContext'
import AppRoute from './routes/AppRoute'

export default function App() {
  return (
    <UserProvider>
      <AppRoute />
    </UserProvider>
  )
}
