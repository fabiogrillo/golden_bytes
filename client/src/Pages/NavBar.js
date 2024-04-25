import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Book, BoxArrowLeft, Check2Circle, CloudCheck, PersonCircle } from 'react-bootstrap-icons';

const NavBar = (props) => {
    return (
        <Navbar expand="lg" style={{ backgroundColor: 'var(--prussian-blue)', boxShadow:'0px 4px 10px rgba(0, 0, 0, 1)' }}>
            <Container fluid style={{ display: 'flex', justifyContent: 'center' }} >
                <div className="d-flex justify-content-center">
                    <Navbar.Brand href="/" style={{ color: 'var(--selective-yellow)', fontSize: '1.75em' }}>Golden Bytes</Navbar.Brand>
                </div>

                <div className="d-flex justify-content-end" style={{ position: "absolute", right: "1em" }}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'var(--selective-yellow)' }} />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto d-flex justify-content-end' style={{ marginLeft: 'auto' }}>
                            <Nav.Link href='personal-goals' style={{ color: 'var(--selective-yellow)', fontSize: '1.1em' }}>
                                <Check2Circle />{' '}Goals
                            </Nav.Link>
                            <Nav.Link href="/articles" style={{ color: 'var(--selective-yellow)', fontSize: '1.1em' }}>
                                <Book />{' '}Articles
                            </Nav.Link>

                            {props.loggedIn ?
                                (
                                    <>
                                        <Nav.Link href='/personal-area' style={{ color: 'var(--selective-yellow)', fontSize: '1.1em' }}>
                                            <CloudCheck /> My Articles
                                        </Nav.Link>
                                        <Nav.Link href="/" onClick={() => {
                                            props.logout();
                                        }} style={{ color: 'var(--selective-yellow)', fontSize: '1.1em' }}>
                                            <BoxArrowLeft /> Logout
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <Nav.Link href="/login" style={{ color: 'var(--selective-yellow)', fontSize: '1.1em' }} >
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
