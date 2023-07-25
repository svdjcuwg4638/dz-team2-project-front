import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link href="#home">Home</Link>
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
