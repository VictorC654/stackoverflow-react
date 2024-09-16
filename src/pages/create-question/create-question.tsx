import React, { useState } from 'react';
import './create-question.css';

// Enum for subjects
enum Subject {
    Math = 'Math',
    Science = 'Science',
    History = 'History',
    English = 'English',
    Geography = 'Geography',
    Management = 'Management',
    Marketing = 'Marketing',
    Programming = 'Programming',
    Hardware = 'Hardware',
    Fitness = 'Fitness',
    Psychology = 'Psychology',
    Music = 'Music',
    Literature = 'Literature',
}

const subjects = Object.values(Subject);

const CreateQuestion = () => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            title,
            details,
            subject
        });
        // mock data
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
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />

                <label htmlFor="subject"></label>
                <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    <option value="" disabled>Select a subject</option>
                    {subjects.map((subj) => (
                        <option key={subj} value={subj}>
                            {subj}
                        </option>
                    ))}
                </select>

                <button type="submit">ASK YOUR QUESTION</button>
            </form>
        </div>
    );
};

export default CreateQuestion;
