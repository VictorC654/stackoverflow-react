import React, { useState, useEffect } from 'react'; 
import { Card, Row, Col } from 'react-bootstrap';
import './topic-details.css';
import time from './time.png';
import user from './user.png';
import Ellipse from './Ellipse.png';

interface Comment {
  id: number;
  username: string;
  comment: string;
  date: string;
  rating: number;
}

// Funcție pentru a genera un comentariu aleator
const generateRandomComment = (): string => {
  const comments = [
    'Aceasta este o opinie interesantă!',
    'Nu sunt sigur dacă înțeleg acest punct de vedere.',
    'Comentariu foarte util, mulțumesc!',
    'Este o idee bună, dar am o altă perspectivă.',
    'Ar fi interesant să aud mai multe detalii.'
  ];
  return comments[Math.floor(Math.random() * comments.length)];
};

// Simulate an API call with some initial data
const fetchInitialComments = (): Promise<Comment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulăm un răspuns gol inițial
      resolve([]);
    }, 1000); // Întârziere de 1 secundă pentru a simula apelul API
  });
};

// Simulate fetching dynamic comments
const fetchDynamicComments = (): Comment[] => {
  return Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    username: 'Alt user',
    comment: generateRandomComment(),
    date: new Date().toLocaleDateString('ro-RO'),
    rating: 5,
  }));
};

export default function TopicDetails() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [dynamicComments, setDynamicComments] = useState<Comment[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [hasAddedFirstComment, setHasAddedFirstComment] = useState(false);

  // Simulăm apelul API pentru a obține comentariile inițiale
  useEffect(() => {
    fetchInitialComments().then((initialComments) => {
      setComments(initialComments);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      const newResponse: Comment = {
        id: comments.length + dynamicComments.length + 1,
        username: 'Alt user',
        comment: newMessage,
        date: new Date().toLocaleDateString('ro-RO'),
        rating: 5,
      };

      // Check if the first comment was added
      if (!hasAddedFirstComment) {
        // Add dynamic comments when the first comment is added
        const dynamicCommentsList = fetchDynamicComments();
        setDynamicComments(dynamicCommentsList);
        setHasAddedFirstComment(true);
      }

      // Add the new comment to the list
      setComments([...comments, newResponse]);
      setNewMessage(''); // Reset the input field
    }
  };

  return (
    <div className="base-background">
      <Card className="simple-user-card mb-4">
        <Card.Body>
          <div className="user-info">
            <div className="comment-date">10.12.2003</div>
            <div className="user-image-container">
              <img src={Ellipse} alt="Ellipse" className="user-ellipse" />
              <img src={user} alt="user" className="user-image" />
            </div>
            <div>
              <div className="username">Simple user</div>
              <div className="comment-content">
                <strong>Lorem ipsum odor amet, consectetur adipiscing elit.</strong>
                <p>
                  Ut volutpat tristique sodales nascetur orci. Neque erat montes cubilia non accumsan volutpat cursus orci.
                </p>
              </div>
            </div>
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
        {comments.length > 0 || dynamicComments.length > 0 ? (
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
                        <span key={index} className="comment-star">★</span>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {/* Render dynamic comments after the first user comment */}
            {hasAddedFirstComment &&
              dynamicComments.map((comment) => (
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
                          <span key={index} className="comment-star">★</span>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        ) : (
          <div className="no-comments">
            <img src={time} alt="time" />
            <h3>Simple user is waiting for your help.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
