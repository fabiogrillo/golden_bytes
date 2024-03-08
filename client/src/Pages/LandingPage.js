import { CiSearch } from 'react-icons/ci'
import { Row, Button, Container, Form, InputGroup, Col, Nav, Carousel, Card, Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import api from '../api';
import { AiOutlineLike, AiOutlineEye } from "react-icons/ai";

function LandingWall() {
    const [message, setMessage] = useState('');
    const [articles, setArticles] = useState([]);
    const [currentColor, setCurrentColor] = useState('--sky-blue');
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState({});

    const handleMouseOver = (index) => {
        setIsHovered(prevState => ({ ...prevState, [index]: true }));
    };

    const handleMouseOut = (index) => {
        setIsHovered(prevState => ({ ...prevState, [index]: false }));
    };

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
        const colors = ['--sky-blue', '--blue-green', '--selective-yellow', '--ut-orange'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setCurrentColor(randomColor);
    }, [index]);

    return (
        <>
            <Container className="fade-in text-center container-transition" style={{ marginTop: '30px', padding: '20px', backgroundColor: `var(${currentColor})`, borderRadius: '15px', color: '#FFFFFF' }}>
                <Carousel activeIndex={index} onSelect={handleSelect} style={{ marginTop: '1em' }}>
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
                                                <Card.Title style={{ fontFamily: 'Georgia, serif', fontSize: '2.5em' }}>
                                                    {article.title}
                                                </Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1em' }}>Written by: {article.author}
                                                </Card.Subtitle>
                                                <Card.Text style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1.2em' }}>
                                                    {article.description}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Text style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    <AiOutlineLike />{article.likes}
                                                    <AiOutlineEye />{article.views}
                                                </div>
                                                <div>
                                                    {new Date(article.date.slice(0, 4), article.date.slice(4, 6) - 1, article.date.slice(6, 8)).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })}
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
            <Container style={{ marginTop: '40px' }}>
                <Row>
                    {articles.slice(3, 9).map((article, index) => (
                        <Col md={6} key={index}>
                            <Card className="mb-4" style={{ maxWidth: '60%', height: '450px', margin: 'auto', backgroundColor: 'transparent', borderRadius: '15px', border: '1px solid #000', marginBottom: '5em', transform: isHovered[index] ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.3s' }} onMouseOver={() => handleMouseOver(index)} onMouseOut={() => handleMouseOut(index)} onClick={() => console.log('Card clicked!')}>
                                <Card.Img variant="top" src={require('../Pictures/welcome_cartoon.jpeg')} style={{ maxHeight:'70%', objectFit: 'contain', borderRadius: '15px' }} />
                                <Card.Body style={{ maxHeight: '200px', overflow: 'hidden' }}>
                                    <Card.Title style={{ fontFamily: 'Georgia, serif', fontSize: '2em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{article.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1em', overflow: 'hidden', textOverflow: 'ellipsis' }}>Written by: {article.author}</Card.Subtitle>
                                    <Card.Text style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1.2em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{article.description}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    {article.tags.split(',').map((tag, i) => (
                                        <Badge key={i} pill variant="primary" style={{ marginRight: '5px' }}>
                                            {tag.trim()}
                                        </Badge>
                                    ))}
                                </Card.Footer>
                                <Card.Footer>
                                    <small className="text-muted">{new Date(article.date.slice(0, 4), article.date.slice(4, 6) - 1, article.date.slice(6, 8)).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
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