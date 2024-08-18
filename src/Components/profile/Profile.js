import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import './profile.css';

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        emailId: localStorage.getItem("emailId"),
        name: '',
        age: '',
        mobile: '',
        dob: '',
        gender: 'male',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        fetch(`https://expense-tracker-backend-dp7v.onrender.com/user-data/${localStorage.getItem("emailId")}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                setFormData({
                    name: data.name,
                    age: data.age,
                    mobile: data.mobile,
                    dob: data.dob,
                    gender: data.gender
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    const handleSubmit = () => {
        if (formData.name && formData.age && formData.mobile && formData.dob && formData.gender) {
            console.log(formData);
            fetch(`https://expense-tracker-backend-dp7v.onrender.com/user-data/${localStorage.getItem("emailId")}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
                .then(data => {
                    alert(data.msg);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert('Please fill in all the fields');
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="text-center mb-4">
                        <h2>Profile</h2>
                    </div>
                    <Form>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Mobile number"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="me-3">Gender:</Form.Label>
                                    <Form.Check
                                        inline
                                        label="Male"
                                        name="gender"
                                        type="radio"
                                        id='inline-radio-1'
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Check
                                        inline
                                        label="Female"
                                        name="gender"
                                        type="radio"
                                        id='inline-radio-2'
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button variant='primary' onClick={handleSubmit}>Submit</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
