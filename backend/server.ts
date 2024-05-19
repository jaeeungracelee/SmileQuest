// src/server.ts
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// OpenAI API route
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log("Received message:", message);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data);
    }
    res.status(500).send("Error communicating with OpenAI API");
  }
});

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "stormhacks2024-a10e6.firebaseapp.com",
  projectId: "stormhacks2024-a10e6",
  storageBucket: "stormhacks2024-a10e6.appspot.com",
  messagingSenderId: "281448850358",
  appId: "1:281448850358:web:06f3a9b791134d54205717",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function getUsers(db: any) {
  const userCol = collection(db, "user");
  const userSnapshot = await getDocs(userCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}

function getScores(users: any) {
  return users.map((user: any) => user.score);
}

async function fetchData() {
  try {
    const users = await getUsers(db);
    console.log(users);
    const scoreList = getScores(users);
    console.log(scoreList);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Fetch Firebase data on startup
fetchData();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
