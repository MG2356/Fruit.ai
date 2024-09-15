import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="app">
      <h1 className="heading">Fruit.AI</h1>
      <p className="subheadding">"Be Healthy!"</p>
      <div className="grid-container">
        <div className="grid-item chat"><Link to="/chat"><label className="chat_label">Chat.</label></Link></div>
        <div className="grid-item empty_2"></div>
        <div className="grid-item empty_1"></div>

        <div className="grid-item translate">
          <Link to="/translate">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg"
            alt="Translate"
            className="translate-icon"
          />
          </Link>
        </div>
        
        <div className="grid-item faqs"><Link to="/faq"><label className="faqs_label">FAQs</label></Link></div>
        <div className="grid-item about"><Link to="/about"><label className="about_label">About</label></Link></div>
      </div>
    </div>
  );
};

export default Home;
