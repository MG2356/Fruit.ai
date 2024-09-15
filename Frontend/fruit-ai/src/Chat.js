import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot", time: "10:30 AM" }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        text: input,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Add user message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");

      // Bot response after a delay
      setTimeout(() => {
        const botMessage = {
          text: "This is an auto-reply. How can I help further?",
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user-info">
          <img src="https://via.placeholder.com/40" alt="User Avatar" className="avatar" />
          <div className="user-details">
            <h4>John Doe</h4>
            <p className="status">Online</p>
          </div>
        </div>
        <div className="menu-icon">•••</div>
      </div>

      <div className="chat-date">24 October, Sunday</div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'right' : 'left'}`}>
            <div className="text-bubble">{message.text}</div>
            <span className="time-stamp">{message.time}</span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24">
              <path d="M2.01 21l20.99-9-20.99-9c-.67 0-1.01.78-.59 1.29l7.28 7.71-7.28 7.71c-.42.51-.08 1.29.59 1.29zm7.99-9l-7.99-7.99 7.99 7.99z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
