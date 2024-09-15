import React, { useState } from 'react';
import './ChatUI.css';
import people from './people.jpg';

const ChatUI = () => {
  // State to store messages and input value
  const [messages, setMessages] = useState([
    { type: 'received', text: 'Hello, how can I help you?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = { type: 'sent', text: inputValue };

    // Add the user's message
    setMessages([...messages, newMessage]);

    // Auto-reply to "hello"
    if (inputValue.toLowerCase() === 'hello') {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'received', text: 'Hi' }
        ]);
      }, 1000); // Simulate a slight delay for the reply
    }

    // Clear the input field
    setInputValue('');
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle sending a message when pressing Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img className="profile-img" src={people} alt="profile" />
        <div className="profile-info">
          <h3>John Doe</h3>
          <p className="status">Online</p>
        </div>
      </div>

      <div className="chat-body">
        <div className="chat-date">24 October, Sunday</div>

        {/* Render chat messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.type === 'sent' ? 'sent' : 'received'}`}
          >
            <p>{msg.text}</p>
            <span className="time">10:30 AM</span>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          className="message-input"
          placeholder="Message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="send-btn" onClick={handleSendMessage}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
