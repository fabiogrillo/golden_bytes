import { useEffect, useState } from "react";
import { Spinner, Card, Container, Badge, Row, Col, ProgressBar } from "react-bootstrap";
import api from "../api";
import { BalloonFill, Lightning, PencilFill } from "react-bootstrap-icons";

function NewsFeedComponent() {
    const [lastItems, setLastItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // since I suppose i will not write lots of articles, 
                //for the moment I cut the number of articles to 5 AFTER retrieving all of them with getArticles
                const articlesPromise = await api.getArticles();
                const goalsPromise = await api.getGoals();

                const [articles, goals] = await Promise.all([articlesPromise, goalsPromise]);

                const normalizedArticles = articles.map(article => ({ ...article, date: parseInt(article.date), type: 'article' }));
                const normalizedGoals = goals.map(goal => ({ ...goal, date: parseInt(goal.start_date), type: 'goal' }));

                const combinedItems = [...normalizedArticles, ...normalizedGoals];
                const sortedItems = combinedItems.sort((a, b) => b.date - a.date);

                setLastItems(sortedItems.slice(0, 10));
                setLoading(false);
            } catch (error) {
                console.error("Error during retrieving data:", error);
            }
        };

        fetchData();
    }, []);

    const isNew = (date) => {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);

        const currentDate = parseInt(
            `${twoWeeksAgo.getFullYear()}${String(twoWeeksAgo.getMonth() + 1).padStart(2, '0')}${String(twoWeeksAgo.getDate()).padStart(2, '0')}`
        );
        return date >= currentDate;
    };

    const formatDate = (date) => {
        const year = Math.floor(date / 10000);
        const month = Math.floor((date % 10000) / 100);
        const day = date % 100;
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return `${monthNames[month - 1]} ${day}, ${year}`;
    };


    return (
        <Container className="fade-in" style={{ marginTop: '3em' }}>
            <h2>Last News</h2>
            {loading ? (
                <Spinner animation="grow" variant="primary" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <>
                    <Row>
                        {lastItems.map((item, index) => (
                            <Col key={`${item.type}_${index}`} md={6}>
                                <Card className="position-relative" style={{ marginTop: '3em', backgroundColor: item.type === 'article' ? '#fcdc5d' : '#99d6ea', boxShadow: "0px 4px 20px rgba(80, 10, 190, 100)", minHeight: '12em' }}>
                                    <Card.Body>
                                        <div style={{marginBottom:'1em'}}>
                                            {item.type === 'article' ? <PencilFill size={30} /> : <BalloonFill size={30} />}
                                        </div>
                                        <Row>
                                            <Col>
                                                <Card.Title>{item.type === 'article' ? item.description : item.description}</Card.Title>
                                            </Col>
                                            <Col xs={4}>
                                                <Card.Title>{formatDate(item.date)}</Card.Title>
                                            </Col>
                                        </Row>
                                        {item.type === 'article' ? (
                                            <>
                                                <Card.Text>
                                                    Tags:{" "}
                                                    {item.tags.split(",").map((tag, index) => (
                                                        <Badge bg='primary' key={index} pill style={{marginRight:'1em'}} >
                                                            {tag.trim()}
                                                        </Badge>
                                                    ))}
                                                </Card.Text>
                                            </>
                                        ) : (
                                            <>
                                                <Card.Text>{item.additional_info}</Card.Text>
                                                <ProgressBar variant="primary" animated striped now={(item.current_step / item.total_steps) * 100}
                                                    label={`${item.current_step}/${item.total_steps}`}
                                                    style={{ backgroundColor: 'lightgrey' }} />
                                            </>
                                        )}
                                    </Card.Body>
                                    {isNew(item.date) && (
                                        <div className="new-indicator position-absolute" style={{
                                            fontSize: '23px',
                                            backgroundColor: '#023047ff',
                                            color: '#ffb703ff',
                                            zIndex: 1,
                                            borderRadius: '30%',
                                            padding: '2px',
                                            right: '-10px',
                                            top: '-20px',
                                            rotate: "5deg"
                                        }}>
                                            <Lightning />NEW
                                        </div>
                                    )}
                                </Card>
                                <br />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
}

export default NewsFeedComponent;