import { Row, Button, Container, Form, InputGroup, Col, Nav, Carousel, Card, Badge } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import WriteComponent from './WriteComponent';


export const LandingPage = () => {
    const firstLine = "Golden Bytes is my personal blog where I share my journey through various aspects of life.";


    return (
        <>
            <Container className="fade-in" style={{ marginTop: '3em', padding: '20px', backgroundColor: 'var(--sky-blue)', borderRadius: '15px' }}>
                <Row className="d-flex justify-content-center">
                    <Col md={8}>
                        <p className="fade-in stylish-text" style={{ color: 'var(--prussian-blue)', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>
                            {firstLine}
                        </p>
                        <p className="fade-in stylish-text" style={{ color: 'var(--prussian-blue)', fontSize: '1.1em', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                            Including my <span style={{ color: 'var(--ut-orange)' }}>exploration of technology</span>, personal finance, reading, and my love for my <span style={{ color: 'var(--ut-orange)' }}>Golden Retriever, Phoebe</span>. It's also a platform where I share my interactions across other platforms, providing an authentic and engaging reflection of my thoughts and experiences.
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container>
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
            <Container style={{ marginTop: '3em' }}>
                <WriteComponent />
            </Container>
        </>
    );
};

export default LandingPage;