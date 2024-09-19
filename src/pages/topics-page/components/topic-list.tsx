import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import './topic-list.css';
import { Topic } from '../models/topicModel';
import { fetchMockData } from '../services/topicFetch';
import loupeImage from './img/loupe.png';

const TOPIC_COUNT = 15;
const TOTAL_TOPICS = 45;

export default function TopicList() {
  const [topics, setTopics] = useState<Topic[]>([]); 
  const [visibleTopics, setVisibleTopics] = useState(TOPIC_COUNT);
  const [loading, setLoading] = useState(true);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]); 
  const [totalFilteredTopics, setTotalFilteredTopics] = useState(0); 
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';

  const loadMoreTopics = () => {
    setLoadingMore(true);
    
    setTimeout(() => {
      setVisibleTopics((prevVisibleTopics) => prevVisibleTopics + TOPIC_COUNT);
      setLoadingMore(false);
    }, 500); 
  };
  

  useEffect(() => {
    const fetchInitialTopics = async () => {
      setLoading(true);
      setError(null);
      try {
        const initialTopics = await fetchMockData(0, TOTAL_TOPICS); 
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
      setTotalFilteredTopics(filtered.length); 
    } else {
      setFilteredTopics(topics); 
      setTotalFilteredTopics(TOTAL_TOPICS); 
    }
  }, [searchTerm, topics]);

  const visibleFilteredTopics = filteredTopics.slice(0, visibleTopics);

  const handleCardClick = () => {
    navigate('/topic-details');
  };

  const handleGoAsk = () => {
    navigate('/create-question');
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : filteredTopics.length === 0 ? (
        // No results found section
        <div className="topic-not-found-container">
          <Card className="card">
            <Card.Img variant="top" src={loupeImage} alt="Questions Not Found" />
            <Card.Body>
              <Card.Text>
                We couldn't find the topic you're looking for.<br />
                Try different or less specific keywords.
              </Card.Text>
              <button className="ask-button" onClick={handleGoAsk}>
                ASK YOUR QUESTION
              </button>
            </Card.Body>
          </Card>
        </div>
      ) : null}

      {/* Results section */}
      {filteredTopics.length !== 0 && (
        <div className="topic-list-page">
          <div className="base-background">
            <div className="card-container">
              <div className="results-text">
                Results  ({totalFilteredTopics}) 
              </div>
              <Row className={filteredTopics.length === 1 ? 'single-result-card' : ''}>
                {visibleFilteredTopics.map((topic) => (
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
                {loadingMore ? (
                  <Spinner animation="border" variant="dark" />
                ) : (
                  visibleTopics < totalFilteredTopics && (
                    <button className="read-more-button" onClick={loadMoreTopics}>
                      Read More
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
