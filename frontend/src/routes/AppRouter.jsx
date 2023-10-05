import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../components/Home/Home'
import LoginForm from '../components/LoginForm/LoginForm'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default AppRouter
