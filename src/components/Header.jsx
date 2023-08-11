import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userRole, setUserrole] = useState(sessionStorage.getItem("userRole"));
  const [userName, setUsername] = useState(sessionStorage.getItem("userName"));
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear(); // Clear sessionStorage
    console.clear(); // Clear console output
    navigate("/")
  }

  return (
    
    <div className="w-100 m-0 p-0">
      <Navbar className="navbar-black-bg p-3" variant="dark" expand="lg">
        <Navbar.Brand href="#">LearnerTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ms-auto me-3">
            <NavDropdown title={userName} id="basic-nav-dropdown" className="me-5 pe-5">
              <NavDropdown.Item>{userRole}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header