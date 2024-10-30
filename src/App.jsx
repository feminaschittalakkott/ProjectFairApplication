import { useState, useContext } from 'react'
import './App.css'
import './bootstrap.min.css'
import Landing from './pages/Landing'
import AllProjects from './pages/AllProjects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { authContext } from './contexts/Contextapi'

function App() {
  const [count, setCount] = useState(0)
  const {authContextStatus, setAuthContextStatus} = useContext(authContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard' element={authContextStatus?<Dashboard />:<Auth />} />
        <Route path='/projects' element={authContextStatus?<AllProjects />:<Auth />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
