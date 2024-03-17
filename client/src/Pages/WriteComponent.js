import { useState, useRef, useEffect } from "react";
import { Container, Button, Badge, Row, Col, Form } from "react-bootstrap"
import { ArrowLeft, ArrowLeftRight, ArrowRight } from "react-bootstrap-icons";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import api from "../api";

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
    const quillRef = useRef(); // Crea un riferimento React
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
    const user = props.user;
    const loggedIn = props.loggedIn;

    useEffect(() => {
        if (!first) {
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
        }
    }, [first]);

    const handleSubmit = () => {
        if (quillRef.current) {
            const quillInstance = quillRef.current.getEditor(); // Ottieni l'istanza di Quill
            const delta = quillInstance.getContents(); // Ottieni il contenuto come un oggetto Delta
            setContent(delta);
            setFirst(false);
        }
    };

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag).sort((a, b) => a.name.localeCompare(b.name)));
            setTags([...tags, tag].sort((a, b) => a.name.localeCompare(b.name)));
        } else {
            setTags(tags.filter(t => t !== tag).sort((a, b) => a.name.localeCompare(b.name)));
            setSelectedTags([...selectedTags, tag].sort((a, b) => a.name.localeCompare(b.name)));
        }
    };

    const handleBack = () => {
        setContent({});
        setFirst(true);
        setTags([]);
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

        console.log(content);
        const jsonContent = JSON.stringify(content);
        console.log(jsonContent);
        setFinished(true);
    }

    useEffect(() => {
        const addArticle = async () => {
            await api.addArticle(user.id, jsonContent, date, stringTags, description);
        };
        if (loggedIn && finished) {
            addArticle().then().catch((err) => {
                setMessage({
                    msg: "Impossible to create the article. Try later.",
                    type: "danger",
                });
                console.error(err);
            });
        };
    }, [finished, user.id, jsonContent, date, stringTags, description, loggedIn]);

    return (
        <Container className="fade-in">
            {first ?
                (
                    <>
                        <ReactQuill theme="snow" modules={modules} style={{ marginTop: '3em', backgroundColor: 'white' }}
                            formats={formats} placeholder="Insert text here..." ref={quillRef} />
                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '2em' }}>
                            <Button variant="success" onClick={handleSubmit}>
                                Submit article <ArrowRight />
                            </Button>
                        </div>
                    </>
                ) : (second ? (
                    <Container className="text-center fade-in" style={{ marginTop: '2em' }}>
                        <Row>
                            <div style={{ fontSize: '2em' }}>
                                {'Tell what your article talks about'}
                            </div>
                        </Row>
                        <br />
                        <Row>
                            <Col style={{ backgroundColor: 'var(--sky-blue)', borderRadius: '15px', marginRight: '1em' }}>
                                <div style={{ fontSize: '1.5em' }}>
                                    {'Available tags:'}
                                </div>
                                <div>
                                    {tags.map((tag, index) => (
                                        <Badge pill bg="primary" onClick={() => handleTagClick(tag)} key={index} style={{ cursor: 'pointer', margin: '0.5em', padding: '0.5em', fontSize: '1.5em' }}>
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </Col>
                            <Col xs lg='2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ArrowLeftRight style={{ fontSize: '3em' }} />
                            </Col>
                            <Col style={{ backgroundColor: 'var(--selective-yellow)', borderRadius: '15px', marginLeft: '1em' }}>
                                <div style={{ fontSize: '1.5em' }}>
                                    {'Selected tags:'}
                                </div>
                                <div>
                                    {selectedTags.map((tag, index) => (
                                        <Badge pill bg="danger" onClick={() => handleTagClick(tag)} key={index} style={{ cursor: 'pointer', margin: '0.5em', padding: '0.5em', fontSize: '1.5em' }}>
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col className="text-start">
                                <Button onClick={handleBack}>
                                    <ArrowLeft /> Back
                                </Button>
                            </Col>
                            {selectedTags.length > 0 ? (
                                <Col className="text-end">
                                    <Button variant="success" onClick={() => (setSecond(false))}>
                                        Next <ArrowRight />
                                    </Button>
                                </Col>) : null
                            }
                        </Row>
                    </Container>
                ) : (
                    <Container className="text-center fade-in" style={{ marginTop: '2em' }}>
                        <Row>
                            <div style={{ fontSize: '2em' }}>
                                {'Now insert a brief description of your article'}
                            </div>
                        </Row>
                        <br />
                        <Row>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>200 characters are allowed</Form.Label>
                                    <Form.Control as="textarea" rows={2} maxLength={500} minLength={20} required onChange={e => setDescription(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Must insert min 50 characters max 200 characters</Form.Control.Feedback>
                                </Form.Group>
                                <Button onClick={handleFinished}>Finish</Button>
                            </Form>
                        </Row>
                    </Container>
                )
                )
            }
        </Container>
    );
};


export default WriteComponent;