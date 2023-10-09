import './App.css'

import { BrowserRouter } from 'react-router-dom'

import AppRouter from './routes/AppRouter'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

import { AuthProvider } from './components/context/AuthContext'

function App () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <AppRouter />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
