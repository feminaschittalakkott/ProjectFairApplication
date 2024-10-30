import React, { useState, useEffect, useContext } from 'react'
import { editProfileApi } from '../services/allApis'
import { toast } from 'react-toastify'
import base_url from '../services/base_url'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../contexts/Contextapi'

function Profile() {

    const [status, setStatus] = useState(false)
    const [userdata, setUserData] = useState({
        profile: "", username: "", github: "", linkedin: ""
    })
    const [preview, setPreview] = useState("")

    const nav = useNavigate()

    const {authContextStatus, setAuthContextStatus} = useContext(authContext)

    useEffect(() => {
        if (sessionStorage.getItem('username')) {
            setUserData({ ...userdata, username: sessionStorage.getItem('username'), github: sessionStorage.getItem('github'), linkedin: sessionStorage.getItem('linkedin'), profile: sessionStorage.getItem('profile') })
        }
    }, [])

    useEffect(() => {
        if (userdata.profile && userdata.profile.type) {
            setPreview(URL.createObjectURL(userdata.profile))
        }
        else {
            setPreview("")
        }
    }, [userdata.profile])

    const changeStatus = () => {
        setStatus(!status)
    }

    const handleProfileUpdate = async () => {
        console.log(userdata)
        const { username, github, linkedin, profile } = userdata
        if (!username || !github || !linkedin || !profile) {
            toast.warning("Enter valid inputs!")
        }
        else {
            if (userdata.profile.type) {
                const fd = new FormData()
                fd.append('username', username)
                fd.append('github', github)
                fd.append('linkedin', linkedin)
                fd.append('profile', profile)

                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res = await editProfileApi(fd, header)
                console.log(res)
                if(res.status == 200){
                    toast.success("Profile updated successfully!")
                    changeStatus()
                    sessionStorage.clear()
                    setAuthContextStatus(false)
                    nav('/auth')
                }
                else{
                    toast.error("Failed to update profile!")
                }
            }
            else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res = await editProfileApi(userdata, header)
                console.log(res)
                if(res.status == 200){
                    toast.success("Profile updated successfully!")
                    changeStatus()
                    sessionStorage.clear()
                    setAuthContextStatus(false)
                    nav('/auth')
                }
                else{
                    toast.error("Failed to update profile!")
                }
            }
        }
    }

    return (
        <>
            <div className="w-100 p-2 border border-3 mb-3">
                <div className="d-flex justify-content-between">
                    <h4 className='text-center'>Profile</h4>
                    <button className='btn' onClick={changeStatus}>
                        {
                            status ?
                                <i className='fa-solid fa-chevron-up'></i>
                                :
                                <i className='fa-solid fa-chevron-down'></i>
                        }
                    </button>
                </div>
                {
                    status &&
                    <div>
                        <label>
                            <input type="file" style={{ display: 'none' }} onChange={(e) => setUserData({ ...userdata, profile: e.target.files[0] })} />
                            <img src={preview ? preview : sessionStorage.getItem('profile') ? `${base_url}/uploads/${sessionStorage.getItem('profile')}` : "https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small_2x/user-icon-on-transparent-background-free-png.png"} className='img-fluid' alt="" />
                        </label>
                        <div className='mt-3'>
                            <input type="text" defaultValue={userdata.username} onChange={(e) => setUserData({ ...userdata, username: e.target.value })} placeholder='Username' className='form-control mb-3' />
                            <input type="text" defaultValue={userdata.github} placeholder='GitHub URL' className='form-control mb-3' onChange={(e) => setUserData({ ...userdata, github: e.target.value })} />
                            <input type="text" defaultValue={userdata.linkedin} placeholder='LinkedIn URL' className='form-control mb-3' onChange={(e) => setUserData({ ...userdata, linkedin: e.target.value })} />
                        </div>
                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-success' onClick={handleProfileUpdate}>Update</button>
                            <button className='btn btn-danger' onClick={changeStatus}>Cancel</button>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default Profile