import React, { useState, useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApis';
import { addProjResContext } from '../contexts/Contextapi';

function Add() {

    const [show, setShow] = useState(false);
    const [project, setProject] = useState({
        title: "", desc: "", languages: "", github: "", demo: "", image: ""
    })
    const [preview, setPreview] = useState("")

    const { addResponse, setAddResponse } = useContext(addProjResContext)

    useEffect(() => {
        if (project.image) {
            setPreview(URL.createObjectURL(project.image))
        }
        else {
            setPreview("")
        }
    }, [project.image])

    const handleClose = () => {

        setProject({
            title: "", desc: "", languages: "", github: "", demo: "", image: ""
        })
        setPreview("")
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleAddProject = async () => {
        console.log(project)
        const { title, desc, languages, github, demo, image } = project
        if (!title || !desc || !languages || !github || !demo || !image) {
            toast.warning("Please fill all fields")
        }
        else {
            const fd = new FormData()
            fd.append('title', title)
            fd.append('desc', desc)
            fd.append('languages', languages)
            fd.append('github', github)
            fd.append('demo', demo)
            fd.append('image', image)

            const header = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
            const res = await addProjectApi(header, fd)
            console.log(res)
            if (res.status == 200) {
                toast.success("Project Added!")
                handleClose()
                setAddResponse(res)
            }
            else {
                toast.error("Project Adding Failed!!!")
            }
        }
    }

    return (
        <>
            <button className='btn btn-warning' onClick={handleShow}>Add Project +</button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-light'>
                    <Row>
                        <Col>
                            <label style={{ cursor: 'pointer' }}>
                                <input type="file" style={{ display: 'none' }} onChange={(e) => setProject({ ...project, image: e.target.files[0] })} />
                                <img src={preview ? preview : "https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Photos.png"} className='img-fluid' alt="" />
                            </label>
                        </Col>
                        <Col>
                            <div>
                                <input className='form-control mb-3' type="text" placeholder="Project Title" onChange={(e) => setProject({ ...project, title: e.target.value })} />
                                <input className='form-control mb-3' type="text" placeholder="Project Description" onChange={(e) => setProject({ ...project, desc: e.target.value })} />
                                <input className='form-control mb-3' type="text" placeholder="Languages" onChange={(e) => setProject({ ...project, languages: e.target.value })} />
                                <input className='form-control mb-3' type="text" placeholder="GitHub URL" onChange={(e) => setProject({ ...project, github: e.target.value })} />
                                <input className='form-control mb-3' type="text" placeholder="Demo URL" onChange={(e) => setProject({ ...project, demo: e.target.value })} />
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProject}>Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add