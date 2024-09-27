import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import './topic-details.css';
import user from './img/user.png';
import Ellipse from './img/Ellipse.png';
import time from './img/time.png';
import { Comment } from './models/detailsModels';
import {getQuestionDetails, fetchTopicReplies, saveReply, getComments, getCurrentUser} from 'services/apiService'; // Importă funcția pentru a obține detaliile întrebării

const fetchComments = (id: string | undefined): Comment[] => {
  const allComments = JSON.parse(localStorage.getItem('details-comments') || '{}');
  if (id && allComments[id]) {
    return allComments[id];
  }
  return [];
};

const saveCommentsToLocalStorage = (id: string | undefined, comments: Comment[]) => {
  const allComments = JSON.parse(localStorage.getItem('topicComments') || '{}');
  localStorage.setItem('topicComments', JSON.stringify(allComments));
};

const TopicDetails = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const [newMessage, setNewMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [topicFound, setTopicFound] = useState<boolean>(false);
  const [question, setQuestion] = useState<any>(null); // State pentru a stoca detaliile întrebării
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await getCurrentUser();
        if (resp) {
          setCurrentUser(resp.currentUser);
        } else {
          console.warn("User data is null or undefined");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    const fetchedComments = fetchComments(id);
    setComments(fetchedComments);
    setTopicFound(fetchedComments.length > 0);
    const getReplies = async () => {
      await fetchTopicReplies(id);
      setComments(getComments());
    }
    getReplies();
    const fetchQuestionDetails = async () => {
      // Verificăm dacă id este definit
      if (id) {
        try {
          const response = await getQuestionDetails(id);
          if (response && response.status) {
            setQuestion(response.data); // Stochează întrebarea în stare
            setTopicFound(true);
          } else {
            setTopicFound(false);
          }
        } catch (error) {
          console.error('Error fetching question details:', error);
          setTopicFound(false);
        }
      }
    };
    fetchQuestionDetails();

    const handleStorageChange = () => {
      const updatedComments = fetchComments(id);
      setComments(updatedComments);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [id]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  const addReply = async () => {
      let replyData = { newMessage, id }
      await saveReply(replyData);
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        authorName: currentUser.name,
        description: newMessage,
        createdAt: new Date().toLocaleDateString('ro-RO'),
        rating: 0,
      };
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      saveCommentsToLocalStorage(id, updatedComments);
      setNewMessage('');
      addReply();
    }
  };
  if (!topicFound && comments.length === 0) {
    return (
        <div className="base-background">
          {question ? (
              <Card className="simple-user-card mb-4">
                <Card.Body>
                  <div className="user-info">
                    <div className="user-image-container">
                      <img src={Ellipse} alt="Ellipse" className="user-ellipse" />
                      <img src={user} alt="user" className="user-image" />
                    </div>
                    <div>
                      <div className="username">{question.user.name}</div>
                      <div className="comment-content">
                        <strong>{question.description}</strong>
                      </div>
                      <p><strong>No answer</strong></p> {/* Afișează mesajul "No answer" */}
                    </div>
                    <div className="comment-date">{new Date().toLocaleDateString('ro-RO')}</div>
                  </div>
                </Card.Body>
              </Card>
          ) : (
              <div>
                <div className="input-group mb-4 fixed-input">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Write your answer"
                      value={newMessage}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                  />
                </div>

                <div className="no-comments">
                  <img src={time} alt="time" />
                  <h3>
                    <strong>Simple user</strong> is waiting for your help.
                  </h3>
                </div>
              </div>
          )}
        </div>
    );
  }

  return (
      <div className="base-background">
        <Card className="simple-user-card mb-4">
          <Card.Body>
            <div className="user-info">
              <div className="user-image-container">
                <img src={Ellipse} alt="Ellipse" className="user-ellipse" />
                <img src={user} alt="user" className="user-image" />
              </div>
              <div>
                <div className="username">{ question?.user.name || 'User'}</div>
                <div className="comment-content">
                  <strong>{question?.title || 'Lorem ipsum odor amet, consectetur adipiscing elit.'}</strong>
                  <div>{question?.description || 'Lorem ipsum odor amet, consectetur adipiscing elit.'}</div>
                </div>
              </div>
              <div className="comment-date">{new Date().toLocaleDateString('ro-RO')}</div>
            </div>
          </Card.Body>
        </Card>

        <div className="input-group mb-4 fixed-input">
          <input
              type="text"
              className="form-control"
              placeholder="Write your answer"
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
          />
        </div>

        <div className="comments-container">
          <Row>
            {comments.map((comment) => (
                <Col key={comment.id} md={12}>
                  <Card className="comment-card mb-3">
                    <Card.Body>
                      <div className="user-info">
                        <div className="comment-date">{comment.createdAt}</div>
                        <div className="user-image-container">
                          <img src={Ellipse} alt="Ellipse" className="user-ellipse" />
                          <img src={user} alt="user" className="user-image" />
                        </div>
                        <div>
                          <div className="username">{comment.authorName}</div>
                          <div className="comment-content">{comment.description}</div>
                        </div>
                      </div>
                      <div className="rating-stars">
                        {Array(5).fill(null).map((_, index) => (
                            <span
                                key={index}
                                className={`comment-star ${comment.rating > index ? 'selected' : ''}`}
                            >
                        ★
                      </span>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
            ))}
          </Row>
        </div>
      </div>
  );
};

export default TopicDetails;