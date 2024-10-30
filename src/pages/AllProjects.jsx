import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { allProjectsApi } from '../services/allApis'

function AllProjects() {

  const [data, setData] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getData()
    }
  }, [])

  const getData = async () => {
    const res = await allProjectsApi()
    if (res.status == 200) {
      setData(res.data)
    }
  }

  console.log(data)

  return (
    <>
      <Header />
      <div className='container-fluid p-3'>
        <h3>All Projects</h3>
        <div className='d-flex justify-content-around'>
          {
            data.length > 0 ?
              data.map(i => (
                <ProjectCard project={i} />
              ))
              :
              <h3 className='text-center text-danger'>Projects not available... Check if you are logged in or not!!!</h3>
          }
        </div>
      </div>
    </>
  )
}

export default AllProjects