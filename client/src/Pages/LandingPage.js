import { CiSearch } from 'react-icons/ci'
import { Row, Button, Container, Form, InputGroup, Col, Nav, Carousel, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import api from '../api';
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";

function LandingWall() {
    const [message, setMessage] = useState('');
    const [articles, setArticles] = useState([]);
    const [currentColor, setCurrentColor] = useState('--sky-blue');
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const getArticles = async () => {
            try {
                const articles = await api.getArticles();
                setArticles(articles);
                console.log(articles);
            } catch (err) {
                setMessage({
                    msg: "Cannot retrieve articles",
                    type: 'danger',
                });
                console.error(err);
            }
        }
        getArticles();
    }, []);

    useEffect(() => {
        const colors = ['--sky-blue', '--blue-green', '--prussian-blue', '--selective-yellow', '--ut-orange'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setCurrentColor(randomColor);
    }, [index]);

    return (
        <Container className="fade-in text-center container-transition" style={{ marginTop: '30px', padding: '20px', backgroundColor: `var(${currentColor})`, borderRadius: '15px' }}>
            <Carousel activeIndex={index} onSelect={handleSelect} style={{marginTop:'1em'}}>
                {articles.slice(0, 3).map((article, index) => (
                    <Carousel.Item >
                        <Row>
                            <Card style={{ maxWidth: '80%', margin: 'auto', backgroundColor: 'transparent', borderRadius: '15px', border: 'none', marginBottom: '5em' }}>
                                <Row noGutters>
                                    <Col md={6}>
                                        <img rounded src={require('../Pictures/welcome_cartoon.jpeg')} text="First slide" style={{ maxHeight: '300px', objectFit: 'contain', borderRadius: '15px' }} />
                                    </Col>
                                    <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Card.Body style={{ textAlign: 'left', flex: '1' }}>
                                            <Card.Title>
                                                {article.title}
                                            </Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Written by: {article.author}
                                            </Card.Subtitle>
                                            <Card.Text>
                                                {article.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Text style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <AiOutlineLike />{article.likes}
                                                <AiOutlineEye />{article.views}
                                            </div>
                                            <div>
                                                {String(article.date).replace(/(\\d{4})(\\d{2})(\\d{2})/, '$1-$2-$3')}
                                            </div>
                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>





    );
};

export const LandingPage = () => {
    const firstLine = "Golden Bytes is my personal blog where I share my journey through various aspects of life.";


    return (
        <>
            <Container className="fade-in" style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--sky-blue)', borderRadius: '15px' }}>
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
                <Row className="d-flex justify-content-center" style={{ marginTop: '30px' }}>
                    <InputGroup className="mb-3" style={{ maxWidth: '300px', maxHeight: '10px', borderRadius: '20px' }} >
                        <Form.Control type="text" placeholder="Search Keyword" className="mr-sm-2" style={{ borderRadius: '20px' }} />
                        <Button variant="outline-success" id="button-addon2" style={{ borderRadius: '20px', backgroundColor: 'var(--ut-orange)', borderColor: 'var(--ut-orange)', color: 'var(--prussian-blue)' }}>
                            <CiSearch />
                        </Button>
                    </InputGroup>
                </Row>
                <Row className="d-flex justify-content-center" style={{ marginTop: '30px' }}>
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
            <LandingWall />
        </>
    );
};

export default LandingPage;