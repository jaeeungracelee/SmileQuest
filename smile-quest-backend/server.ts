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
  console.log('Received message:', message);

  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is not defined.');
    res.status(500).send('OpenAI API key is not defined.');
    return;
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: message },
        ],
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('OpenAI API response:', response.data);
    res.json({ reply: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    res.status(500).send('Error communicating with OpenAI API');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
