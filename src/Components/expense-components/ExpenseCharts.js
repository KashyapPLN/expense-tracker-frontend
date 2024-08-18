import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

export default function Charts() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const userId = localStorage.getItem("emailId");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:4000/expense/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);
        calculateCategoryData(data);
        calculateMonthlyData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const calculateCategoryData = (expenses) => {
    const categoryTotals = {};

    expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    setCategoryData(categoryTotals);
  };

  const calculateMonthlyData = (expenses) => {
    const monthlyTotals = Array(12).fill(0);

    expenses.forEach((expense) => {
      const month = new Date(expense.date).getMonth();
      monthlyTotals[month] += expense.amount;
    });

    setMonthlyData(monthlyTotals);
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

  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const monthlyChartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyData,
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
    ],
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Expense Visualizations</h2>
      
      {/* Pie Chart for Category Distribution */}
      <Row className="mt-4 mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Category Distribution</Card.Title>
              <Pie data={categoryChartData} />
            </Card.Body>
          </Card>
        </Col>
        
        {/* Line Chart for Monthly Expenses */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Monthly Expenses</Card.Title>
              <Line data={monthlyChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
