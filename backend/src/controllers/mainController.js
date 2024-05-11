const express = require("express");
const router = express.Router();
const openai = require("openai");
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const { create } = require("domain");

async function createAudio(text) {
 
  const projectId = 'maximal-yew-422316-h6';

  const client = new textToSpeech.TextToSpeechClient({
    projectId: projectId,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });

  const outputFile = './audios/output.mp3';
  
  const request = {
    input: {text: text},
    voice: {languageCode: 'en-US', ssmlGender: 'MALE'},
    audioConfig: {audioEncoding: 'MP3'},
  };
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(outputFile, response.audioContent, 'binary');
  return console.log(`Audio content written to file: ${outputFile}`);
};

const openaiClient = new openai.OpenAI({apiKey: process.env.OPENAI_API_KEY});

router.post("/test", async (req, res) => {
  console.log("Request received:", req.body);
  const {text} = req.body;

  try {
    const completion = await openaiClient.chat.completions.create({
      messages: [{"role": "system", "content": systemPrompt},
                 {"role": "user", "content": text}],
      model: "gpt-3.5-turbo",
    });
  
    const GptResponse = completion.choices[0];
    console.log("GPT Response:", GptResponse);

    let audio = await createAudio(GptResponse.message.content);

    res.json({ message: { text: `${GptResponse.message.content}`, sender: "ChatGPT" } });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }

});

let systemPrompt = 
`You are JARVIS, a personal assistant designed to enhance communication skills and knowledge.
 You will evaluate the user's response to a question or explanation of a concept and provide detailed feedback.
 The answer should be clear, concise and accurate. By saying how to improve the answer, you will help the user learn and grow.
 Your feedback always end with another question about the topic to keep the Q&A going. 
 You can also question something similar to the topic, not necessairly the same.`;



module.exports = router;
