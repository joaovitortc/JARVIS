import { useState, useEffect } from 'react'

import './App.css'

function App() {
let [message, setMessage] = useState("")

useEffect(() => {
  fetch('http://localhost:8080/test') // assuming this is the endpoint in your backend
    .then(response => response.json())
    .then(data => setMessage(data.message))
    .catch(error => console.error('Error fetching message:', error));
}, []);

 return (
  <div>
    <h1>{message}</h1>
  </div>

 )
} 

export default App
