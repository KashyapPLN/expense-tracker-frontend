import React, { useState } from 'react';
import './register.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    function handleSignUp() {
        if (password !== '' && confirmPassword !== '' && password === confirmPassword) {
            const req = {
                emailId,
                password
            }
            console.log(req);

            fetch('https://expense-tracker-backend-dp7v.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            }).then(response => response.json())
                .then(data => {
                    alert(data.msg);
                    navigate('/login');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert("password doesn't match");
        }
    }

    function validatePwd(e) {
        const inputPassword = e.target.value;
        setPassword(inputPassword);

        const minLength = 8;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        let message = '';
        if (inputPassword.length < minLength) {
            message = `Password must be at least ${minLength} characters long.`;
        } else if (!hasNumber.test(inputPassword)) {
            message = 'Password must include at least one number.';
        } else if (!hasSpecialChar.test(inputPassword)) {
            message = 'Password must include at least one special character.';
        }

        if (message) {
            alert(message);
        }

    }
    return (
        <Container className="mt-4">
        
        <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
        <div className='signup'>
        <div className="text-center mb-4">
                <h2>Signup</h2>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" onBlur={(e) => setEmailId(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" onBlur={(e) => validatePwd(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="confirm password" onBlur={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
               <a href="/login">Already have an account? then Login</a>
               <div className="text-center mt-3">
                <Button variant='primary' onClick={handleSignUp}>Signup</Button>
                </div>
                </div>
      </Col>
      </Row>
    
      </Container>
    )
}
