import React from 'react';
//import './App.css';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Faq from './Faq';
import Translator from './Translator';
import FaqDetail from './FAQ/FaqDetail';
import ChatUI from './ChatUI';
import ChatBot from './Translator/ChatBot';
const App = () => {
  return (
<>
<Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chatui" element={<ChatUI />} />
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
