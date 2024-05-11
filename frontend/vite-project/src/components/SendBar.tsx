import React, { useState, useEffect, useRef } from 'react';

declare global {
    interface Window {
      webkitSpeechRecognition: any;
    }
  }

const SendBar = (props) => {
  //const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognition = useRef(new window.webkitSpeechRecognition()); // For Chrome


  useEffect(() => {
    recognition.current.lang = 'en-US';
    recognition.current.interimResults = true; // return interim results
    recognition.current.continuous = true; 
  
    recognition.current.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const speechToText = event.results[i][0].transcript;
          props.setTranscript((prevTranscript) => prevTranscript + ' ' + speechToText);
          props.setInputValue((prevInputValue) => prevInputValue + ' ' + speechToText);
        }
      }
    };
  
    recognition.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  
    recognition.current.onend = () => {
      if (isRecording) {
        recognition.current.start();
      }
    };
  }, []);

  const handleSpeechRecognition = () => {
    if (isRecording) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="card-footer container-fluid d-flex input chatbox-input">
      <button onClick={handleSpeechRecognition}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <textarea
        id="transcript"
        value={props.transcript}
        onChange={(e) => 
          {
           props.setTranscript(e.target.value)
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

export default SendBar;
