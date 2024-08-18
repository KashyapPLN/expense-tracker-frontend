import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    function handleLogin() {
        if (emailId !== '' && password !== '') {
            const req = {
                emailId,
                password
            }
            console.log(req);
            fetch('https://expense-tracker-backend-dp7v.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            }).then(response => response.json())
                .then(data => {
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("emailId",data.emailId);
                    navigate('/expenses');                  
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
    return (
        <Container className="mt-4">
             <Row className="justify-content-center">
             <Col xs={12} md={8} lg={6}>
       
            <div className='login'>
             <div className="text-center mb-4">
                <h2>Login</h2>
                </div>
                <Row className="mb-3">
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" onBlur={(e) => setEmailId(e.target.value)} />
                </Form.Group>
                </Col>
                </Row>
                <Row className="mb-3">
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" onBlur={(e) => setPassword(e.target.value)} />
                </Form.Group>
                </Col>
                </Row>
                <a href="/register">Don't have an account? then Register</a>
                <div className="text-center mt-3">
                <Button variant='success' onClick={(e) => handleLogin()}>Login</Button>
                </div>
            </div>
    
        </Col>
        </Row>
        </Container>
    )
}
