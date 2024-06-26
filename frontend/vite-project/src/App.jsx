import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
function App() {
  let [user, setUser] = useState(null);

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
