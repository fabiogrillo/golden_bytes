import { ListGroup, ListGroupItem, Container } from "react-bootstrap"
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';

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
    return (
        <>
            <Container >
                <ReactQuill theme="snow" modules={modules} style={{ marginTop: '3em', backgroundColor:'white' }} 
                    formats={formats} placeholder="Insert text here..." />
            </Container>
        </>
    )
}

export default WriteComponent;