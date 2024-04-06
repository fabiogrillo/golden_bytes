import { useEffect, useState } from "react";
import { Button, Container, ListGroup, Col, Row, Badge } from "react-bootstrap";
import api from "../api";
import { PencilSquare, Trash } from "react-bootstrap-icons";

export const ManagementPage = (props) => {
    const name = props.user.name;
    const user = props.user;
    const [myArticles, setMyArticles] = useState([]);
    const [message, setMessage] = useState('');
    const [deleteSelected, setDeleteSelected] = useState(false);
    const [articleDeletedId, setArticleDeletedId] = useState(null);

    useEffect(() => {
        const getMyArticles = async () => {
            const myArticles = await api.getMyArticles();
            setMyArticles(myArticles);
        }
        getMyArticles().catch(err => {
            setMessage({ msg: 'Impossible to retrieve personal ArticlesPage. Try again!', type: 'danger' });
            console.error(err);
        });
    }, [myArticles]);

    useEffect(() => {
        const deleteMyArticle = async () => {
            await api.deleteMyArticle(user.id, articleDeletedId);
            setDeleteSelected(false);
            setArticleDeletedId(null);
        }
        if (deleteSelected) {
            deleteMyArticle().catch(err => {
                setMessage({ msg: 'Impossible to delete personal article. Try again!', type: 'danger' });
                console.error(err);
            });
        }
    }, [deleteSelected, user.id, articleDeletedId]);

    const handleDelete = (art_id) => {
        setDeleteSelected(true);
        setArticleDeletedId(art_id);
    }

    return (
        <Container className="fade-in text-center" style={{ marginTop: '3em' }}>
            <Row className="justify-content-md-center">
                <h1 style={{ fontSize: '2.5em' }}>{name},</h1>
                <p style={{ fontSize: '1.3em' }}>
                    these are your articles.
                </p>
            </Row>
            <ListGroup>
                {myArticles.reduce((resultArray, item, index) => {
                    const chunkIndex = Math.floor(index / 2);

                    if (!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = [] // inizia un nuovo chunk
                    }

                    resultArray[chunkIndex].push(item)

                    return resultArray
                }, []).map((articlesPair, index) => (
                    <Row key={index}>
                        {articlesPair.map((article, index) => {
                            let title = JSON.parse(article.content).ops[0].insert.trim();
                            let date = new Date(article.date.slice(0, 4), article.date.slice(4, 6) - 1, article.date.slice(6, 8)).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' });
                            let description = article.description.length > 100 ? article.description.substring(0, 50) + "..." : article.description;
                            let art_id = article.art_id;
                            return (
                                <Col sm={6} key={index}>
                                    <br />
                                    <ListGroup.Item style={{ textAlign: 'left', borderRadius: '15px', marginBottom: '10px' }}>
                                        <Row>
                                            <Col>
                                                <h5>{title}</h5>
                                            </Col>
                                            <Col sm={3} className="d-flex align-items-start justify-content-end">
                                                <Button variant="danger" size="sm" style={{ marginRight: '1em' }} onClick={() => handleDelete(art_id)}>
                                                    <Trash />
                                                </Button>
                                                <Button variant="warning" size="sm">
                                                    <PencilSquare />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col>
                                                <p>{date}</p>
                                                <p>{description}</p>
                                                {article.tags.split(',').map((tag, index) => (
                                                    <Badge key={index} variant="primary" className="mr-2" style={{ marginRight: '1em' }}>
                                                        {tag.trim()}
                                                    </Badge>
                                                ))}
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                </Col>
                            )
                        })}
                    </Row>
                ))}
            </ListGroup >
        </Container >


    )
}

export default ManagementPage;