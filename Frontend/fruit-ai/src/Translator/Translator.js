import React, { useState } from 'react';

function Translator() {
  const [inputText, setInputText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default to Spanish
  const [translatedText, setTranslatedText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const languageOptions = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'hi', name: 'Hindi' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'en', name: 'English' },
  ];

  // Function to detect the language
  const detectLanguage = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText })
      });
      
      const data = await response.json();
      if (data.data && data.data.detections) {
        setDetectedLanguage(data.data.detections[0][0].language);
      } else {
        setErrorMessage('Unable to detect language');
      }
    } catch (error) {
      setErrorMessage('Error occurred: ' + error.message);
    }
  };

  // Function to translate the text
  const translateText = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/translate", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText, targetLang: targetLanguage })
      });
      
      const data = await response.json();
      if (data.data && data.data.translations) {
        setTranslatedText(data.data.translations[0].translatedText);
      } else {
        setErrorMessage('Unable to translate text');
      }
    } catch (error) {
      setErrorMessage('Error occurred: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    detectLanguage();  // Detect language first
    translateText();   // Then translate text
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>  <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg"
            alt="Translate"
            className="translate-icon"
          /> Translator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text"
          style={{ padding: '10px', width: '300px' }}
        />
        <div style={{ marginTop: '10px' }}>
          <label>Translate to:</label>
          <select 
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            style={{ padding: '10px', marginLeft: '10px' }}
          >
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>Translate</button>
      </form>
      {translatedText && (
        <div style={{ marginTop: '20px' }}>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}   
      {detectedLanguage && (
        <div style={{ marginTop: '20px' }}>
          <h3>Detected Language:</h3>
          <p>{detectedLanguage}</p>
        </div>
      )}

    

      {errorMessage && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h3>Error:</h3>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Translator;
