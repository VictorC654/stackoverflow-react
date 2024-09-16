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

// Funcție pentru a simula un apel API folosind fetch
const fetchCommentsFromApi = async (): Promise<Comment[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=20');
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();

    const comments = data.map((comment: any, index: number) => ({
      id: index + 1,
      username: 'Alt user',
      comment: generateRandomComment(),
      date: new Date().toLocaleDateString('ro-RO'),
      rating: 0, // Inițial toate rating-urile sunt zero
    }));

    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

const Details = () => {
  const [newMessage, setNewMessage] = useState(''); // State to store new comment
  const [comments, setComments] = useState<Comment[]>([]); // State to store all comments

  // Clear localStorage if the session is new (for details page)
  const clearCommentsOnProjectRestart = () => {
    if (!sessionStorage.getItem('detailsSessionInitialized')) {
      localStorage.removeItem('details-comments');
      sessionStorage.setItem('detailsSessionInitialized', 'true');
    }
  };

  // Load comments from localStorage (specific for details page) or from API if empty
  useEffect(() => {
    clearCommentsOnProjectRestart();
    const storedComments = JSON.parse(localStorage.getItem('details-comments') || '[]');

    if (storedComments.length === 0) {
      // Dacă nu există comentarii în localStorage, le încărcăm de la API
      fetchCommentsFromApi().then(fetchedComments => {
        setComments(fetchedComments);
        localStorage.setItem('details-comments', JSON.stringify(fetchedComments)); // Salvează comentariile API
      });
    } else {
      setComments(storedComments); // Load from localStorage if available
    }
  }, []);

  // Save comments to localStorage (specific for details page)
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
      {/* Existing card with static data */}
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

      {/* Input field for adding new comments */}
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
