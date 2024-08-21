import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';

function Onboarding() {
  const [responses, setResponses] = useState({});
  const history = useHistory();

  const questions = [
    { id: 1, text: "How do you prefer to learn new information?" },
    { id: 2, text: "What type of activities do you enjoy most?" },
    { id: 3, text: "How do you best remember information?" }
  ];

  const handleResponse = (questionId, response) => {
    setResponses({ ...responses, [questionId]: response });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/user/analyze-learning-style', { responses });
      history.push('/');
    } catch (error) {
      console.error('Onboarding error:', error);
    }
  };

  return (
    <div className="onboarding">
      <h2>Let's get to know you!</h2>
      {questions.map(question => (
        <div key={question.id}>
          <p>{question.text}</p>
          <textarea onChange={(e) => handleResponse(question.id, e.target.value)}></textarea>
        </div>
      ))}
      <button onClick={handleSubmit}>Complete Onboarding</button>
    </div>
  );
}

export default Onboarding;