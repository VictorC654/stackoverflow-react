import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import './topic-details.css';
import user from './img/user.png';
import Ellipse from './img/Ellipse.png';
import time from './img/time.png';
import { Comment } from './models/detailsModels'; 

const predefinedComments = [
  'Aceasta este o opinie interesantă!',
  'Nu sunt sigur dacă înțeleg acest punct de vedere.',
  'Comentariu foarte util, mulțumesc!',
  'Este o idee bună, dar am o altă perspectivă.',
  'Ar fi interesant să aud mai multe detalii.'
];

const fetchComments = (id: string | undefined): Comment[] => {
  const allComments = JSON.parse(localStorage.getItem('details-comments') || '{}');
  if (id && allComments[id]) {
    return allComments[id];
  } else if (!id && allComments['general']) {
    return allComments['general'];
  }
  return [];
};

const saveCommentsToLocalStorage = (id: string | undefined, comments: Comment[]) => {
  const allComments = JSON.parse(localStorage.getItem('details-comments') || '{}');
  if (id) {
    allComments[id] = comments;
  } else {
    allComments['general'] = comments;
  }
  localStorage.setItem('details-comments', JSON.stringify(allComments));
};

const clearCommentsOnStartup = () => {
  const isFirstRun = !sessionStorage.getItem('sessionInitialized');
  if (isFirstRun) {
    localStorage.removeItem('details-comments');
    sessionStorage.setItem('sessionInitialized', 'true');
  }
};

// Funcție pentru generarea comentariilor dinamice
const generatePredefinedComments = () => {
  return predefinedComments.map((text, index) => ({
    id: index + 1, 
    username: 'Alt user',
    comment: text,
    date: new Date().toLocaleDateString('ro-RO'),
    rating: 0 
  }));
};

const TopicDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [newMessage, setNewMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [topicFound, setTopicFound] = useState<boolean>(false);

  useEffect(() => {
    clearCommentsOnStartup();

    const fetchedComments = fetchComments(id);
    if (fetchedComments.length === 0 && !id) {
      const dynamicComments = generatePredefinedComments();
      setComments(dynamicComments);
      saveCommentsToLocalStorage(undefined, dynamicComments); 
    } else {
      setComments(fetchedComments);
    }

    setTopicFound(fetchedComments.length > 0);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        username: 'Alt user',
        comment: newMessage,
        date: new Date().toLocaleDateString('ro-RO'),
        rating: 0, 
      };
  
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      saveCommentsToLocalStorage(id, updatedComments);
      setNewMessage('');
    }
  };

  const handleRatingChange = (commentId: number, rating: number) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, rating } : comment
    );
    setComments(updatedComments);
    saveCommentsToLocalStorage(id, updatedComments);
  };

  if (!topicFound && comments.length === 0) {
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
                <div className="username">Simple user</div>
                <div className="comment-content">
                  <strong>Lorem ipsum odor amet, consectetur adipiscing elit.</strong>
                  <p>Ut volutpat tristique sodales nascetur orci. Neque erat montes cubilia non accumsan volutpat cursus orci.</p>
                </div>
              </div>
              <div className="comment-date">10.12.2003</div>
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

        <div className="no-comments">
          <img src={time} alt="time" />
          <h3>
            <strong>Simple user</strong> is waiting for your help.
          </h3>
        </div>
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
              <div className="username">Simple user</div>
              <div className="comment-content">
                <strong>Lorem ipsum odor amet, consectetur adipiscing elit.</strong>
                <p>Ut volutpat tristique sodales nascetur orci. Neque erat montes cubilia non accumsan volutpat cursus orci.</p>
              </div>
            </div>
            <div className="comment-date">10.12.2003</div>
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
                    <div className="comment-date">{comment.date}</div>
                    <div className="user-image-container">
                      <img src={Ellipse} alt="Ellipse" className="user-ellipse" />
                      <img src={user} alt="user" className="user-image" />
                    </div>
                    <div>
                      <div className="username">{comment.username}</div>
                      <div className="comment-content">{comment.comment}</div>
                    </div>
                  </div>
                  <div className="rating-stars">
                    {Array(5).fill(null).map((_, index) => (
                      <span
                        key={index}
                        className={`comment-star ${comment.rating > index ? 'selected' : ''}`}
                        onClick={() => handleRatingChange(comment.id, index + 1)}
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
