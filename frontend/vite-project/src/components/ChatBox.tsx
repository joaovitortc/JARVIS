import React, { useState } from "react";
import Message from './Message'

function ChatBox() {
  const [messages, setMessages] = useState([{ text: "", sender: "" }]);
  const [inputValue, setInputValue] = useState("");

  const handleMessageSend = () => {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "user" },
      ]);
      setInputValue("");

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a response from ChatGPT.", sender: "ChatGPT" },
        ]);
      }, 1000);
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
              index // this has to be a component "message"
            ) => (
              <Message index={index} sender={message.sender} text={message.text}/>
            )
          )}
        </div>
        <div className="card-footer container-fluid d-flex input chatbox-input">
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
