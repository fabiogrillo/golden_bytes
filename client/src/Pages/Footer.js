import { Container, Navbar } from "react-bootstrap";
import { Github, Instagram, Linkedin } from "react-bootstrap-icons";

export const Footer = () => (
    <Navbar className="footer" expand="lg" style={{ backgroundColor: 'var(--prussian-blue)', position:'fixed', bottom:0, width:'100%', zIndex:100 }}>
        <Container className="d-flex justify-content-between">
            <div style={{ color: 'var(--selective-yellow)', fontSize: '0.9em' }}>
                <p>
                    © 2024 Golden Bytes.
                    <br />
                    All rights reserved.
                </p>
            </div>
            <div style={{ color: 'var(--selective-yellow)', fontSize: '0.9em' }}>
                <a style={{ color: 'var(--selective-yellow)', textDecoration: 'none' }}>Privacy Policy</a><br />
                <a style={{ color: 'var(--selective-yellow)', textDecoration: 'none' }}>Cookie Policy</a><br />
                <a style={{ color: 'var(--selective-yellow)', textDecoration: 'none' }}>Terms of Service</a>
            </div>

            <div style={{ color: 'var(--selective-yellow)', fontSize: '0.9em' }}>
                <a href="https://www.linkedin.com/in/fabgrillo/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--selective-yellow)', textDecoration: 'none' }}>
                    <Linkedin /> LinkedIn
                </a><br />
                <a href="https://github.com/fabiogrillo" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--selective-yellow)', textDecoration: 'none' }}>
                    <Github /> Github
                </a><br />
                <a href="https://www.instagram.com/fabio.grillo_?utm_source=qr&igsh=MXVocGI5YTY1Y3I5dQ==" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--selective-yellow)', textDecoration: 'none' }}>
                    <Instagram /> Instagram
                </a>
            </div>
        </Container>
    </Navbar>

);



export default Footer;