import { Routes, Route, Navigate } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../components/context/AuthContext'

import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

import Home from '../components/Home/Home'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'

import PasswordRestore from '../components/PasswordRestore/PasswordRestore'
import PasswordReset from '../components/PasswordReset/PasswordReset'

import ReservationFormContainer from '../components/ReservationFormContainer/ReservationFormContainer'
import AdminPanel from '../components/AdminPanel/AdminPanel'
import UserPanel from '../components/UserPanel/UserPanel'

const AppRouter = () => {
  const { user } = useContext(AuthContext)

  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route element={<PublicRoute user={user} />}>
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/reestablecimiento' element={<PasswordRestore />} />
      </Route>

      <Route element={<ProtectedRoute user={user} requiredRole='user' />}>
        <Route path='/reservas' element={<UserPanel />} />
      </Route>

      <Route element={<ProtectedRoute user={user} requiredRole='admin' />}>
        <Route path='/administracion' element={<AdminPanel />} />
      </Route>

      <Route element={<ProtectedRoute user={user} />}>
        <Route path='/nueva-reserva' element={<ReservationFormContainer />} />
      </Route>

      <Route path='/restaurar' element={<PasswordReset />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default AppRouter
