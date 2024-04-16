import { Container, Navbar } from "react-bootstrap";
import { Github, Instagram, Linkedin } from "react-bootstrap-icons";

export const Footer = () => (
    <Navbar expand="lg" fixed="bottom" style={{ backgroundColor: 'var(--prussian-blue)' }}>
        <Container className="d-flex justify-content-between">
            <div style={{ color: 'var(--selective-yellow)', fontSize: '0.9em' }}>
                <a>
                    <p>© 2024 Golden Bytes.</p>
                    <p>All rights reserved.</p>
                </a>
            </div>
            <div style={{ color: 'var(--selective-yellow)', fontSize: '0.9em' }}>
                <a href="/privacy-policy" style={{ color: 'var(--selective-yellow)', textDecoration: 'none' }}>Privacy Policy</a><br />
                <a href="/cookie-policy" style={{ color: 'var(--selective-yellow)', textDecoration: 'none' }}>Cookie Policy</a><br />
                <a href="/terms-of-service" style={{ color: 'var(--selective-yellow)', textDecoration: 'none' }}>Terms of Service</a>
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