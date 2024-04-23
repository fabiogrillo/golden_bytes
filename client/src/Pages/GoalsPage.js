import { Container, Row, Card, Button, Col, Form, Modal, ProgressBar, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import api from '../api';
import { Check2All, PencilFill, PencilSquare, PlusCircle, Trash } from 'react-bootstrap-icons';

function GoalsPage(props) {
    const loggedIn = props.loggedIn;

    const [show, setShow] = useState(false);
    const [goals, setGoals] = useState([]);
    const [message, setMessage] = useState({});
    const [goalDescription, setGoalDescription] = useState('');
    const [goalTotalSteps, setGoalTotalSteps] = useState('');
    const [goalCurrentStep, setGoalCurrentStep] = useState('');
    const [goalStartDate, setGoalStartDate] = useState(new Date());
    const [goalAdditionalInfo, setGoalAdditionalInfo] = useState('');
    const [finished, setFinished] = useState(false);
    const [goalIdToDelete, setGoalIdToDelete] = useState('');
    const [deleteSelected, setDeleteSelected] = useState(false);
    const [editSelected, setEditSelected] = useState(false);
    const [goalIdToEdit, setGoalIdToEdit] = useState();
    const [goalToEditInfo, setGoalToEditInfo] = useState();
    const [finishedEdited, setFinishedEited] = useState(false);

    const handleClose = () => {
        setShow(false);
        setGoalDescription('');
        setGoalCurrentStep('');
        setGoalTotalSteps('');
        setGoalStartDate(new Date());
        setGoalAdditionalInfo('');
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
    }, [message, goalIdToDelete]);

    useEffect(() => {
        const getGoal = async () => {
            try {
                const goalEdited = await api.getGoalById(goalIdToEdit);
                setGoalToEditInfo(goalEdited);
            } catch (err) {
                setMessage({
                    msg: "Cannot retrieve the goal to edit",
                    type: "danger",
                });
                console.error(err);
            }
        };
        if (editSelected && goalIdToEdit) {
            getGoal();
        }
    }, [editSelected, goalIdToEdit]);

    useEffect(() => {
        const addGoal = async () => {
            try {
                await api.addGoal(goalDescription, goalTotalSteps, goalCurrentStep, goalStartDate, goalAdditionalInfo);
                setMessage({
                    msg: "Goal added successfully",
                    type: "success",
                });
                setGoalDescription('');
                setGoalCurrentStep('');
                setGoalTotalSteps('');
                setGoalStartDate(new Date());
                setGoalAdditionalInfo('');
                setFinished(false);
            } catch (err) {
                console.error(err);
                setMessage({
                    msg: "Impossible to add goal. Try later.",
                    type: "danger",
                });
            }
        };
        if (loggedIn && finished && goalDescription && goalTotalSteps && goalCurrentStep && goalStartDate && goalAdditionalInfo) {
            addGoal();
        }
    }, [finished, goalDescription, goalTotalSteps, goalCurrentStep, goalStartDate, goalAdditionalInfo, loggedIn]);

    useEffect(() => {
        const editGoal = async () => {
            try {
                await api.updateGoal(goalIdToEdit, goalDescription, goalTotalSteps, goalCurrentStep, goalStartDate, goalAdditionalInfo);
                setMessage({
                    msg: "Goal added successfully",
                    type: "success",
                });
                setGoalDescription('');
                setGoalCurrentStep('');
                setGoalTotalSteps('');
                setGoalStartDate(new Date());
                setGoalAdditionalInfo('');
                setFinishedEited(false);
            } catch (err) {
                console.error(err);
                setMessage({
                    msg: "Impossible to update goal. Try later.",
                    type: "danger",
                });
            }
        };
        if (loggedIn && finishedEdited && goalDescription && goalTotalSteps && goalCurrentStep && goalStartDate && goalAdditionalInfo) {
            editGoal();
        }
    }, [finishedEdited, goalIdToEdit, goalDescription, goalTotalSteps, goalCurrentStep, goalStartDate, goalAdditionalInfo, loggedIn]);


    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setGoalDescription(form.formGoalDescription.value);
            setGoalTotalSteps(parseInt(form.formGoalTotal.value));
            setGoalCurrentStep(parseInt(form.formGoalCurrent.value));

            const currentDate = new Date();
            const year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;
            let day = currentDate.getDate();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            const formattedDate = `${year}${month}${day}`;

            setGoalStartDate(formattedDate);
            setGoalAdditionalInfo(form.formGoalAdditionalInfo.value);
            setShow(false);
            setFinished(true);
        }
    };

    const handleSubmitEdited = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setGoalDescription(form.formGoalDescription.value);
            setGoalTotalSteps(parseInt(form.formGoalTotal.value));
            setGoalCurrentStep(parseInt(form.formGoalCurrent.value));
            setGoalStartDate(form.formGoalStartDate.value);
            setGoalAdditionalInfo(form.formGoalAdditionalInfo.value);
            setEditSelected(false);
            setFinishedEited(true);
        }
    };

    const handleDelete = (goal_id) => {
        setDeleteSelected(true);
        setGoalIdToDelete(goal_id);
    };

    const handleEdit = (goal_id) => {
        setEditSelected(true);
        setGoalIdToEdit(goal_id);
    };

    useEffect(() => {
        const deleteGoal = async () => {
            try {
                await api.deleteGoal(goalIdToDelete);
                setMessage({ msg: 'Goal deleted successfully', type: 'success' });
                setDeleteSelected(false);
                setGoalIdToDelete(null);
                await api.getGoals();
            } catch (err) {
                setMessage({ msg: 'Impossible to delete personal goal. Try again!', type: 'danger' });
                console.error(err);
            }
        };

        if (deleteSelected) {
            deleteGoal();
        }
    }, [deleteSelected, goalIdToDelete]);

    const handleCloseEdited = () => {
        setEditSelected(false);
    }

    return (
        <Container className='fade-in text-center' style={{ marginTop: '3em' }}>
            <Card style={{ backgroundColor: '#FCF8F1', borderRadius: '15px', padding: '2em', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.9)', alignItems: 'center' }}>
                <Card.Title style={{ fontSize: '2.5rem', marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
                    The Voyage
                </Card.Title>
                <Card.Text style={{ fontSize: '1.3rem', color: '#666' }}>
                    A personalized canvas for aspirations.
                    Here, I embark on a journey of self-discovery, guided by the North Star of my desires.
                    Each goal becomes a deliberate brushstroke, adding vibrant hues to the tapestry of my life.
                    As I navigate this sea of possibilities, I celebrate every milestone—a beacon of hope and progress.
                    Join me as we chart our course, one beautiful stride at a time.
                </Card.Text>
                <Image roundedCircle src={require('../Pictures/the_voyage_bg.jpeg')} style={{ width: '20%', height: 'auto' }} />
            </Card>
            <Row style={{ justifyContent: 'center', fontSize: '2em', fontFamily: 'unset', marginTop: "2em" }}>
                Ongoing tasks
            </Row>

            {goals.map((goal) => {
                const colors = [
                    "#fbf8ccff",
                    "#fde4cf",
                    "#ffcfd2",
                    "#f1c0e8",
                    "#cfbaf0",
                    "#a3c4f3",
                    "#90dbf4",
                    "#8eecf5",
                    "#98f5e1",
                    "#b9fbc0"
                ];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                return (
                    <Container className='fade-in' style={{ marginTop: '2em', textAlign: 'left', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', borderRadius: '15px', padding: '1em', backgroundColor: randomColor }} key={goal.goal_id}>
                        <Row>
                            <Col style={{ fontSize: '1.5rem', marginBottom: '0.7em', fontWeight: 'bold', color: '#333' }}>
                                {goal.description}
                            </Col>
                            <Col sm={3} style={{ textAlign: 'end', fontSize: '1.4rem', marginBottom: '0.7em', fontWeight: 'normal', color: '#333' }}>
                                Started: {new Date(goal.start_date.toString().slice(0, 4), goal.start_date.toString().slice(4, 6) - 1, goal.start_date.toString().slice(6, 8)).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: '2-digit' })}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ProgressBar variant='primary' animated striped now={(goal.current_step / goal.total_steps) * 100} label={`${goal.current_step}/${goal.total_steps}`} style={{ backgroundColor: 'lightgrey' }} />
                            </Col>
                            {loggedIn ? (
                                <Col className="d-flex" style={{ justifyContent: "space-around" }} md={2}>
                                    <Button variant='warning' onClick={() => handleEdit(goal.goal_id)}>
                                        <PencilSquare />
                                    </Button>
                                    <Button variant='danger' onClick={() => handleDelete(goal.goal_id)}>
                                        <Trash />
                                    </Button>
                                </Col>

                            ) : null}
                        </Row>
                        <br />
                        <Row>
                            <Col style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '0.7em', fontWeight: 'unset', color: '#333' }}>
                                {goal.additional_info}
                            </Col>
                        </Row>
                    </Container>
                )
            })}
            {loggedIn ? (
                (editSelected && goalToEditInfo) ? (
                    <Modal show={editSelected} onHide={handleCloseEdited} backdrop='static' keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Edit the goal
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmitEdited}>
                                <Form.Group controlId='formGoalDescription'>
                                    <Form.Label>Goal Title</Form.Label>
                                    <Form.Control required type='text'
                                        defaultValue={goalToEditInfo.description}
                                        minLength={10}
                                        maxLength={100}
                                        onChange={(e) => setGoalDescription(e.target.value)}
                                        isInvalid={goalDescription.length < 10 || goalDescription.length > 100}
                                        isValid={goalDescription.length >= 10 && goalDescription.length <= 100}
                                        autoFocus
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
                                        defaultValue={goalToEditInfo.total_steps}
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
                                        defaultValue={goalToEditInfo.current_step}
                                        onChange={e => setGoalCurrentStep(e.target.value)}
                                        isValid={goalTotalSteps >= 0 || goalCurrentStep <= goalTotalSteps}
                                        isInvalid={goalCurrentStep > goalTotalSteps} />
                                    <Form.Control.Feedback type='invalid'>The current step must be below {goalTotalSteps}</Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                <Form.Group controlId='formGoalAdditionalInfo'>
                                    <Form.Label>Additional Info</Form.Label>
                                    <Form.Control type='text' placeholder='Add here additional info about the goal'
                                        defaultValue={goalToEditInfo.additional_info}
                                        onChange={e => setGoalAdditionalInfo(e.target.value)}
                                        isInvalid={goalAdditionalInfo.length > 300}
                                    />
                                    <Form.Control.Feedback type='invalid'>Maximum length exceeded (300 characters)!</Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                <Form.Group controlId='formGoalStartDate'>
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control required type='number'
                                        min={20000101}
                                        defaultValue={goalToEditInfo.start_date}
                                        onChange={e => setGoalStartDate(e.target.value)}
                                        isInvalid={goalStartDate < 20000101 }
                                    />
                                    <Form.Control.Feedback type='invalid'>Insert a date after 2000, 01, 01!</Form.Control.Feedback>

                                </Form.Group>
                                <br/>
                                <div className='text-center'>
                                    <Button variant='warning' type='submit'>
                                        <PencilFill /> Edit
                                    </Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
                ) : (
                    <>
                        <Row style={{ marginTop: '3em', fontSize: '1.1em' }}>
                            <Col>
                                <p>
                                    Want to add a new goal?
                                </p>
                                <Button onClick={handleShow}>
                                    <PlusCircle /> Add
                                </Button>
                            </Col>
                        </Row>

                        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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
                                            autoFocus
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
                                    <Form.Group controlId='formGoalAdditionalInfo'>
                                        <Form.Label>Additional Info</Form.Label>
                                        <Form.Control type='text' placeholder='Add here additional info about the goal'
                                            value={goalAdditionalInfo}
                                            onChange={e => setGoalAdditionalInfo(e.target.value)}
                                            isInvalid={goalAdditionalInfo.length > 300}
                                        />
                                        <Form.Control.Feedback type='invalid'>Maximum length exceeded (300 characters)!</Form.Control.Feedback>
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
                )
            ) : null
            }
        </Container >
    )
};

export default GoalsPage;
