import React, { useState, useEffect } from "react";
import Message from "./Message";
import SendBar from "./SendBar";

function ChatBox(props) {
  const [message, setMessage] = useState({ text: "", sender: "" });
  const [messages, setMessages] = useState([{ text: "", sender: "" }]); //array of messages
  const [inputValue, setInputValue] = useState("");
  const [transcript, setTranscript] = useState('');

  const  handleMessageSend = async () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "user" },
      ]);
      setInputValue("");
     
      try {
        const response = await fetch("http://localhost:8080/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputValue,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        setTranscript("");  
        // If the response is successful, update UI with backend's response
        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message.text, sender: data.message.sender },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container mt-5 chatbox flex-grow-1 d-flex">
      <div className="card chatbox-card flex-grow-1">
        <div className="card-body messages chatbox-messages">
          {messages.map(
            (
              message,
              index
            ) => (
              <Message
                index={index}
                sender={message.sender}
                text={message.text}
                audio={'./output.mp3'} // this is the audio file path
              />
            )
          )}
        </div>

        <SendBar 
        handleMessageSend={handleMessageSend}
        handleInputChange={handleInputChange}
        setInputValue={setInputValue}
        transcript={transcript}
        setTranscript={setTranscript}/>

        
      </div>
    </div>
  );
}

export default ChatBox;
