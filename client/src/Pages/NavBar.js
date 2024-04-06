import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Book, BoxArrowLeft, CloudCheck, InfoCircle, PersonCircle } from 'react-bootstrap-icons';

const NavBar = (props) => {

    return (
        <Navbar expand="lg" style={{ backgroundColor: 'var(--prussian-blue)' }}>
            <Container fluid style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Navbar.Brand href="/" style={{ color: 'var(--selective-yellow)' }}>Golden Bytes</Navbar.Brand>
                <div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'var(--selective-yellow)' }} />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto d-flex justify-content-end' style={{ marginLeft: 'auto' }}>
                            <Nav.Link href="/articles" style={{ color: 'var(--selective-yellow)' }}>
                                <Book />{' '}Articles
                            </Nav.Link>
                            <Nav.Link href="/contacts" style={{ color: 'var(--selective-yellow)' }}>
                                <InfoCircle />{' '}Contacts
                            </Nav.Link>
                            {props.loggedIn ?
                                (
                                    <>
                                        <Nav.Link href='/personal-area' style={{ color: 'var(--selective-yellow)' }}>
                                            <CloudCheck /> My Articles
                                        </Nav.Link>
                                        <Nav.Link href="/" onClick={() => {
                                            props.logout();
                                        }} style={{ color: 'var(--selective-yellow)' }}>
                                            <BoxArrowLeft /> Logout
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <Nav.Link href="/login" style={{ color: 'var(--selective-yellow)' }} >
                                        <PersonCircle /> LogIn
                                    </Nav.Link>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar >
    );
}

export default NavBar;
