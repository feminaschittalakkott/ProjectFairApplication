import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import base_url from '../services/base_url';
import { editProjectApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { editProjResContext } from '../contexts/Contextapi';

function Edit({ project }) {

    const [show, setShow] = useState(false);
    const [data, setData] = useState({ ...project })
    const [preview, setPreview] = useState("")

    const { editResponse, setEditResponse } = useContext(editProjResContext)

    useEffect(() => {
        if (data.image.type) {
            setPreview(URL.createObjectURL(data.image))
        }
        else {
            setPreview("")
        }
    }, [data.image])

    const handleEdit = async () => {
        console.log(data)
        console.log(data.image.type)
        const { title, description, languages, github, demo, image } = data
        if (!title || !description || !languages || !github || !demo || !image) {
            toast.warning('Please fill all fields')
        }
        else {
            if (data.image.type) {
                const fd = new FormData()
                fd.append("title", title)
                fd.append("desc", description)
                fd.append("languages", languages)
                fd.append("github", github)
                fd.append("demo", demo)
                fd.append("image", image)

                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res = await editProjectApi(fd, project._id, header)
                console.log(res)
                if(res.status == 200){
                    toast.success('Project updated successfully')
                    handleClose()
                    setEditResponse(res)
                }
                else{
                    toast.error('Failed to update project!')
                }
            }
            else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const body = { title: title, desc: description, languages, github, demo, image }
                const res = await editProjectApi(body, project._id, header)
                console.log(res)
                if(res.status == 200){
                    toast.success('Project updated successfully')
                    handleClose()
                    setEditResponse(res)
                }
                else{
                    toast.error('Failed to update project!')
                }
            }
        }
    }

    const handleClose = () => {
        setShow(false)
        setData({...project})
        setPreview("")
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <button className='btn' onClick={handleShow}><i className="fa-regular fa-pen-to-square fa-xl" /></button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-light'>
                    <Row>
                        <Col>
                            <label style={{ cursor: 'pointer' }}>
                                <input type="file" onChange={(e) => setData({ ...data, image: e.target.files[0] })} style={{ display: 'none' }} />
                                <img src={preview ? preview : `${base_url}/uploads/${project.image}`} className='img-fluid' alt="" />
                            </label>
                        </Col>
                        <Col>
                            <div>
                                <input className='form-control mb-3' onChange={(e) => setData({ ...data, title: e.target.value })} defaultValue={project?.title} type="text" placeholder="Project Title" />
                                <input className='form-control mb-3' onChange={(e) => setData({ ...data, description: e.target.value })} defaultValue={project?.description} type="text" placeholder="Project Description" />
                                <input className='form-control mb-3' onChange={(e) => setData({ ...data, languages: e.target.value })} defaultValue={project?.languages} type="text" placeholder="Languages" />
                                <input className='form-control mb-3' onChange={(e) => setData({ ...data, github: e.target.value })} defaultValue={project?.github} type="text" placeholder="GitHub URL" />
                                <input className='form-control mb-3' onChange={(e) => setData({ ...data, demo: e.target.value })} defaultValue={project?.demo} type="text" placeholder="Demo URL" />
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit