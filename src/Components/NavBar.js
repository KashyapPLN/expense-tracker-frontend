import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar({ handleLogout }) {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/add">
              Add Expense
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/expenses">
              Expenses
            </Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
