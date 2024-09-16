import React from 'react';
import { Card } from 'react-bootstrap';
import './topic-not-found.css';
import { useNavigate } from 'react-router-dom';
import loupeImage from './img/loupe.png'

export default function TopicNotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/home');
    };

    return (
        <div className="topic-not-found-container">
            <Card className="card">
                <Card.Img variant="top" src={loupeImage} alt="Not Found" />
                <Card.Body>
                    <Card.Text>
                        We couldn't find the topic you're looking for.<br />
                        Try different or less specific keywords.
                    </Card.Text>
                    <button className="ask-button" onClick={handleGoBack}>
                        ASK YOUR QUESTION
                    </button>
                </Card.Body>
            </Card>
        </div>

    );
}
