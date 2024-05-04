import api from '../api';
import { Card, Container, Carousel, Row, Col, Badge, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ArticlesPage(props) {
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
                console.error(message);
            }
        }
        getArticles();
    }, [message]);

    useEffect(() => {
        const colors = ['--sky-blue', '--blue-green', '--selective-yellow', '--ut-orange'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setCurrentColor(randomColor);
    }, [index]);

    return (
        <>
            <Container style={{marginTop:"3em", textAlign:'center'}}>
                <Card style={{ backgroundColor: '#f8edeb', borderRadius: '15px', padding: '2em', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.9)', alignItems: 'center' }}>
                    <Card.Title style={{ fontSize: '2.5rem', marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
                        The Archive
                    </Card.Title>
                    <Card.Text style={{ fontSize: '1.3rem', color: '#666' }}>
                        Welcome to Exploring Bytes, a personal treasury where each article is a step in my journey through the fascinating worlds of software and data engineering, artificial intelligence, and personal finance. This is a space where I document what I’ve learned, share discoveries, and discuss ideas with a sense of wonder and an open mind.
                        As I navigate these complex fields, I invite you to join me. Here, you won’t find the words of an all-knowing guru, but rather the reflections of someone who is learning, experimenting, and growing every day. It’s about the thrill of the ‘aha!’ moments, the satisfaction of solving puzzles, and the joy of sharing knowledge.
                        From time to time, I’ll also sprinkle in musings on various other topics that capture my curiosity. Because learning is not just about depth in a single subject, but also about the connections we make along the way.
                        So, whether you’re a fellow learner or simply curious about these topics, dive into the Exploring Bytes collection. Let’s embark on this adventure together, with curiosity as our guide and the unknown as our destination.
                        I hope this feels more aligned with your vision for the blog. If there’s anything else you’d like to adjust, just let me know!
                    </Card.Text>
                    <Image roundedCircle src={require('../Pictures/articles_intro.jpeg')} style={{ width: '20%', height: 'auto' }} />
                </Card>
            </Container>
            <Row style={{ justifyContent: 'center', fontSize: '2em', fontFamily: 'unset', marginTop: "2em" }}>
                Last articles
            </Row>
            <Container className="fade-in text-center container-transition" style={{ marginTop: '3em', padding: '20px', backgroundColor: `var(${currentColor})`, borderRadius: '15px', color: '#FFFFFF', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)' }}>
                <Carousel activeIndex={index} onSelect={handleSelect} style={{ marginTop: '1em', height: '22em' }}>
                    {articles.slice(0, 3).map((article, index) => {
                        let title = JSON.parse(article.content).ops[0].insert.trim();
                        // Truncate title if it's longer than 30 characters
                        if (title.length > 30) {
                            title = title.substring(0, 30) + "...";
                        }
                        // Truncate description if it's longer than 55 characters
                        let description = article.description;
                        if (description.length > 100) {
                            description = description.substring(0, 100) + "...";
                        }
                        return (
                            <Carousel.Item key={index} >
                                <Row>
                                    <Card style={{ maxWidth: '80%', margin: 'auto', backgroundColor: 'transparent', borderRadius: '15px', border: 'none', marginBottom: '5em' }} >
                                        <Link to={`/articles/${article.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            <Row>
                                                <Col md={6}>
                                                    <img alt='description_image' rounded='true' src={require('../Pictures/welcome_cartoon.jpeg')} text="First slide" style={{ maxHeight: '300px', objectFit: 'contain', borderRadius: '15px' }} />
                                                </Col>
                                                <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Card.Body style={{ textAlign: 'left', flex: '1', maxHeight: '20em', overflow: 'hidden' }}>
                                                        <Card.Title style={{ fontFamily: 'Georgia, serif', fontSize: '2.5em' }}>
                                                            {title}
                                                        </Card.Title>
                                                        <Card.Subtitle className="mb-2 text-muted" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1em' }}>Written by: {article.name}
                                                        </Card.Subtitle>
                                                        <Card.Text style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1.2em' }}>
                                                            {description}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Text style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        {new Date(article.date.slice(0, 4), article.date.slice(4, 6) - 1, article.date.slice(6, 8)).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </Card>
                                </Row>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </Container >

            <Container style={{ marginTop: '40px' }}>
                <Row>
                    {articles.slice(3, 9).map((article, index) => {
                        let title = JSON.parse(article.content).ops[0].insert.trim();
                        // Truncate title if it's longer than 30 characters
                        if (title.length > 30) {
                            title = title.substring(0, 30) + "...";
                        }
                        // Truncate description if it's longer than 55 characters
                        let description = article.description;
                        if (description.length > 55) {
                            description = description.substring(0, 55) + "...";
                        }
                        return (
                            <Col md={6} key={index}>
                                <Card className="mb-4" style={{ margin: 'auto', backgroundColor: 'transparent', borderRadius: '15px', border: '1px solid #000', marginBottom: '5em', transform: isHovered[index] ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.3s' }} onMouseOver={() => handleMouseOver(index)} onMouseOut={() => handleMouseOut(index)} >
                                    <Link to={`/articles/${article.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <Card.Body>
                                            <Row>
                                                <Col xs={4}>
                                                    <Card.Img variant="top" src={require('../Pictures/welcome_cartoon.jpeg')} style={{ maxWidth: '100%', objectFit: 'contain', borderRadius: '15px' }} />
                                                </Col>
                                                <Col xs={8}>
                                                    <Card.Title style={{ fontFamily: 'Georgia, serif', fontSize: '2em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {title}
                                                    </Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        Written by: {article.name}
                                                    </Card.Subtitle>
                                                </Col>
                                            </Row>
                                            <Row style={{ paddingTop: '20px' }}>
                                                <Col>
                                                    <Card.Text style={{ fontFamily: 'Verdana, sans-serif', fontSize: '1.2em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {description}
                                                    </Card.Text>
                                                </Col>
                                            </Row>
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
                                    </Link>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </>
    );
};

export default ArticlesPage;