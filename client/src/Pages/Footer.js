import { Container, Navbar } from "react-bootstrap";

export const Footer = () => (
    <Navbar expand="lg" fixed="bottom" style={{ backgroundColor: 'var(--prussian-blue)' }}>
        <Container className="d-flex justify-content-between">
            <div style={{ color: 'var(--selective-yellow)' }}>
                Altrociao
            </div>
            <div style={{ color: 'var(--selective-yellow)' }}>
                Links
            </div>
            <div style={{ color: 'var(--selective-yellow)' }}>
                Noitces
            </div>
        </Container>
    </Navbar>
);

export default Footer;