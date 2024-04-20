import { Container, Row, Card, Button, Col, Form, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import api from '../api';
import { CaretRightFill, Check2All, PencilSquare, PlusCircle, Trash } from 'react-bootstrap-icons';

function GoalsPage(props) {
    const loggedIn = props.loggedIn;

    const [show, setShow] = useState(false);
    const [goals, setGoals] = useState([]);
    const [message, setMessage] = useState({});
    const [goalDescription, setGoalDescription] = useState('');
    const [goalTotalSteps, setGoalTotalSteps] = useState('');
    const [goalCurrentStep, setGoalCurrentStep] = useState('');
    const [finished, setFinished] = useState(false);

    const handleClose = () => {
        setShow(false);
        setGoalDescription('');
        setGoalCurrentStep('');
        setGoalTotalSteps('');
    };
    const handleShow = () => setShow(true);


    useEffect(() => {
        const getGoals = async () => {
            try {
                const goals = await api.getGoals();
                setGoals(goals);
            } catch (err) {
                setMessage({
                    msg: "Cannot retrieve goals",
                    type: "danger",
                });
                console.error(message);
            }
        }
        getGoals();
    }, [message]);

    const colors = [
        "#01497c", "#ff4d6d", "#fdc43f", "#80b918", "#9d6b53",
        "#a9d6e5", "#ffb3c1", "#ffe94e", "#ffff3f", "#e6b8a2"
    ];

    useEffect(() => {
        const addGoal = async () => {
            try {
                await api.addGoal(goalDescription, goalTotalSteps, goalCurrentStep);
            } catch (err) {
                setMessage({
                    msg: "Impossible to add goal. Try later.",
                    type: "danger",
                });
                console.error(err);
            }
        };
        if (loggedIn && finished) {
            addGoal();
        }
    }, [finished, goalDescription, goalTotalSteps, goalCurrentStep, loggedIn]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setGoalDescription(form.formGoalDescription.value);

            setGoalTotalSteps(parseInt(form.formGoalTotal.value));
            setGoalCurrentStep(parseInt(form.formGoalCurrent.value));
            setShow(false);
            setFinished(true);
        }
    };

    return (
        <Container className='fade-in text-center' style={{ marginTop: '3em' }}>
            <Card style={{ backgroundColor: 'var(--ut-orange)', borderRadius: '15px' }}>
                <Card.Title>
                    Personal Goals
                </Card.Title>
                <Card.Text>
                    Here are my personal goals set over lot of thoughts; since I think I need to learn a lot still,
                    I might consider to finish all of these tasks to enhance my skills.
                </Card.Text>
            </Card>

            {goals.map((goal, index) => (
                <Container className='fade-in' style={{ marginTop: '2em', textAlign: 'left' }} key={index}>
                    <p>{goal.description}</p>
                    <Row>
                        <Col>
                            <div className="progress" style={{ height: '2em', backgroundColor: colors[index % 5 + 5], position: 'relative', overflow: 'visible' }}>
                                <div className="progress-bar" role="progressbar" style={{ width: `${(goal.current_step / goal.total_steps) * 100}%`, backgroundColor: colors[index % 5] }} aria-valuenow={goal.current_step} aria-valuemin="0" aria-valuemax={goal.total_steps}>
                                    {`${goal.current_step}/${goal.total_steps}`}
                                </div>
                                <div style={{ position: 'absolute', left: `${(goal.current_step / goal.total_steps) * 100}%`, top: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <CaretRightFill size={45} style={{ position: 'relative', zIndex: 1 }} />
                                </div>
                            </div>
                        </Col>
                        {loggedIn ? (
                            <Col className="d-flex" style={{ justifyContent: "space-around" }} md={2}>
                                <Button variant='warning'>
                                    <PencilSquare />
                                </Button>
                                <Button variant='danger'>
                                    <Trash />
                                </Button>
                            </Col>

                        ) : null}
                    </Row>
                </Container>
            ))}
            {loggedIn ? (
                <>
                    <Row style={{ marginTop: '3em' }}>
                        <Col>
                            <p>
                                Want to add a new goal?
                            </p>
                            <Button onClick={handleShow}>
                                <PlusCircle /> Add
                            </Button>
                        </Col>
                    </Row>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a new goal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit} >
                                <Form.Group controlId='formGoalDescription'>
                                    <Form.Label>Goal Title</Form.Label>
                                    <Form.Control required type='text' placeholder='Enter goal description'
                                        minLength={10}
                                        maxLength={100}
                                        value={goalDescription}
                                        onChange={(e) => setGoalDescription(e.target.value)}
                                        isInvalid={goalDescription.length < 10 || goalDescription.length > 100}
                                        isValid={goalDescription.length >= 10 && goalDescription.length <= 100}
                                    />
                                    <Form.Control.Feedback type='invalid'>It must be at least 10 characters!</Form.Control.Feedback>
                                    <Form.Control.Feedback type='valid'>The description is ok!</Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                <Form.Group controlId='formGoalTotal'>
                                    <Form.Label>Total Steps</Form.Label>
                                    <Form.Control required type='number' placeholder='Enter total number of steps (e.g. 10)'
                                        min={1}
                                        max={20}
                                        value={goalTotalSteps}
                                        onChange={e => setGoalTotalSteps(e.target.value)}
                                        isInvalid={goalTotalSteps < 2 || goalTotalSteps > 20}
                                        isValid={goalTotalSteps >= 1 && goalTotalSteps <= 20}
                                    />
                                    <Form.Control.Feedback type='invalid'>Insert a number between 1 and 20!</Form.Control.Feedback>

                                </Form.Group>
                                <br />

                                <Form.Group controlId='formGoalCurrent'>
                                    <Form.Label>Current Step</Form.Label>
                                    <Form.Control required type='number' placeholder='Enter the current step of development'
                                        min={0}
                                        value={goalCurrentStep}
                                        onChange={e => setGoalCurrentStep(e.target.value)}
                                        isValid={goalTotalSteps >= 0 || goalCurrentStep <= goalTotalSteps}
                                        isInvalid={goalCurrentStep > goalTotalSteps} />
                                    <Form.Control.Feedback type='invalid'>The current step must be below {goalTotalSteps}</Form.Control.Feedback>

                                </Form.Group>
                                <br />
                                <div className='text-center'>
                                    <Button variant='success' type='submit'>
                                        <Check2All /> Submit
                                    </Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            ) : null}
        </Container >
    )
};

export default GoalsPage;