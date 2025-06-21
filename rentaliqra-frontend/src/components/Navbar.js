import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const TopNavbar = () => {
  return (
    <Navbar bg="transparent" expand="lg" className="navbar-absolute">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#account">Account</Nav.Link>
            <Nav.Link href="#home">Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;