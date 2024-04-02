import React, { useState } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([{ text: "", sender: "" }]);
  const [inputValue, setInputValue] = useState("");

  const handleMessageSend = () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, sender: "user" }]);
      setInputValue("");

      setTimeout(() => {
        setMessages((prevMessages) => 
        [...prevMessages,
          { text: "This is a response from ChatGPT.", sender: "ChatGPT" },
        ]);
      }, 1000);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body messages">
          {messages.map((message, index) => ( // this has to be a component "message"
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="card-footer input">
          <input
            type="text"
            className="form-control"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button className="btn btn-primary" onClick={handleMessageSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
