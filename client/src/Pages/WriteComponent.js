import { useState, useRef, useEffect } from "react";
import { Container, Button, Badge, Row, Col } from "react-bootstrap"
import { ArrowLeftRight, ArrowRight } from "react-bootstrap-icons";
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

function WriteComponent() {
    const quillRef = useRef(); // Crea un riferimento React
    const [content, setContent] = useState({});
    const [first, setFirst] = useState(true);
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

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

    return (
        <Container>
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
                ) : (
                    <Container className="text-center" style={{ marginTop: '2em' }}>
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
                                        <Badge color="primary" onClick={() => handleTagClick(tag)} key={index} style={{ cursor: 'pointer', margin: '0.75em', padding: '0.5em', fontSize: '1.75em' }}>
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
                                        <Badge color="secondary" onClick={() => handleTagClick(tag)} key={index} style={{ cursor: 'pointer', margin: '0.75em', padding: '0.5em', fontSize: '1.75em' }}>
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </Container>
    );
};


export default WriteComponent;