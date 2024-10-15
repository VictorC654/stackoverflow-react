import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import './topic-details.css';
import user from './img/user.png';
import Ellipse from './img/Ellipse.png';
import time from './img/time.png';
import { Comment } from './models/detailsModels';
import { getQuestionDetails, fetchTopicReplies, saveReply, getComments, getCurrentUser, addRatingStars } from 'services/apiService'; 

const TAGS = [
  'Math', 'Science', 'History', 'English', 'Geography',
  'Management', 'Marketing', 'Programming', 'Hardware', 'Fitness',
  'Psychology', 'Music', 'Literature'
];

// Funcția pentru a obține comentariile din localStorage
const fetchComments = (id: string | undefined): Comment[] => {
  const allComments = JSON.parse(localStorage.getItem('topicComments') || '{}');
  if (id && allComments[id]) {
    return allComments[id].sort((a: Comment, b: Comment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  return [];
};

// Funcția pentru a salva comentariile în localStorage
const saveCommentsToLocalStorage = (id: string | undefined, comments: Comment[]) => {
  if (!id) {
    console.error('ID is undefined, cannot save comments to local storage');
    return;
  }

  const allComments = JSON.parse(localStorage.getItem('topicComments') || '{}');
  allComments[id] = comments;
  localStorage.setItem('topicComments', JSON.stringify(allComments));
};

// Funcția pentru a obține toate ratingurile din localStorage
const fetchRatings = (): Record<number, number> => {
  try {
    const allRatings = JSON.parse(
      localStorage.getItem("commentRatings") || "{}"
    );
    return allRatings && typeof allRatings === "object" ? allRatings : {};
  } catch (error) {
    console.error("Error fetching ratings from localStorage:", error);
    return {}; // Dacă există o eroare, returnează un obiect gol
  }
};

// Funcția pentru a salva un rating în localStorage
const saveRatingsToLocalStorage = (commentId: number, rating: number) => {
  try {
    const allRatings = JSON.parse(
      localStorage.getItem("commentRatings") || "{}"
    );
    if (typeof allRatings !== "object") {
      throw new Error("Invalid ratings format in localStorage");
    }

    allRatings[commentId] = rating; 
    localStorage.setItem("commentRatings", JSON.stringify(allRatings)); 
  } catch (error) {
    console.error("Error saving rating to localStorage:", error);
  }
};

const TopicDetails = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const [newMessage, setNewMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [topicFound, setTopicFound] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [question, setQuestion] = useState<any>({});

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
    const sortedFetchedComments = fetchedComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    // Obține ratingurile din localStorage
    const savedRatings = fetchRatings();

    // Combină comentariile cu ratingurile corespunzătoare
    const commentsWithRatings = fetchedComments.map((comment) => ({
      ...comment,
      rating: savedRatings[comment.id] || 0,
    }));

    setComments(commentsWithRatings);
    setTopicFound(commentsWithRatings.length > 0);
    
    const getReplies = async () => {
      await fetchTopicReplies(id);
      const commentsFromReplies = getComments();
      const sortedReplies = commentsFromReplies.sort((a: Comment, b: Comment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const repliesWithRatings = sortedReplies.map((reply: Comment) => ({
        ...reply,
        rating: savedRatings[reply.id] || 0,
      }));

      setComments(repliesWithRatings);
    };
    
    getReplies();
  
    const fetchQuestionDetails = async () => {
      if (id) {
        try {
          const response = await getQuestionDetails(id);
          if (response && response.status) {
            setQuestion(response.data);
            setSelectedTags(response.data.tags || []);
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
      const sortedComments = updatedComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setComments(sortedComments);
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
    let replyData = { newMessage, id };
    await saveReply(replyData);
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Când apasă Enter pentru a adăuga un comentariu nou
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        authorName: currentUser?.name || 'Anonymous',
        description: newMessage,
        createdAt: new Date().toISOString(),
        rating: 0,
        tags: [],
      };
  
      // Adăugăm comentariul nou și sortăm lista de comentarii
      const updatedComments = [newComment, ...comments];
      const sortedComments = updatedComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setComments(sortedComments);
      saveCommentsToLocalStorage(id, sortedComments);
      setNewMessage('');
      addReply();
    }
  };
  
  // Funcție pentru actualizarea ratingului unui comentariu
  const handleRatingClick = async (commentId: number, rating: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, rating };
      }
      return comment;
    });

    setComments(updatedComments);
    saveCommentsToLocalStorage(id, updatedComments);
    saveRatingsToLocalStorage(commentId, rating);
    const savedRatings = fetchRatings();

    try {
      await addRatingStars(commentId, rating);
    } catch (error) {
      console.error("Error submitting rating:", error);
      const revertedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, rating: savedRatings[commentId] || 0 };
        }
        return comment;
      });
      setComments(revertedComments);
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
                  <div className="username">{question.user?.name}</div>
                  <div className="comment-content">
                    <strong>{question.description}</strong>
                    <div className="tags-container">
                      {question?.tags?.map((tag: string, index: number) => (
                        <Badge pill bg="secondary" key={index} className="tag-badge">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p><strong>No answer</strong></p>
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
              <div className="username">{question?.user?.name || 'User'}</div>
              <div className="comment-content">
                <strong>{question?.title || 'Lorem ipsum odor amet, consectetur adipiscing elit.'}</strong>
                <div>{question?.description || 'Lorem ipsum odor amet, consectetur adipiscing elit.'}</div>
                <div className="tags-container">
                  {question?.tags?.map((tag: string, index: number) => (
                    <Badge pill bg="secondary" key={index} className="tag-badge">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="comment-date">{new Date().toLocaleDateString('ro-RO')}</div>
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

      {comments.length === 0 && (
        <div className="no-comments">
          <img src={time} alt="time" />
          <h3>
            <strong>Simple user</strong> is waiting for your help.
          </h3>
        </div>
      )}

      <div className="comments-container">
        <Row>
          {comments.map((comment) => (
            <Col key={comment.id} md={12}>
              <Card className="comment-card mb-3">
                <Card.Body>
                  <div className="user-info">
                    <div className="comment-date">{new Date(comment.createdAt).toLocaleDateString('ro-RO')}</div>
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
                        onClick={() => handleRatingClick(comment.id, index + 1)}
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
