import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './create-question.css';
import { createQuestion } from 'services/apiService';

const subjects = [
    { label: 'Math', value: 'Math' },
    { label: 'Science', value: 'Science' },
    { label: 'History', value: 'History' },
    { label: 'English', value: 'English' },
    { label: 'Geography', value: 'Geography' },
    { label: 'Management', value: 'Management' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Programming', value: 'Programming' },
    { label: 'Hardware', value: 'Hardware' },
    { label: 'Fitness', value: 'Fitness' },
    { label: 'Psychology', value: 'Psychology' },
    { label: 'Music', value: 'Music' },
    { label: 'Literature', value: 'Literature' },
];

const CreateQuestion: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [userId, setUserId] = useState<number>(1); // Presupunând că ID-ul utilizatorului este 1
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const isFormValid = () => {
        return title.trim() !== '' && description.trim() !== '' && tags.length > 0;
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTag = e.target.value;
        if (!tags.includes(selectedTag)) {
            setTags([...tags, selectedTag]);
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!isFormValid()) {
            setError('All fields are required');
            return;
        }
    
        const questionData = {
            title: title.trim(),
            description: description.trim(),
            tags,
            userId: Number(userId),
        };
    
        console.log('Data being sent:', questionData);
    
        try {
            const response = await createQuestion(questionData);
            console.log('Server response:', response);
    
            // Verifică dacă răspunsul este valid
            if (response) {
                const questionId = response.data.id; // Extrage ID-ul întrebării
    
                // Verifică dacă ID-ul întrebării este definit
                if (questionId !== undefined && questionId !== null) {
                    // Navighează către pagina de detalii cu ID-ul întrebării
                    navigate(`/topic-details/${questionId}`);
                    console.log('Question created successfully');
                } else {
                    setError('Question ID is missing from the server response');
                }
            } else {
                setError('Failed to create question: ' + (response || 'Unknown error'));
            }
        } catch (error: any) {
            console.error('Error creating question:', error.response?.data || error.message);
            setError('Failed to create question');
        }
    };
    
    
    return (
        <div className="create-question-container">
            <h2>Ask a question about assignment</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Be specific and imagine you're asking a question to another person."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="details">What are the details of your problem?</label>
                <textarea
                    id="details"
                    placeholder="Write your question here (Keep it simple and clear to get the best answer)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="subject"></label>
                <select
                    id="subject"
                    value=""  
                    onChange={handleTagChange}
                >
                    <option value="" disabled>Select a subject</option>
                    {subjects.map((subj) => (
                        <option key={subj.value} value={subj.value}>
                            {subj.label}
                        </option>
                    ))}
                </select>

                <div className="selected-tags">
                    {tags.length > 0 && (
                        <ul>
                            {tags.map((tag) => (
                                <li key={tag}>
                                    {tag} 
                                    <span className="remove-tag" onClick={() => handleRemoveTag(tag)}>x</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button type="submit">ASK YOUR QUESTION</button>

                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default CreateQuestion;


