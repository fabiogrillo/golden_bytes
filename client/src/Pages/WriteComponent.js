import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form, Alert, Modal } from "react-bootstrap"
import { ArrowCounterclockwise, ArrowLeft, ArrowRight, PlusCircle, TagFill } from "react-bootstrap-icons";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import api from "../api";
import DOMPurify from "dompurify";

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'font': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image'],

        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'align': [] }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

        ['clean']
    ]
}

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

export const WriteComponent = (props) => {
    const quillRef = useRef();
    const [content, setContent] = useState({});
    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(true);
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [description, setDescription] = useState('');
    const [stringTags, setStringTags] = useState([]);
    const [finished, setFinished] = useState(false);
    const [date, setDate] = useState('');
    const [jsonContent, setJsonContent] = useState({});
    const [alertMsg, setAlertMsg] = useState('');
    const [show, setShow] = useState(false);
    const [articleToModify, setArticleToModify] = useState({});
    const [showTagForm, setShowTagForm] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const [createNewTag, setCreateNewTag] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const user = props.user;
    const loggedIn = props.loggedIn;
    const toModifyId = props.toModify;

    useEffect(() => {
        if (toModifyId) {
            const getArticleById = async () => {
                try {
                    const article = await api.getArticleById(toModifyId);
                    setArticleToModify(article);

                    // Set Quill content
                    if (article && article.content) {
                        const quill = quillRef.current.getEditor(); // Obtain Quill instance
                        const delta = JSON.parse(article.content); // Convert string back to Delta
                        quill.setContents(delta.ops); // Set Quill content
                    }

                    if (article && article.tags) {
                        const articleTags = article.tags.split(',').map(tag => ({ name: tag.trim() }));
                        setSelectedTags(articleTags);
                    }

                    if (article && article.description) {
                        setDescription(article.description);
                    }
                } catch (err) {
                    setMessage({
                        msg: "Cannot retrieve the specified article!",
                        type: "danger"
                    });
                    console.error(message);
                }
            }
            getArticleById();
        }
    }, [toModifyId, message]);


    useEffect(() => {
        const getTags = async () => {
            try {
                const tags = await api.getTags();
                setTags(tags);
            } catch (err) {
                setMessage({
                    msg: "Cannot retrieve articles",
                    type: 'danger',
                });
                console.error(err);
            }
        }
        getTags();
    }, []);

    const handleSubmit = () => {
        if (quillRef.current) {
            const quillInstance = quillRef.current.getEditor();
            const delta = quillInstance.getContents();

            if (delta.ops.length === 0 || (delta.ops.length === 1 && !delta.ops[0].insert.trim())) {
                console.log("Content is empty!");
                setShow(true);
                setAlertMsg('Content is empty!');
                return;
            }
            const sanitizedHTML = DOMPurify.sanitize(delta.ops[0].insert);
            if (!sanitizedHTML) {
                console.log("Content is not a valid Delta format!");
                setShow(true);
                setAlertMsg('Content is not a valid Delta format!');
                return;
            }

            setContent(delta);

            setFirst(false);

        }
    };

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleBack = () => {
        setContent({});
        setFirst(true);
        setSecond(true);
        setSelectedTags([]);
    };

    const handleFinished = () => {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // Gennaio è 0!
        let yyyy = today.getFullYear();

        let date = yyyy + mm + dd;
        setDate(date);

        const stringTags = selectedTags.map(tag => tag.name).join(', ');
        setStringTags(stringTags);
        setJsonContent(JSON.stringify(content));
        setFinished(true);
    }

    useEffect(() => {
        const saveArticle = async () => {
            try {
                if (articleToModify === "{}") {
                    // Update existing article
                    await api.updateArticle(toModifyId, user.id, jsonContent, date, stringTags, description);
                } else {
                    // Add new article
                    await api.addArticle(user.id, jsonContent,  date, stringTags, description);
                }
            } catch (err) {
                setMessage({
                    msg: "Impossible to save the article. Try later.",
                    type: "danger",
                });
                console.error(err);
            }
        };

        if (loggedIn && finished) {
            saveArticle();
        }
    }, [finished, jsonContent, articleToModify, date, description, loggedIn, stringTags, toModifyId, user.id]);

    useEffect(() => {
        const newTag = async () => {
            try {
                const capitalizedTagName = newTagName
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                await api.addTag(capitalizedTagName);
                const tags = await api.getTags();
                setTags(tags);
                setShowTagForm(false);
                setCreateNewTag(false);
                setNewTagName('');
            } catch (err) {
                setMessage({
                    msg: "Impossible to save the tag. Try later.",
                    type: "danger",
                });
                console.error(err);
            }
        };

        if (loggedIn && createNewTag) {
            newTag();
        }
    }, [newTagName, createNewTag, loggedIn]);

    const handleAddTag = () => {
        setCreateNewTag(true);
    };

    return (
        <Container className="fade-in">
            {first ?
                (
                    <>
                        {show ? (
                            <Alert className="fade-in text-center" show={show} variant="danger" style={{ marginTop: '2em' }} onClose={() => setShow(false)} dismissible>
                                <Alert.Heading>
                                    {alertMsg}
                                </Alert.Heading>
                            </Alert>
                        ) : (
                            <>
                                <Row style={{ marginTop: "2em", fontSize: "2em" }}>
                                    <h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-1-circle" viewBox="0 0 16 16">
                                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z" />
                                        </svg>{' '}
                                        {"Write your article"}
                                    </h2>
                                </Row>
                                <ReactQuill theme="snow" modules={modules} style={{ marginTop: '1.5em', backgroundColor: 'white' }}
                                    formats={formats} placeholder="Insert text here..." ref={quillRef} />

                                <Row style={{ marginTop: "2em", fontSize: "2em" }}>
                                    <h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-2-circle" viewBox="0 0 16 16">
                                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306" />
                                        </svg>{' '}
                                        {"Select what you have written about"}
                                    </h2>
                                </Row>
                                <Row style={{ marginTop: '1.5em' }}>
                                    {tags.map((tag, index) => (
                                        <Col xs={4} key={index}>
                                            <Form.Check
                                                type="checkbox"
                                                id={`tag-checkbox-${index}`}
                                                label={tag.name}
                                                onChange={() => handleTagClick(tag)}
                                                checked={selectedTags.includes(tag)}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <p>
                                            Want to add a new tag?
                                        </p>
                                        <Button onClick={() => setShowTagForm(true)}>
                                            <PlusCircle /> Add
                                        </Button>
                                    </Col>
                                </Row>
                                <Modal show={showTagForm} onHide={() => setShowTagForm(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>
                                            <TagFill /> Add New Tag
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={(e) => {
                                            e.preventDefault();
                                        }}>
                                            <Form.Group controlId="newTagName">
                                                <Form.Label>Tag Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter tag name"
                                                    value={newTagName}
                                                    onChange={(e) => setNewTagName(e.target.value)}
                                                />
                                                {newTagName.length < 3 || newTagName.length > 20 ? (
                                                    <Form.Text className="text-danger">
                                                        Tag name must be between 3 and 20 characters long
                                                    </Form.Text>
                                                ) : null}
                                            </Form.Group>
                                            <br />
                                            <Button variant="primary" onClick={handleAddTag}>
                                                Add Tag
                                            </Button>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                                {showAlert && (
                                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                                        <Alert.Heading>{alertMsg}</Alert.Heading>
                                    </Alert>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2em' }}>
                                    <Link to={"/personal-area"}>
                                        <Button variant="warning">
                                            <ArrowLeft /> Back
                                        </Button>
                                    </Link>
                                    <Button variant="success" onClick={handleSubmit}>
                                        Next <ArrowRight />
                                    </Button>
                                </div>
                            </>
                        )}
                    </>
                ) : (second ? (
                    <Container className="text-center fade-in" style={{ marginTop: '2em' }}>
                        <Row>
                            <div style={{ fontSize: '2em' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-3-circle" viewBox="0 0 16 16">
                                    <path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318" />
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8" />
                                </svg>
                                {' Now insert a brief description of your article'}
                            </div>
                        </Row>
                        <br />
                        <Row>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" rows={3} placeholder="Tetx here..." required value={description} onChange={e => setDescription(e.target.value)}
                                        isInvalid={description.length < 50 || description.length > 200}
                                        isValid={description.length >= 50 && description.length <= 200} />
                                    <Form.Control.Feedback type="invalid">Must insert min 50 characters max 200 characters</Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">This description is ok</Form.Control.Feedback>
                                </Form.Group>
                                <Row>
                                    <Col className="text-start">
                                        <Button onClick={handleBack}>
                                            <ArrowCounterclockwise /> Restart
                                        </Button>
                                    </Col>
                                    <Col className="text-end">
                                        {description.length < 50 || description.length > 200 ? null :
                                            <Button onClick={handleFinished} href="/articles">Finish</Button>
                                        }
                                    </Col>
                                </Row>
                            </Form>
                        </Row>
                    </Container>
                ) : null
                )
            }
        </Container>
    );
};


export default WriteComponent;
