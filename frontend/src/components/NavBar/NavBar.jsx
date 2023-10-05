import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-gray-900/70 p-4 py-6 rounded-md w-[80vw]'>
      <div className='flex items-center justify-between'>
        <Link to='/' className='text-white text-2xl font-bold'>Home</Link>
        <ul className='flex space-x-4'>
          <li>
            <Link to='/login' className='text-white'>Login</Link>
          </li>
          <li>
            <Link to='/reservas' className='text-white'>Mis reservas</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
