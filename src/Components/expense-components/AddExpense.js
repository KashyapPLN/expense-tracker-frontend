import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddExpense() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState([
    'Food',
    'Transport',
    'Entertainment'
  ]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("emailId");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = { amount, category, date, description,userId};
    console.log(expenseData);
 if(token){
    fetch('http://localhost:4000/expense/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
    }).then(response => response.json())
        .then(data => {
               navigate('/expenses');                  
        })
        .catch(error => {
            console.error('Error:', error);
        });
 }
  };

  const handleAddCategory = () => {
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setCategory(customCategory); // Set the newly added category as selected
      setCustomCategory(''); // Clear the input field
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Add New Expense</h2>
      <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="formCustomCategory">
              <Form.Label>Add Custom Category</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category"
                />
                <Button
                  variant="secondary"
                  onClick={handleAddCategory}
                  disabled={!customCategory.trim()}
                >
                  Add
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                placeholder="Enter amount"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows={2}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Add Expense
          </Button>
        </div>
      </Form>
    </Container>
  );
}
