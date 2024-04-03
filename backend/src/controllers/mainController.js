const express = require("express");
const router = express.Router();

router.post("/test", (req, res) => {
  //console.log("hey");

  const {text} = req.body;

  res.json({ message: { text: `Hi from backend! Received: ${text}`, sender: "ChatGPT" } });
});

module.exports = router;
