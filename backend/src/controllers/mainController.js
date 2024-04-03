const express = require("express");
const router = express.Router();

router.post("/test", (req, res) => {
  //console.log("hey");

  const {text} = req.body;

  //ChatGPT Api call

  res.json({ message: { text: `Hi from backend! Received: ${text}`, sender: "ChatGPT" } });
});

module.exports = router;
