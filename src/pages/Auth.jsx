import React, { useState, useContext } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify';
import { registerApi, loginApi } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../contexts/Contextapi';

function Auth() {

    const [authStatus, setAuthStatus] = useState(false)
    const [user, setUser] = useState({
        email: "", username: "", password: ""
    })

    const changeAuth = () => {
        setAuthStatus(!authStatus)
        setUser({
            email: "", username: "", password: ""
        })
    }
    const nav = useNavigate();

    const {authContextStatus, setAuthContextStatus} = useContext(authContext)

    // Register Button
    const handleSubmit = async () => {
        console.log(user)
        const { email, username, password } = user
        if (!email || !username || !password) {
            toast.warning("Please fill all fields!")
        }
        else {
            // API Call
            const res = await registerApi(user)
            console.log(res)
            if (res.status === 200) {
                toast.success("Registered Successfully")
                setUser({
                    email: "", username: "", password: ""
                })
                changeAuth()
            }
            else {
                toast.error("Registration failed!!!")
            }
        }
    }
    // Login Button
    const handleLogin = async () => {
        const { email, password } = user
        if (!email || !password) {
            toast.warning("Please enter neccessary data!")
        }
        else {
            // API Call
            const res = await loginApi(user)
            console.log(res)
            if (res.status == 200) {
                toast.success("Logged in Successfully")
                setUser({
                    email: "", username: "", password: ""
                })
                sessionStorage.setItem("token", res.data.token)
                sessionStorage.setItem("username", res.data.username)
                sessionStorage.setItem("github", res.data.github)
                sessionStorage.setItem("linkedin", res.data.linkedin)
                sessionStorage.setItem("profile", res.data.profile)
                setAuthContextStatus(true)
                nav('/dashboard')
            }
            else {
                toast.error(res.response.data)
            }
        }
    }

    return (
        <>
            <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <div className='w-75 border shadow p-2 row'>
                    <div className="col-sm-12 col-md-6">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/woman-login-into-banking-app-illustration-download-in-svg-png-gif-file-formats--application-mobile-services-pack-people-illustrations-4341049.png" className='img-fluid' alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6 bg-light">
                        {
                            authStatus ?
                                <h2 className='mt-4'>Register</h2>
                                :
                                <h2 className='mt-4'>Login</h2>
                        }
                        <div className='my-3 mt-4'>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control type="email" value={user.email} placeholder="name@example.com" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </FloatingLabel>
                            {
                                authStatus &&
                                <FloatingLabel controlId="floatingInputUSer" label="Username" className="mb-3">
                                    <Form.Control type="text" value={user.username} placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />

                                </FloatingLabel>
                            }
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" value={user.password} placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                            </FloatingLabel>
                            <div className='mt-4 d-flex justify-content-between'>
                                {
                                    authStatus ?
                                        <button className='btn btn-success w-25' onClick={handleSubmit}>Submit</button>
                                        :
                                        <button className='btn btn-primary w-25' onClick={handleLogin}>Login</button>
                                }
                                <button className='btn btn-link' onClick={changeAuth}>
                                    {
                                        authStatus ?
                                            <span>Already  have an account? Login</span>
                                            :
                                            <span>New User?</span>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth