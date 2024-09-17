import React, { useState, useEffect } from 'react'; 
import { Card, Row, Col } from 'react-bootstrap';
import './topic-details.css';
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

// Funcție pentru a simula un apel API folosind localStorage
const simulateApiCall = (): Promise<Comment[]> => {
  return new Promise((resolve) => {
    const storedComments = JSON.parse(localStorage.getItem('details-comments') || '[]');
    if (storedComments.length > 0) {
      resolve(storedComments);
    } else {
      const simulatedComments: Comment[] = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        username: 'Alt user',
        comment: generateRandomComment(),
        date: new Date().toLocaleDateString('ro-RO'),
        rating: 5, // Setăm rating-ul inițial la 5 pentru toate comentariile generate
      }));
      localStorage.setItem('details-comments', JSON.stringify(simulatedComments));
      resolve(simulatedComments);
    }
  });
};

const Details = () => {
  const [newMessage, setNewMessage] = useState(''); // State to store new comment
  const [comments, setComments] = useState<Comment[]>([]); // State to store all comments

  useEffect(() => {
    // Verificăm dacă aplicația este pornită pentru prima dată în sesiune
    if (!sessionStorage.getItem('initialized')) {
      // Ștergem comentariile salvate dacă este prima pornire a aplicației
      localStorage.removeItem('details-comments');
      sessionStorage.setItem('initialized', 'true');
    }

    // Simulăm preluarea comentariilor
    simulateApiCall().then(fetchedComments => {
      setComments(fetchedComments);
    });
  }, []);

  // Save comments to localStorage when comments are updated
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('details-comments', JSON.stringify(comments));
    }
  }, [comments]);

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // Function to handle 'Enter' press and add a new comment at the start
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        username: 'Alt user',
        comment: newMessage,
        date: new Date().toLocaleDateString('ro-RO'),
        rating: 0, // Initially set the rating to 0
      };

      setComments([newComment, ...comments]); // Add the new comment at the start of the comments array
      setNewMessage(''); // Clear the input field
    }
  };

  // Function to handle rating change
  const handleRatingChange = (commentId: number, rating: number) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, rating } : comment
    );
    setComments(updatedComments);
  };

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
                <p>
                  Ut volutpat tristique sodales nascetur orci. Neque erat montes cubilia non accumsan volutpat cursus orci.
                </p>
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
          onKeyPress={handleKeyPress} // Handle key press (Enter)
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

export default Details;
