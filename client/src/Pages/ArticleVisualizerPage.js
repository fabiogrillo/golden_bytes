import { useEffect, useState } from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap'
import api from '../api';
import { Link, useParams } from 'react-router-dom';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { ArrowLeft, Line } from 'react-bootstrap-icons';

export const ArticleVisualizer = () => {
    const { art_id } = useParams();
    const artIdAsNumber = parseInt(art_id, 10);
    const [article, setArticle] = useState({});
    const [message, setMessage] = useState('');


    useEffect(() => {
        const getArticleById = async () => {
            try {
                const article = await api.getArticleById(artIdAsNumber);
                setArticle(article);
            } catch (err) {
                setMessage({
                    msg: "Cannot retrieve the specified article!",
                    type: "danger"
                });
                console.error(message);
            }
        }
        getArticleById();
    }, [artIdAsNumber, message]);


    let title = '';
    let contentHTML = '';
    let readingTime = 0;
    if (article.content) {
        const contentDelta = JSON.parse(article.content).ops;
        const titleOperation = contentDelta[0];
        const contentOperations = contentDelta.slice(1);

        title = titleOperation.insert.trim();

        const converter = new QuillDeltaToHtmlConverter(contentOperations);
        contentHTML = converter.convert();
        const wordCount = article.content.split(' ').length;
        readingTime = Math.round(wordCount / 200);
    }

    return (
        <Container className='fade-in text-center' style={{ marginTop: '3em' }}>
            {article.date && article.tags ? (
                <>
                    <Card>
                        <Card.Header>
                            <h1 style={{ fontWeight: 'bold' }}>{title}</h1>
                            <h3 style={{ color: 'darkgray' }}>{article.description}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2em' }}>
                                <p>{new Date(article.date.slice(0, 4), article.date.slice(4, 6) - 1, article.date.slice(6, 8)).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p>Reading Time: {readingTime} minutes</p>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
                        </Card.Body>
                        <Card.Footer>
                            <p>Written by: {article.name}</p>
                            {article.tags.split(',').map((tag, index) => (
                                <Badge key={index} pill bg={"primary"} className="mx-1">
                                    {tag.trim()}
                                </Badge>
                            ))}
                        </Card.Footer>
                    </Card>
                    <Link to={"/articles"}>
                        <Button variant='warning' style={{ marginTop: '2em', float: 'left' }}>
                            <ArrowLeft /> Back
                        </Button>
                    </Link>
                </>
            ) : (
                <div>Loading...</div>
            )
            }
        </Container >
    );

};

export default ArticleVisualizer;