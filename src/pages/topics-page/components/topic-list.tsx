import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner, Badge, Dropdown } from 'react-bootstrap';
import './topic-list.css';
import { Topic } from '../models/topicModel';
import loupeImage from './img/loupe.png';
import { getTopics } from "services/apiService";

const TOPIC_DISPLAY = 15;

const TAGS = [
  'Math',
  'Science',
  'History',
  'English',
  'Geography',
  'Management',
  'Marketing',
  'Programming',
  'Hardware',
  'Fitness',
  'Psychology',
  'Music',
  'Literature'
];

export default function TopicList() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [visibleTopics, setVisibleTopics] = useState(TOPIC_DISPLAY);
  const [loading, setLoading] = useState(true);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [totalFilteredTopics, setTotalFilteredTopics] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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
        sortTopics(fetchedTopics, sortOrder);
      } catch (err) {
        setError("Failed to fetch topics.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, [sortOrder]);

  const sortTopics = (topicsArray: Topic[], order: 'newest' | 'oldest') => {
    const sortedTopics = topicsArray.sort((a, b) => {
      const dateA = new Date(a.datecreate).getTime();
      const dateB = new Date(b.datecreate).getTime();
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
    setTopics(sortedTopics);
    setFilteredTopics(sortedTopics);
    setTotalFilteredTopics(sortedTopics.length);
  };

  useEffect(() => {
    let updatedFilteredTopics = topics;

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      updatedFilteredTopics = updatedFilteredTopics.filter(topic =>
        topic.title.toLowerCase().includes(lowercasedTerm)
      );
    }

    if (selectedTag) {
      updatedFilteredTopics = updatedFilteredTopics.filter(topic =>
        topic.tags.includes(selectedTag)
      );
    }

    setFilteredTopics(updatedFilteredTopics);
    setTotalFilteredTopics(updatedFilteredTopics.length);
  }, [searchTerm, topics, selectedTag]);

  const visibleFilteredTopics = filteredTopics.slice(0, visibleTopics);

  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(' ');
    return words.length <= wordLimit ? description : `${words.slice(0, wordLimit).join(' ')}...`;
  };

  const handleCardClick = () => {
    navigate('/topic-details');
  };

  const handleGoAsk = () => {
    navigate('/create-question');
  };

  const handleSortChange = (newOrder: 'newest' | 'oldest') => {
    setSortOrder(newOrder);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : filteredTopics.length === 0 ? (
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
        <div className="topic-list-page">
          <div className="base-background">
            <div className="card-container">
              <div className="results-text">
                Results ({totalFilteredTopics})
              </div>

              <div className="both-dropdowns">
                {/* Sort Dropdown */}
                <div className="dropdown-container">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Sort by: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleSortChange('newest')}>Newest</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSortChange('oldest')}>Oldest</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                {/* Tag Filter Dropdown */}
                <div className="dropdown-container">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Filter by Tag: {selectedTag || 'Select a tag'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {TAGS.map((tag) => (
                        <Dropdown.Item key={tag} onClick={() => handleTagSelect(tag)}>
                          {tag}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Item onClick={() => setSelectedTag(null)}>Clear Filter</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
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
                        <button className="answer-button">
                          {topic.responseCount === 1 ? '1 Answer' : `${topic.responseCount} Answers`}
                        </button>
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
