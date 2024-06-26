import { Button, Container, Row, ButtonGroup } from "react-bootstrap";
import { Bullseye, JournalText, PencilFill } from "react-bootstrap-icons";

export const UserLanding = (props) => {
    const name = props.user.name;
    return (
        <Container style={{ marginTop: '3em' }} className="text-center">
            <Row className="justify-content-md-center">
                <h1 style={{ fontSize: '2.5em' }}>Hello, {name}</h1>
                <p style={{ fontSize: '1.3em' }}>
                    Welcome on your personal dashboard.
                </p>
            </Row>
            <ButtonGroup vertical style={{ marginTop: '2em' }}>
                <Button href="/write-article" size="lg" style={{ backgroundColor: 'var(--prussian-blue)', fontSize: '1.3em', borderRadius: '10px' }}>New article <PencilFill /></Button>
                <br />
                <Button href="/articles-manager" size="lg" style={{ backgroundColor: 'var(--selective-yellow)', fontSize: '1.3em', borderRadius: '10px' }}>Manage articles <JournalText /></Button>
                <br />
                <Button href="/personal-goals" size="lg" style={{ backgroundColor: 'var(--ut-orange)', fontSize: '1.3em', borderRadius: '10px' }}>Manage goals <Bullseye /></Button>
            </ButtonGroup>
        </Container>

    );
};

export default UserLanding;