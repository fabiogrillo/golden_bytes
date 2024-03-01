import React, { useState } from 'react';
import { Navbar, Offcanvas, Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { IoIosMenu } from "react-icons/io";
import { LiaMountainSolid } from "react-icons/lia";

const NavBar = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container fluid className='nav-land' data-bs-theme="dark" >
            <Navbar expand="lg" >
                <Navbar.Brand href="#home">
                    <LiaMountainSolid />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Navbar.Brand href="#home">Golden Bytes</Navbar.Brand>
                </Navbar.Collapse>
                <Button className='nav-land' onClick={handleShow} style={{borderColor:"#0C2D57"}}>
                    <IoIosMenu />
                </Button>
            </Navbar>

            <Offcanvas show={show} onHide={handleClose} className='nav-land'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        <ListGroupItem>
                            ciao
                        </ListGroupItem>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
}

export default NavBar;
