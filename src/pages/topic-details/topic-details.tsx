import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card, Row, Col, Badge } from 'react-bootstrap'; // Import Badge pentru taguri
import './topic-details.css';
import user from './img/user.png';
import Ellipse from './img/Ellipse.png';
import time from './img/time.png';
import { Comment } from './models/detailsModels';

// Listă generală de comentarii
const commentsList = [
  "Eu nu înțeleg ce ai scris, tradu te rog frumos.",
  "În ce limbă ai scris?",
  'Aceasta este o opinie interesantă!',
  'Nu sunt sigur dacă înțeleg acest punct de vedere.',
  "Întrebarea nu este bine formulată.",
  "Acest subiect este discutat prea puțin aici.",
  "Cred că ar trebui să existe mai multe detalii."
];

// Functie care generează comentarii unice pentru un topic pe baza id-ului
const generateCommentsForTopic = (topicId: number): Comment[] => {
  return Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    username: "Alt user",
    comment: commentsList[(topicId * index) % commentsList.length],
    date: `${10 + index}.10.2024`,
    rating: 0
  }));
};

// API fictiv pentru obținerea datelor utilizatorului curent
const fetchCurrentUser = async (): Promise<string> => {
  try {
    const response = await new Promise<{ username: string }>((resolve) =>
      resolve({ username: 'Simple User' })
    );
    return response.username;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return 'Simple User';
  }
};

const TopicDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [newMessage, setNewMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<string>('Simple User');

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const topicData = { 
          title: `Topic ${id || 'New Topic'}`, 
          createdBy: 'Anonymous', 
          createdDate: new Date(),
          tags: ['tag1', 'tag2', 'general'] // Adaugăm tagurile aici
        };
        setTopic(topicData);

        // Verificăm dacă parametrul isNew este setat la true
        const isNew = searchParams.get('isNew') === 'true';

        if (isNew) {
          setComments([]); // Nu afișăm comentarii predefinite pentru o întrebare nouă
        } else {
          const fetchedComments = generateCommentsForTopic(Number(id));
          setComments(fetchedComments);
        }

        const user = await fetchCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching topic or comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetData();
  }, [id, searchParams]);

  // Gestionăm input-ul utilizatorului
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // Gestionăm adăugarea unui nou comentariu
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        username: currentUser,
        comment: newMessage,
        date: new Date().toLocaleDateString('ro-RO'),
        rating: 0,
      };

      // Actualizăm lista de comentarii
      setComments([...comments, newComment]);

      // Resetăm câmpul de introducere a mesajului
      setNewMessage('');
    }
  };

  // Gestionăm actualizarea rating-ului unui comentariu
  const handleRatingChange = (commentId: number, rating: number) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, rating } : comment
    );
    setComments(updatedComments);
  };

  if (loading) {
    return <div>Loading topic details...</div>;
  }

  // Verificăm dacă topic nu este null înainte de a accesa proprietățile sale
  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="base-background">
      {/* Afișăm detaliile topicului */}
      <Card className="simple-user-card mb-4">
      <Card.Body>
    <div className="user-info">
      <div className="user-image-container">
        <img src={Ellipse} alt="Ellipse" className="user-ellipse" />
        <img src={user} alt="user" className="user-image" />
      </div>
      <div className="content-container">
        <div className="username">{topic.createdBy || 'Anonymous'}</div>
        <div className="comment-content">
          <strong>Lorem ipsum odor amet, consectetuer adipiscing elit.</strong>
          <p>Ut volutpat tristique sodales nascetur orci. Neque erat montes cubilia non accumsan volutpat cursus orci.</p>
        </div>

        {/* Afișăm doar primul tag sub descriere */}
        {topic.tags && topic.tags.length > 0 && (
  <div className="tags-container" style={{ marginTop: '10px' }}>
    <Badge pill bg="secondary" className="tag-badge">
      {topic.tags[0].replace(/[0-9]/g, '')} 
    </Badge>
  </div>
)}
      </div>
      <div className="comment-date">
        {topic.createdDate ? new Date(topic.createdDate).toLocaleDateString('ro-RO') : 'Unknown date'}
      </div>
    </div>
  </Card.Body>
</Card>

      {/* Input pentru adăugarea unui nou comentariu */}
      <div className="input-group mb-4 fixed-input" style={{ position: 'relative', bottom: '0px', marginTop: '20px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Write your answer"
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* Afișăm comentariile noi adăugate */}
      {comments.length > 0 ? (
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
                    {/* Adăugăm stelele pentru rating */}
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
      ) : (
        <div className="no-answer-container">
          <img src={time} alt="time" />
          <p>Simple user is waiting for your help.</p>
        </div>
      )}
    </div>
  );
};

export default TopicDetails;
