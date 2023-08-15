import './App.css'
import AuthCallback from './auth-callback/auth-callback'
import AuthProvider from './auth-provider/auth-provider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './home/home'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth-callback' element={<AuthCallback />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
