import { useEffect, useState } from 'react';
import { Container, Card, Badge } from 'react-bootstrap'
import api from '../api';
import { useParams } from 'react-router-dom';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

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
    }, [artIdAsNumber]);

    let contentHTML = '';
    if (article.content) {
        const converter = new QuillDeltaToHtmlConverter(JSON.parse(article.content).ops);
        contentHTML = converter.convert();
    }

    return (
        <Container>
            {article.date && article.tags ? (
                <Card>
                    <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Written by: {article.name}</Card.Subtitle>
                        <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
                        <Card.Text>{article.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{new Date(article.date.slice(0, 4), article.date.slice(4, 6) - 1, article.date.slice(6, 8)).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                        {article.tags.split(',').map((tag, index) => (
                            <Badge key={index} pill bg="primary" className="mx-1">
                                {tag.trim()}
                            </Badge>
                        ))}
                    </Card.Footer>
                </Card>
            ) : (
                <div>Loading...</div>
            )}
        </Container>
    );

};

export default ArticleVisualizer;