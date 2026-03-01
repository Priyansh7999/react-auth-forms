import { useNavigate, useLocation } from 'react-router-dom'
import { getRole } from '../utils/auth.ts';

export default function SideBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const role = getRole();

  const menuList = role === 'CUSTOMER'
    ? [
      { name: 'HOME', path: '/customer' },
      { name: 'Create Ticket', path: '/customer/create-ticket' },
      { name: 'View All Tickets', path: '/customer/tickets' }
    ]
    : [
      { name: 'HOME', path: '/agent' },
      { name: 'View All Tickets', path: '/agent/tickets' }
    ];

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
                className={`flex gap-5 p-2 items-center hover:bg-slate-200 rounded-lg cursor-pointer ${isActive ? 'bg-slate-200' : ''
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