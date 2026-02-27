import { useNavigate, useLocation } from 'react-router-dom'

type MenuItem = {
  name: string
  path: string
}

export default function SideBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuList: MenuItem[] = [
    { name: 'HOME', path: '/' },
    { name: 'Create Ticket', path: '/create-ticket' },
    { name: 'View All Tickets', path: '/tickets' },
    { name: 'My Tickets', path: '/tickets/:id' }
  ]

  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-2xl">
          TICKET MANAGEMENT
        </h2>
      </div>

      <div className="mt-10">
        <div className="mt-10 flex flex-col gap-5">
          {menuList.map((item) => {
            const isActive = location.pathname === item.path

            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex gap-5 p-2 items-center hover:bg-slate-200 rounded-lg cursor-pointer ${
                  isActive ? 'bg-slate-200' : ''
                }`}
              >
                <h2>{item.name}</h2>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}