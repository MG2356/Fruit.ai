import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ isLoggedIn }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    // Check if login was successful by accessing the state
    if (location.state && location.state.loggedIn) {
      toast.success("Welcome back! You have successfully logged in.");
    }
  }, [location]);
  useEffect(() => {
    // Simulate a loading delay (e.g., 2 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);

    
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success('You are successfully logged in!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [isLoggedIn]);

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div className="loader">
          {/* You can use any loader here, either a spinner or custom animation */}
          <p>Loading...</p>
        </div>
      ) : (
        <>
            <div className="app">
          <h1 className="heading">Fruit.AI</h1>
          <p className="subheadding">"Be Healthy!"</p>
          <div className="grid-container">
            <div className="grid-item chat">
              <Link to="/chat">
                <label className="chat_label">Chat</label>
              </Link>
            </div>
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

            <div className="grid-item faqs">
              <Link to="/faq">
                <label className="faqs_label">FAQs</label>
              </Link>
            </div>
            <div className="grid-item about">
              <Link to="/about">
                <label className="about_label">About</label>
              </Link>
            </div>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
