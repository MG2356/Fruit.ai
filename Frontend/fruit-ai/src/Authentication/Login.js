import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import {apiUrl} from '../utils/app.utils' 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to backend for login
      const response = await axios.post(`${apiUrl}/login`, {
        username,
        password
      });
      

      // Assuming the backend responds with the token in the response body
      if (response.status === 200 && response.data.access_token) {
        const { token } = response.data;

        // Save the token in localStorage
        localStorage.setItem("authToken", token);

        // Show success toast
        toast.success("Login successful!");

        // Redirect to a protected route (e.g., dashboard)
        navigate("/Home" ,{ state: { loggedIn: true } });
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle different error cases
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Invalid credentials.");
      } else if (error.response && error.response.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="login-page">
      <ToastContainer /> {/* Toastify container to show notifications */}
      <div className="login-container">
        <h2>Login</h2>
        <p>
          By signing in you are agreeing to our{" "}
          <a href="#privacy">Term and privacy policy</a>
        </p>
        <div className="tab-container">
          <span className="active-tab">Login</span>
          <span>              <Link to="/signup">
          Register </Link></span>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="icon email-icon">
              <i className="fas fa-envelope"></i>
            </i>
            <input
              type="email"
              placeholder="Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <i className="icon password-icon">
              <i className="fas fa-lock"></i>
            </i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="icon eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <i className="fa fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </i>
          </div>
          <div className="options-container">
            <label>
              <input type="checkbox" /> 
            </label>
            Remember password
            <a href="#forgot" className="forgot-password">
              Forget password
            </a>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="social-container">
          <div className="social-icons">
            <a href="#facebook" className="social-icon facebook-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white"  width="24" height="24" viewBox="0 0 320 512">
            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/></svg>            </a>
            <a href="#instagram" className="social-icon instagram-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white"  width="24" height="24" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>            </a>
            <a href="#pinterest" className="social-icon pinterest-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white"  width="24" height="24" viewBox="0 0 384 512"><path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/></svg>            </a>
            <a href="#linkedin" className="social-icon linkedin-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white"  width="24" height="24" viewBox="0 0 448 512"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>            </a>
          </div>
          <p>or connect with</p>

        </div>
      </div>
    </div>
  );
};

export default Login;
