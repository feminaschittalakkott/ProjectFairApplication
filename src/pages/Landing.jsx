import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import landingImage from '../Images/landing.webp'
import { Link } from 'react-router-dom'
import { allProjectsApi } from '../services/allApis'

function Landing() {

    const [projects, setProjects] = useState([])

    useEffect(()=>{
        getData()
    }, [])

    const getData=async()=>{
        const res = await allProjectsApi()
        console.log(res)
        if(res.status == 200){
            setProjects(res.data)
        }
    }

    return (
        <>
            <div className='container-fluid w-100 bg-secondary d-flex justify-content-center align-items-center' style={{ height: '80vh' }}>
                <Row className='p-2'>
                    <Col className='d-flex justify-content-center flex-column'>
                        <h2>Project Fair</h2>
                        <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius veritatis debitis unde laborum nulla placeat aliquid minus consequatur cupiditate vitae sed, quae accusamus optio rerum est impedit recusandae iste exercitationem!</p>
                        <div className='d-grid'>
                            <Link className='btn btn-success' to={'/auth'}>Here we Go...</Link>
                        </div>
                    </Col>
                    <Col className='ms-5'>
                        <img src={landingImage} alt="Img" className='img-fluid rounded' style={{ height: '60vh', width: '70vh' }} />
                    </Col>
                </Row>
            </div>
            <div className='container-fluid p-5'>
                <h3 className='text-center mb-5'>Sample Projects</h3>
                <div className='d-flex justify-content-evenly'>
                    {
                        projects.length > 0 ?
                        projects.slice(0, 3).map(i =>(
                            <ProjectCard project={i} />
                        ))
                        :
                        <h4 className='text-danger text-center'>No Projects!!!</h4>
                    }
                </div>
                <div className='mt-4 text-center'>
                    <Link to='/projects'>View More</Link>
                </div>

            </div>
        </>
    )
}

export default Landing