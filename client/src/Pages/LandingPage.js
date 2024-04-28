import { Row, Container, Col, Image } from 'react-bootstrap';
import { Github, Instagram, Linkedin } from 'react-bootstrap-icons';
import NewsFeedComponent from './NewsFeedComponent';

export const LandingPage = () => {


    return (
        <>
            <Container className="fade-in" style={{ marginTop: '3em', padding: '20px', backgroundColor: '#d8e2dc', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)' }}>
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
                <Row style={{ justifyContent: 'center' }}>
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

            </Container>
            <NewsFeedComponent />

        </>
    );
};

export default LandingPage;