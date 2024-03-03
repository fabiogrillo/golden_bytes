import { Button, Card, Container, Image } from "react-bootstrap";
import '@fontsource/roboto'
import { PiDog } from "react-icons/pi";
import { RiMoneyEuroBoxLine } from "react-icons/ri";
import { AiFillCode } from "react-icons/ai";
import { GrPersonalComputer, GrGamepad } from "react-icons/gr";

const targetDate = new Date(2024, 2, 3, 17, 0, 0);

function calculateTimePassed(targetDate) {
    const now = new Date();

    const diff = now - targetDate;

    if (diff < 60 * 60 * 1000) {
        return `${Math.floor(diff / (60 * 1000))} minutes`;
    }
    else if (diff < 24 * 60 * 60 * 1000) {
        return `${Math.floor(diff / (60 * 60 * 1000))} hours`;
    }
    else {
        return `${Math.floor(diff / (24 * 60 * 60 * 1000))} days`;
    }
}

export const LandingPage = () => {
    return (
        <Container style={{ marginTop: '2em', display: 'flex' }} >
            <div style={{ flex: '1', borderRight: '1px solid black', paddingRight: '1em' }}>
                <Image src={require('../Pictures/welcome_cartoon.jpeg')} rounded/>
            </div>
            <div style={{ flex: '3', paddingLeft: '1em' }}>
                <Card className="text-center land-card">
                    <Card.Title style={{ fontSize: '4em' }}>
                        Welcome!
                    </Card.Title>
                    <Card.Subtitle style={{ fontSize: '1.5em', padding: '1em' }}>
                        <cite>Life in Bytes and Barks: navigating the world of tech, personal finance and a Golden Retriever</cite>
                    </Card.Subtitle>
                    <br />
                    <div style={{ fontSize: '3em', display: 'flex', justifyContent: 'space-around' }} textAlign='center'>
                        <RiMoneyEuroBoxLine />
                        <AiFillCode />
                        <PiDog />
                        <GrPersonalComputer />
                        <GrGamepad />
                    </div>
                    <br />
                    <Card.Body style={{ textAlign: 'left', width: '100%', fontSize: '22px' }}>
                        <Card.Text>
                            The blog "Bits, Budgets, Books, and a Dog" is a personal and professional journey through various areas of life.
                            It is an online diary documenting the evolution of thinking, skills, tastes, and approaches over the years.
                        </Card.Text>
                        <Card.Text>
                            I'm an Italian software and data engineer.
                            My profession leads to explore the boundaries of technology, experiment with new programming languages, and solve complex problems.
                            These professional experiences, along with my personal reflections, form a significant part of the blog's content.
                            But the blog would not be complete without mentioning Phoebe, my beautiful female Golden Retriever.
                            Phoebe's adventures, her antics, and the joy she brings to my life are a staple of the blog.
                        </Card.Text>
                        <Card.Text>
                            Here I will also share all my interactions on other platforms: from LinkedIn' posts to Instagram' photos through Medium's articles.
                        </Card.Text>
                        <Card.Text>
                            In summary, "Golden Bytes" is a blog about everything that comes to my mind more or less.
                            It is a place where I share my experiences, my views and my opinioins.
                            It is a travelogue documenting the evolution of a software and data engineer, a personal finance enthusiast, an avid reader, and a dog lover.
                            It is, in a nutshell, an authentic and engaging portrait of me and my thoughts.
                        </Card.Text>
                    </Card.Body>
                    <br />
                    <Card.Footer className="land-card" style={{ textAlign: 'right' }}>{calculateTimePassed(targetDate)}</Card.Footer>
                </Card>
            </div>
            
        </Container>
    )
};

export default LandingPage;