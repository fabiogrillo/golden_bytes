import { Button, Container, Row, ButtonGroup } from "react-bootstrap";
import { JournalText, PencilFill } from "react-bootstrap-icons";

export const UserLanding = (props) => {
    const name = props.user.name;
    return (
        <Container style={{ marginTop: '3em' }} className="text-center">
            <Row className="justify-content-md-center">
                <h1 style={{ fontSize: '2.5em' }}>Hello {name}</h1>
                <p style={{ fontSize: '1.3em' }}>
                    Welcome on your personal dashboard.
                </p>
            </Row>
            <ButtonGroup vertical>
                <Button href="/write-article" size="lg" style={{ backgroundColor: 'var(--prussian-blue)', fontSize: '1.3em' }}>New article <PencilFill /></Button>
                <Button href="/manage-articles" size="lg" style={{ backgroundColor: 'var(--selective-yellow)', fontSize: '1.3em' }}>Manage articles <JournalText /></Button>
            </ButtonGroup>
        </Container>

    );
};

export default UserLanding;