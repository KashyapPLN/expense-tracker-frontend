import React, { useState, useEffect } from 'react';
import { Table, Form, Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import ExportData from '../ExportData';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [sortKey, setSortKey] = useState('date');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("emailId");
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`https://expense-tracker-backend-dp7v.onrender.com/expense/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);
        setFilteredExpenses(data); 
        calculateSummary(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    let filtered = expenses;

    if (filterCategory) {
      filtered = filtered.filter((expense) => expense.category === filterCategory);
    }
    if (filterDate) {
      filtered = filtered.filter((expense) => expense.date === filterDate);
    }
    if (filterAmount) {
      filtered = filtered.filter((expense) => expense.amount === parseFloat(filterAmount));
    }

    filtered = filtered.sort((a, b) => {
      if (sortKey === 'amount') {
        return a.amount - b.amount;
      } else if (sortKey === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

    setFilteredExpenses(filtered);
    calculateSummary(filtered);
  }, [expenses, sortKey, filterCategory, filterDate, filterAmount]);

  const calculateSummary = (expenses) => {
    const currentMonth = new Date().getMonth() + 1;
    let monthlyTotal = 0;
    let categoryTotals = {};

    expenses.forEach((expense) => {
      const expenseMonth = new Date(expense.date).getMonth() + 1;
      if (expenseMonth === currentMonth) {
        monthlyTotal += expense.amount;
      }

      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    setMonthlyTotal(monthlyTotal);
    setCategoryTotals(categoryTotals);
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center">Expense List</h2>
      <ExportData expenses={expenses}/>
      {/* Expense Summary */}
      <Row className="mb-4 mt-4">
        <Col md={6}>       
          <Card>
            <Card.Body>
              <Card.Title>Total Expenses This Month</Card.Title>
              <Card.Text>₹{monthlyTotal.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>         
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Expenses by Category</Card.Title>
              {Object.keys(categoryTotals).length > 0 ? (
                <ul>
                  {Object.keys(categoryTotals).map((category, index) => (
                    <li key={index}>
                      {category}: ₹{categoryTotals[category].toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <Card.Text>No expenses recorded.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filter Options */}
      <Row className="mb-3">
        <Col xs={12} md={4}>
          <Form.Group controlId="filterCategory">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Control
              as="select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {Array.from(new Set(expenses.map((expense) => expense.category))).map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group controlId="filterDate">
            <Form.Label>Filter by Date</Form.Label>
            <Form.Control
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group controlId="filterAmount">
            <Form.Label>Filter by Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={filterAmount}
              onChange={(e) => setFilterAmount(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Sorting Options */}
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="sortKey">
            <Form.Label>Sort by</Form.Label>
            <Form.Control
              as="select"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* Expense Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>₹{expense.amount.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
