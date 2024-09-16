import React, { useState, useEffect } from 'react'; 
import { Card } from 'react-bootstrap';
import './no-answer.css';
import Ellipse from './Ellipse.png'; 
import user from './user.png'; 
import time from './time.png'; 

interface Comment {
  id: number;
  username: string;
  comment: string;
  date: string;
  rating: number;
}

const NoAnswer = () => {
  const [newMessage, setNewMessage] = useState(''); // State to store new comment
  const [comments, setComments] = useState<Comment[]>([]); // State to store all comments

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // Clear localStorage if the session is new (for no-answer page)
  const clearCommentsOnProjectRestart = () => {
    if (!sessionStorage.getItem('noAnswerSessionInitialized')) {
      localStorage.removeItem('no-answer-comments');
      sessionStorage.setItem('noAnswerSessionInitialized', 'true');
    }
  };

  // Load comments from localStorage (specific for no-answer page)
  useEffect(() => {
    clearCommentsOnProjectRestart(); // Clear comments if it's a new session
    const storedComments = JSON.parse(localStorage.getItem('no-answer-comments') || '[]');
    setComments(storedComments);
  }, []);

  // Save comments to localStorage (specific for no-answer page)
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('no-answer-comments', JSON.stringify(comments));
    }
  }, [comments]);

  // Function to handle 'Enter' press and add a new comment
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        username: 'Alt user',
        comment: newMessage,
        date: new Date().toLocaleDateString('ro-RO'),
        rating: 0, // Initially set the rating to 0
      };

      setComments([newComment, ...comments]); // Add the new comment to the comments array
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
                <p>Ut volutpat tristique sodales nascetur orci. Neque erat montes cubilia non accumsan volutpat cursus orci.</p>
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

      {/* Display newly added comments */}
      {comments.map((comment) => (
        <Card key={comment.id} className="comment-card mb-3">
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

            {/* Rating stars */}
            <div className="rating-stars">
              {Array(5)
                .fill(null)
                .map((_, index) => (
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
      ))}

      {/* Default no-comments section when no comment is added */}
      {comments.length === 0 && (
        <div className="no-comments">
          <img src={time} alt="time" />
          <h3>
            <strong>Simple user</strong> is waiting for your help.
          </h3>
        </div>
      )}
    </div>
  );
};

export default NoAnswer;
