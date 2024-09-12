import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './topic-list.css';

interface Topic {
  id: number;
  title: string;
  description: string;
  answers: number;
}

// Simulate an API call 
const fetchMockData = (offset: number, limit: number): Topic[] => {
  const mock_data: Topic[] = Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    title: `Topic Title ${index + 1}`,
    description: `This is the question description :)`,
    answers: Math.floor(Math.random() * 100),
  }));
  return mock_data.slice(offset, offset + limit);
};

export default function TopicList() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [visibleTopics, setVisibleTopics] = useState(15);
  const [loading, setLoading] = useState(false);

  const loadMoreTopics = () => {
    setLoading(true);
    const newTopics = fetchMockData(visibleTopics, 15);
    setTopics((prevTopics) => [...prevTopics, ...newTopics]);
    setVisibleTopics((prevVisibleTopics) => prevVisibleTopics + 15);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const initialTopics = fetchMockData(0, 15);
    setTopics(initialTopics);
    setLoading(false);
  }, []);

  return (
    <div className="base-background">
      <div className="card-container">
        <div className="results-text">Results</div>
        <Row>
          {topics.map((topic) => (
            <Col key={topic.id} md={12}>
              <Card className="card mb-3">
                <Card.Body>
                  <Card.Title className="card-title">{topic.title}</Card.Title>
                  <Card.Text className="card-description">{topic.description}</Card.Text>
                  <button className="answer-button">{topic.answers} Answers</button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <button className="read-more-button" onClick={loadMoreTopics}>
          Read More
        </button>
      </div>
    </div>
  );
}
