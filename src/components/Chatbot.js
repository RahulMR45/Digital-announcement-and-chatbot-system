import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Chatbot.css";

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('Checking...');
  const [language, setLanguage] = useState('en'); // Default language is English

  useEffect(() => {
    const testServer = async () => {
      try {
        await axios.get('http://localhost:5000/test');
        setServerStatus('Connected');
      } catch (error) {
        setServerStatus('Not Connected');
        console.error('Server connection test failed:', error);
      }
    };
    testServer();
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    
    const endpoints = [
      'http://localhost:5000/chatbot',
      'http://localhost:5000/api/chatbot'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.post(endpoint, {
          message: userInput.trim(),
          language: language, // Send selected language
        });

        setResponses(prev => [...prev, {
          user: userInput,
          bot: response.data.reply
        }]);
        setUserInput('');
        setIsLoading(false);
        return;
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}:`, error);
      }
    }

    setResponses(prev => [...prev, {
      user: userInput,
      bot: 'Failed to connect to the server. Please try again.'
    }]);
    setIsLoading(false);
    setUserInput('');
  };

  return (
    <div className="chatbot-container p-4">
      <h2 className="chatbot-title">Chatbot</h2>
      <p className="server-status">Server Status: {serverStatus}</p>

      <div className="responses-container">
        {responses.map((res, index) => (
          <div key={index} className="response-item">
            <p><strong>You:</strong> {res.user}</p>
            <p><strong>Bot:</strong> {res.bot}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chatbot-form">
     <center> <select value={language} onChange={handleLanguageChange} className="language-selector">
        <option value="en">English</option>
        <option value="kn">Kannada</option>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="ml">Malayalam</option>
      </select>
      </center>
        <br />
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={isLoading}
          className="user-input"
          required
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="send-button"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
