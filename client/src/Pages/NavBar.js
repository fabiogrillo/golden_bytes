import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar expand="lg" style={{ backgroundColor: 'var(--prussian-blue)' }}>
            <Container fluid style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Navbar.Brand href="/" style={{ color: 'var(--selective-yellow)' }}>Golden Bytes</Navbar.Brand>
                <div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'var(--selective-yellow)' }} />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto d-flex justify-content-end' style={{ marginLeft: 'auto' }}>
                            <Nav.Link href="/articles" style={{ color: 'var(--selective-yellow)' }}>Articles</Nav.Link>
                            <Nav.Link href="/contacts" style={{ color: 'var(--selective-yellow)' }}>Contacts</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    );
}

export default NavBar;
