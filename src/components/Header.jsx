import React, {useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../contexts/Contextapi';

function Header() {

  const nav = useNavigate()

  const {authContextStatus, setAuthContextStatus} = useContext(authContext)

  const handleLogout=()=>{
    sessionStorage.clear()
    toast.info("User logged out!!")
    setAuthContextStatus(false)
    nav('/')
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <i className="fa-solid fa-diagram-project fa-2xl" size="2xl" style={{ color: "#4781e6", }} />
            {' '}
            Project Fair
          </Navbar.Brand>
          {
            sessionStorage.getItem('token') &&
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header