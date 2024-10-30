import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import { getAllProjectsApi, deleteProjectApi } from '../services/allApis'
import { addProjResContext, editProjResContext } from '../contexts/Contextapi'
import { toast } from 'react-toastify'

function Dashboard() {

  const [data, setData] = useState([])
  const { addResponse, setAddResponse } = useContext(addProjResContext)
  const { editResponse, setEditResponse } = useContext(editProjResContext)

  useEffect(() => {
    getData()
  }, [addResponse, editResponse])

  const getData = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getAllProjectsApi(header)
    console.log(res)
    if (res.status == 200) {
      setData(res.data)
    }
    else {
      console.log(res)
    }
  }

  const handleDelete = async (id) => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await deleteProjectApi(id, header)
    console.log(res)
    if (res.status == 200) {
      toast.success("Project deleted successfully!")
      getData()
    }
    else {
      toast.warning("Something went wrong!")
    }
  }

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <h2>User Projects</h2>
        <Row>
          <Col xs={12} md={8}>
            <div className='w-100 p-3 my-3'>
              <Add />
              <div className='mt-2 border px-1 py-5'>

                {
                  data.length > 0 ?
                    <>
                      {
                        data?.map(i => (
                          <div className='border border-2 d-flex justify-content-between p-2 m-2 mb-3 bg-light'>
                            <div className='row'>
                              <h4>{i.title}</h4>
                              <p>{i.description}</p>
                            </div>
                            <div>
                              <a href={i.github} target='_blank' className='btn'><i className="fa-brands fa-github fa-xl" /></a>
                              <Edit project={i} />
                              <button className='btn' onClick={() => handleDelete(i._id)}><i className="fa-solid fa-trash fa-xl" /></button>
                            </div>
                          </div>
                        ))
                      }
                    </>
                    :
                    <h3 className='text-center text-danger'>No Projects Found !</h3>

                }

              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className='my-5'>
              <Profile />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard