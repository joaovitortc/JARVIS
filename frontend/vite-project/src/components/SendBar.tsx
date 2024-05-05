import React, { useState } from 'react';

declare global {
    interface Window {
      webkitSpeechRecognition: any;
    }
  }

const SpeechToText = (props) => {
  const [transcript, setTranscript] = useState('');
  
  const handleSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition(); // For Chrome
    recognition.lang = 'en-US'; // Set the language
    recognition.start(); // Start recognition

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      props.setInputValue(speechToText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  };

  return (
    <div className="card-footer container-fluid d-flex input chatbox-input">
      <button onClick={handleSpeechRecognition}>Start Speech Recognition</button>
      <textarea
        value={transcript}
        onChange={(e) => 
          {
           setTranscript(e.target.value)
           props.handleInputChange(e)
          }}
        placeholder="Speak something..."
        rows={4}
        className="form-control"
      />
          <button className="btn btn-primary" onClick={props.handleMessageSend}>
            Send
          </button>
     </div>
     

    
  );
};

export default SpeechToText;
