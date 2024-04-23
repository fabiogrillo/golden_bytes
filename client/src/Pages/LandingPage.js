import { Row, Button, Container, Form, InputGroup, Col, Nav, Image } from 'react-bootstrap';
import { Github, Instagram, Linkedin, Search } from 'react-bootstrap-icons';

export const LandingPage = () => {


    return (
        <>
            <Container className="fade-in" style={{ marginTop: '3em', padding: '20px', backgroundColor: '#E2FBD4', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)' }}>
                <Row className="d-flex justify-content-center fade-in">
                    <Col md={8}>
                        <p style={{ color: '#333', fontSize: '2.2rem', fontWeight: 'bold', textAlign: 'center' }}>
                            Golden Bytes is my personal blog where I share my journey through various aspects of life.
                        </p>
                        <p style={{ color: '#666', fontSize: '1.5rem', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                            Including my exploration of technology,
                            personal finance, reading, and my love for my Golden Retriever,
                            Phoebe. It's also a platform where I share my interactions across other platforms,
                            providing an authentic and engaging reflection of my thoughts and experiences.
                        </p>
                    </Col>
                </Row>
                <Row style={{justifyContent:'center'}}>
                    <Image roundedCircle src={require('../Pictures/landing_bg.jpeg')} style={{ width: '20%', height: 'auto' }} />
                </Row>

            </Container>
            <Container className='fade-in' style={{ marginTop: '2em' }}>
                <Row className='text-center'>
                    <Col className='social-button' style={{
                        backgroundColor: '#0E76A8',
                        borderRadius: '10px',
                        marginRight: '5em',
                        color: 'white',
                        padding: '0.5em'
                    }}>
                        <a href='https://www.linkedin.com/in/fabgrillo/' target='_blank' rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                            <Linkedin /> LinkedIn
                        </a>
                    </Col>
                    <Col className='social-button' style={{
                        background: 'black',
                        borderRadius: '10px',
                        color: 'white',
                        marginRight: '5em',
                        padding: '0.5em'
                    }}>
                        <a href='https://github.com/fabiogrillo' target='_blank' rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                            <Github /> Github
                        </a>
                    </Col>
                    <Col className='social-button' style={{
                        background: 'linear-gradient(to right, #515BD4, #8134AF, #DD2A7B, #FEDA77, #F58529)',
                        borderRadius: '10px',
                        color: 'white',
                        padding: '0.5em'
                    }}>
                        <a href='https://www.instagram.com/fabio.grillo_?utm_source=qr&igsh=MXVocGI5YTY1Y3I5dQ==' target='_blank' rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                            <Instagram /> Instagram
                        </a>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center" style={{ marginTop: '3em' }}>
                    <InputGroup className="mb-3" style={{ maxWidth: '300px', maxHeight: '10px', borderRadius: '20px' }} >
                        <Form.Control type="text" placeholder="Search Keyword" className="mr-sm-2" style={{ borderRadius: '20px' }} />
                        <Button variant="outline-success" id="button-addon2" style={{ borderRadius: '20px', backgroundColor: 'var(--ut-orange)', borderColor: 'var(--ut-orange)', color: 'var(--prussian-blue)' }}>
                            <Search />
                        </Button>
                    </InputGroup>
                </Row>
                <Row className="d-flex justify-content-center" style={{ marginTop: '3em' }}>
                    <Container>
                        <Nav className="d-flex justify-content-center" activeKey="/home">
                            <Nav.Item>
                                <Nav.Link href="/home" className="nav-land" style={{ color: 'var(--prussian-blue)' }}>Tecnologia</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1" className="nav-land" style={{ color: 'var(--prussian-blue)' }}>Personal Growth</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2" className="nav-land" style={{ color: 'var(--prussian-blue)' }}>Altri</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Row>

            </Container>

        </>
    );
};

export default LandingPage;