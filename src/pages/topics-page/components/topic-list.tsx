import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import './topic-list.css';
import { Topic } from '../models/topicModel';
import { fetchMockData } from '../services/topicFetch';

const TOPIC_COUNT = 15;
const TOTAL_TOPICS = 45;

export default function TopicList() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [visibleTopics, setVisibleTopics] = useState(TOPIC_COUNT);
  const [loading, setLoading] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';

  const loadMoreTopics = async () => {
    setLoading(true);
    setError(null);
    try {
      const newTopics = await fetchMockData(visibleTopics, TOPIC_COUNT);
      setTopics((prevTopics) => [...prevTopics, ...newTopics]);
      setVisibleTopics((prevVisibleTopics) => prevVisibleTopics + TOPIC_COUNT);
    } catch (err) {
      setError('Failed to load more topics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialTopics = async () => {
      setLoading(true);
      setError(null);
      try {
        const initialTopics = await fetchMockData(0, TOPIC_COUNT);
        setTopics(initialTopics);
      } catch (err) {
        setError('Failed to fetch topics :(');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialTopics();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = topics.filter(topic => topic.title.toLowerCase().includes(lowercasedTerm));
      setFilteredTopics(filtered);
    } else {
      setFilteredTopics(topics);
    }
  }, [searchTerm, topics]);

  const handleCardClick = () => {
    navigate('/topic-details');
  };

  return (
    <div className="topic-list-page">
      <div className="base-background">
        <div className="card-container">
          <div className="results-text">
            Results ({filteredTopics.length})
          </div>
          <Row>
            {filteredTopics.map((topic) => (
              <Col key={topic.id} md={12}>
                <Card className="card mb-3" onClick={handleCardClick}>
                  <Card.Body>
                    <Card.Title className="card-title">{topic.title}</Card.Title>
                    <Card.Text className="card-description">{topic.description}</Card.Text>
                    <button className="answer-button">{topic.answers} Answers</button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="read-more-container">
            {loading ? (
              <Spinner animation="border" variant="dark" />
            ) : (
              visibleTopics < TOTAL_TOPICS && (
                <button className="read-more-button" onClick={loadMoreTopics}>
                  Read More
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}