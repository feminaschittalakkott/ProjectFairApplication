import React from 'react'
import { Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <>
        <div className='container-fluid bg-primary'>
            <Row className='p-2'>
                <Col sm={12} md={4}>
                    <h4>About Us</h4>
                    <p style={{textAlign: 'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nulla saepe asperiores a, fugiat sed facere dicta accusantium dolorum nam. Consectetur quod delectus perspiciatis quaerat, nulla maiores sunt possimus aut!</p>
                </Col>
                <Col sm={12} md={4}>
                    <h4>Contact</h4>
                    <p>Email : pf2024@gmai.com</p>
                </Col>
                <Col sm={12} md={4}>
                    <h4>Feedbacks</h4>
                    <textarea name="" id="" className='form-control mt-3'></textarea>
                    <button className='btn btn-dark mt-3 mb-3'>Send</button>
                </Col>
            </Row>
        </div>
    </>
  )
}

export default Footer