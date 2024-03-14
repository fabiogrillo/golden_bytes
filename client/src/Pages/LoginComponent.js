import { useState } from "react";
import { Alert, Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginComponent = (props) => {
    const [show, setShow] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleClose = () => setShow(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const credentials = { username: username, password: password };
        //console.log(credentials);

        let valid = true;
        if (username === '' || password === '' || password.length < 6) {
            valid = false;
            setErrorMessage('Invalid');
            setShow(true);
        }

        if (valid) {
            props.login(credentials).then((logged) => {
                if (!logged) {
                    setErrorMessage('Incorrect username and/or password');
                    setShow(true);
                }
            });
        }
    };
    return props.loading ? null : (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Please, confirm your identity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : ''}
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={username}
                                onChange={ev => setUsername(ev.target.value)}
                                placeholder="your@email.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Pasword</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                                placeholder="your password"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={'/'}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Link>
                    <Button variant="primary" onClick={handleSubmit}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
};

export default LoginComponent;