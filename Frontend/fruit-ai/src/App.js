import React from 'react';
//import './App.css';
import Login from './Authentication/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import About from './About/About';
import Faq from './FAQ/Faq';
import Translator from './Translator/Translator';
import FaqDetail from './FAQ/FaqDetail';
import ChatBot from './Chatbot/ChatBot';
const App = () => {
  return (
<>
<Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<ChatBot />} />

      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/translate" element={<Translator />} />
      <Route path="/faqs/:id" element={<FaqDetail />} />
      

        
      </Routes>
    </Router>
{/* <Chat/> */}
</>
  );
};

export default App;
