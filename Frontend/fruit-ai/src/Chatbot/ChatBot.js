import React, { useState, useEffect } from 'react';
import './Chat.css'; // Ensure this file contains necessary styling for the chat UI
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons for the send and clear buttons
import people from '../people.jpg';
const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Automatic bot messages at intervals
    const intervalId = setInterval(() => {
      addBotMessage(getRandomAutomaticMessage());
    }, 10000); // 10 seconds interval for automatic bot message

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // Add a new bot message
  const addBotMessage = (text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  // Handle the user's message input and sending
  const handleUserMessage = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (inputMessage.trim() === '') return; // Prevent sending empty message

    const newUserMessage = {
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Clear input field
    setInputMessage('');

    // Generate bot response after a delay
    setTimeout(() => {
      generateResponse(inputMessage);
    }, 1000);
  };

  // Generate bot response based on user message
  const generateResponse = (message) => {
    const questionResponses = {
      'how are you': 'I am just a bot, but thanks for asking!',
      'what is your name': 'I am a chatbot.',
      'hello': 'Hi!',
      'java': 'Java is a popular programming language.',
      'good': 'Good Morning!',
      'me': 'Munish Goel',
    };

    const response = questionResponses[message.toLowerCase()] || "I'm not sure how to answer that. Try asking something else!";
    addBotMessage(response);
  };

  // Generate random automatic bot message
  const getRandomAutomaticMessage = () => {
    const automaticMessages = [
      "I'm a chatbot!",
      'How can I assist you today?',
      'Feel free to ask me anything.',
    ];

    const randomIndex = Math.floor(Math.random() * automaticMessages.length);
    return automaticMessages[randomIndex];
  };

  // Clear chat messages
  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="user-info">
          <img src={people} alt="User Avatar" className="avatar" />
          <div className="user-details">
            <h4>John Doe</h4>
            <p className="status">Online</p>
          </div>
        </div>
        <div className="menu-icon">•••</div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'right' : 'left'}`}>
            <div className="text-bubble">{message.text}</div>
            <span className="time-stamp">{message.time}</span>
          </div>
        ))}
      </div>

      {/* Chat Input Form */}
      <div className="chat-input">
        <form onSubmit={handleUserMessage}>
          <input
            type="text"
            placeholder="Message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUserMessage(e)} // Handle Enter key for message submission
          />
          <button type="submit" className="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24">
              <path d="M2.01 21l20.99-9-20.99-9c-.67 0-1.01.78-.59 1.29l7.28 7.71-7.28 7.71c-.42.51-.08 1.29.59 1.29zm7.99-9l-7.99-7.99 7.99 7.99z" />
            </svg>
          </button>
          <button type="button" className="clear-button" onClick={clearChat}>
            <i className="bi bi-x"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
