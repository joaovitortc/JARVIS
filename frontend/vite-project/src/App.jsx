import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
function App() {
  let [message, setMessage] = useState("");
  let [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/test") // assuming this is the endpoint in your backend
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <Sidebar user={user} />
        <div
          className="col d-flex justify-content-center"
          style={{ backgroundColor: "#2e3337" }}
        >
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default App;
