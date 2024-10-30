import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_url from '../services/base_url';

function ProjectCard({project}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img onClick={handleShow} style={{ cursor: 'pointer' }} height={'200px'} width={'100%'} variant="top" src={`${base_url}/uploads/${project.image}`} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12} md={6}>
                            <img src={`${base_url}/uploads/${project.image}`} alt="" className='img-fluid' />
                        </Col>
                        <Col sm={12} md={6}>
                            <h5><span className='text-info'>Description : </span>{project.description}</h5>
                            <p>
                                <span>Languages : </span>
                                {project.languages}
                            </p>
                            <div className='mt-3 d-flex justify-content-between'>
                                <a href={project.github}>
                                    <i className="fa-brands fa-github" />
                                </a>
                                <a href={project.demo}>
                                    <i className="fa-solid fa-link" />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProjectCard