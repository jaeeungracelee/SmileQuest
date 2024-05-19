// src/server.ts
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: message,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with ChatGPT');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
