import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// custom imports
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
import { authContext } from '../../contexts/authContext';

function NavScrollExample() {

  const navigate = useNavigate();

  const { currentUser, checkAuth, handleLogout } = useContext(authContext);

  useEffect(() => {
    if(localStorage.getItem('tokens')) {
      checkAuth();
    };
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate('/')}>React&Backend</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Product" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate('/add')}>Add Product</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/products')}>Products</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate('/register')}>Register</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/login')}>Login</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              {currentUser ? currentUser : 'No auth user'}
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;