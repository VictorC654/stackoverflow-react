import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner, Badge } from 'react-bootstrap';
import './topic-list.css';
import { Topic } from '../models/topicModel';
import loupeImage from './img/loupe.png';
import { getTopics } from "services/apiService";

const TOPIC_DISPLAY = 15;

export default function TopicList() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [visibleTopics, setVisibleTopics] = useState(TOPIC_DISPLAY);
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
      setVisibleTopics((prevVisibleTopics) => prevVisibleTopics + TOPIC_DISPLAY);
      setLoadingMore(false);
    }, 500);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const fetchedTopics = await getTopics();
        setTopics(fetchedTopics);
        setFilteredTopics(fetchedTopics);
        setTotalFilteredTopics(fetchedTopics.length);
      } catch (err) {
        setError("Failed to fetch topics.");
        console.error(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = topics.filter(topic => topic.title.toLowerCase().includes(lowercasedTerm));
      setFilteredTopics(filtered);
      setTotalFilteredTopics(filtered.length);
    } else {
      setFilteredTopics(topics);
      setTotalFilteredTopics(topics.length);
    }
  }, [searchTerm, topics]);

  const visibleFilteredTopics = filteredTopics.slice(0, visibleTopics);

  const handleCardClick = () => {
    navigate('/topic-details');
  };

  const handleGoAsk = () => {
    navigate('/create-question');
  };

  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(' ');
    if (words.length <= wordLimit) return description;
    return `${words.slice(0, wordLimit).join(' ')}...`;
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
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
      ) : (
        // Results section
        <div className="topic-list-page">
          <div className="base-background">
            <div className="card-container">
              <div className="results-text">
                Results ({totalFilteredTopics})
              </div>
              <Row className={topics.length === 1 ? 'single-result-card' : ''}>
                {visibleFilteredTopics.map((topic) => (
                  <Col key={topic.id} md={12}>
                    <Card className="card mb-3" onClick={handleCardClick}>
                      <Card.Body>
                        <Card.Title className="card-title">{topic.title}</Card.Title>
                        <Card.Text className="card-description">
                          {truncateDescription(topic.description, 30)}
                        </Card.Text>
                        <div className="tags-container">
                          {topic.tags.map((tag, index) => (
                            <Badge pill bg="secondary" key={index} className="tag-badge">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <button className="answer-button">Answers</button>
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
