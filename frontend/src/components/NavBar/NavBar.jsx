import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className='bg-gray-900/70 p-4 py-6 rounded-md w-[80vw]'>
      <div className='flex items-center justify-between'>
        <NavLink to='/' className='text-white text-2xl font-bold'>
          Home
        </NavLink>
        <ul className='flex space-x-4'>
          <li>
            {user
              ? (
                <button
                  onClick={handleLogout}
                  className='text-white hover:text-indigo-500 font-medium '
                  cursor='pointer'
                >
                  Logout
                </button>
                )
              : (
                <NavLink to='/login' className='text-white'>
                  Login
                </NavLink>
                )}
          </li>
          {user?.role === 'user'
            ? (
              <li>
                <NavLink to='/reservas' className='text-white'>
                  Mis reservas
                </NavLink>
              </li>
              )
            : null}
          {user?.role === 'admin'
            ? (
              <li>
                <NavLink to='/administracion' className='text-white'>
                  Panel de administración
                </NavLink>
              </li>
              )
            : null}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
