import api from '../api';
import { Card, Container, Carousel, Row, Col, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function ArticlesPage() {
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
            <Container className="fade-in text-center container-transition" style={{ marginTop: '3em', padding: '20px', backgroundColor: `var(${currentColor})`, borderRadius: '15px', color: '#FFFFFF' }}>
                <Carousel activeIndex={index} onSelect={handleSelect} style={{ marginTop: '1em' }}>
                    {articles.slice(0, 3).map((article, index) => {
                        let title = JSON.parse(article.content).ops[0].insert.trim();
                        return (
                            <Carousel.Item key={index} >
                                <Row>
                                    <Card style={{ maxWidth: '80%', margin: 'auto', backgroundColor: 'transparent', borderRadius: '15px', border: 'none', marginBottom: '5em' }}>
                                        <Row>
                                            <Col md={6}>
                                                <img rounded='true' src={require('../Pictures/welcome_cartoon.jpeg')} text="First slide" style={{ maxHeight: '300px', objectFit: 'contain', borderRadius: '15px' }} />
                                            </Col>
                                            <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Card.Body style={{ textAlign: 'left', flex: '1' }}>
                                                    <Card.Title style={{ fontFamily: 'Georgia, serif', fontSize: '2.5em' }}>
                                                        {title}
                                                    </Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1em' }}>Written by: {article.name}
                                                    </Card.Subtitle>
                                                    <Card.Text style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1.2em' }}>
                                                        {article.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Text style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    {new Date(article.date.slice(0, 4), article.date.slice(4, 6) - 1, article.date.slice(6, 8)).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Row>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>

            </Container>
            <Container style={{ marginTop: '40px' }}>
                <Row>
                    {articles.slice(3, 9).map((article, index) => (
                        <Col md={6} key={index}>
                            <Card className="mb-4" style={{ margin: 'auto', backgroundColor: 'transparent', borderRadius: '15px', border: '1px solid #000', marginBottom: '5em', transform: isHovered[index] ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.3s' }} onMouseOver={() => handleMouseOver(index)} onMouseOut={() => handleMouseOut(index)} onClick={() => console.log('Card clicked!')}>
                                <Card.Img variant="top" src={require('../Pictures/welcome_cartoon.jpeg')} style={{ maxWidth: '30%', objectFit: 'contain', borderRadius: '15px' }} />
                                <Card.Body style={{ maxHeight: '200px', overflow: 'hidden' }}>
                                    <Card.Title style={{ fontFamily: 'Georgia, serif', fontSize: '2em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {JSON.parse(article.content).ops[0].insert.trim()}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        Written by: {article.name}
                                    </Card.Subtitle>
                                    <Card.Text style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1.2em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {article.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    {article.tags.split(',').map((tag, i) => (
                                        <Badge key={i} pill variant="primary" style={{ marginRight: '5px' }}>
                                            {tag.trim()}
                                        </Badge>
                                    ))}
                                </Card.Footer>
                                <Card.Footer>
                                    <small className="text-muted">
                                        {new Date(article.date.slice(0, 4), article.date.slice(4, 6) - 1, article.date.slice(6, 8)).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default ArticlesPage;