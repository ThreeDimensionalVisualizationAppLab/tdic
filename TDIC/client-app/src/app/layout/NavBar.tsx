import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useStore } from '../stores/store';

export default observer ( function NavBar() {
    const {userStore: {user, logout}} = useStore();

    return(
        <Navbar bg="dark" variant="dark" expand="sm" className="border-bottom box-shadow mb-3">
            <Container>
                <Navbar.Brand as={NavLink} to="/">3D Aerospace Museum</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/articles">Contents</Nav.Link>
                        {
                            user ? 
                                <>
                                    <Nav.Link as={NavLink} to="/attachmentfiles">Attachmentfiles</Nav.Link>
                                    <Nav.Link as={NavLink} to="/modelfiles">Modelfiles</Nav.Link>
                                    <Nav.Link as={NavLink} to="/errors">Errors</Nav.Link>
                                    <Nav.Link as={NavLink} to="/logout">{user.username} </Nav.Link>
                                    <Nav.Link onClick={logout} >Logout</Nav.Link>
                                    <Nav.Link as={NavLink} to="/register">register</Nav.Link>
                                    <Nav.Link as={NavLink} to="/createarticle">Create New Article</Nav.Link>
                                    
                                </>                            
                                :
                                <>
                                    { process.env.NODE_ENV === 'development' &&  <Nav.Link as={NavLink} to="/login">Login</Nav.Link>  }                   
                                </>
                        }
                        <Nav.Link as={NavLink} to="/privacy">Privacy</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})