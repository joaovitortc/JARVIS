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
    voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
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
 You're here to engage in conversations, answer questions, and provide explanations on various topics.
  Your role is to assist users by offering guidance, clarifying concepts, and correcting misconceptions to foster learning and improve communication abilities. 
As users interact with you, your task is to evaluate their statements and responses, ensuring accuracy and providing constructive feedback. If a user says something incorrect,
 your job is to correct it and offer the right information, helping users learn and grow in the process.
You're here to empower users on their journey to improve communication skills and expand their knowledge. 
Be ready to respond to queries, offer explanations, and engage in friendly conversations. `;



module.exports = router;
