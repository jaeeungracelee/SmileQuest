import express from "express";
import axios from "axios";
import { initializeApp } from "firebase/app";
import cors from "cors";
import dotenv from "dotenv";

require('dotenv').config()

// import necessary modules
import {
getFirestore,
collection,
addDoc,
setDoc,
getDocs,
updateDoc,
query,
where,
increment,
doc,
} from "firebase/firestore";

// express
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());

const initialPrompt = {
  role: 'system',
  content: "Always respond as Smiley, a friendly and supportive virtual friend no matter what. Sound like a real person, not a robot! Provide friendly, empathetic, and helpful responses. Start now."
};

// firebase
const firebaseConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  authDomain: "stormhacks2024-a10e6.firebaseapp.com",
  projectId: "stormhacks2024-a10e6",
  storageBucket: "stormhacks2024-a10e6.appspot.com",
  messagingSenderId: "281448850358",
  appId: "1:281448850358:web:06f3a9b791134d54205717",
};
const firebaseApp = initializeApp(firebaseConfig);
var db = getFirestore(firebaseApp);

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions', // update endpoint
      {
        model: 'gpt-3.5-turbo', // use the new model
        messages: [
          initialPrompt,  // include the initial prompt
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

    res.json({ reply: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    res.status(500).send('Error communicating with OpenAI API');
  }
});

// route to handle user creation
app.post("/createUser", async (req, res) => {
  try {
    // extract user information from the request body
    const { name, password, email, score } = req.body;

    // validate user data (you can add more robust validation here)
    if (!name || !password || !email || !score) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const docRef = await setDoc(doc(db, "user", name), {
      name,
      password,
      email,
      score,
    });
    // send success response
    res
      .status(201)
      .json({ message: "User created successfully"});
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.post("/addPoints", async (req, res) => {
  try {
    // extract user information from the request body
    const { name, points } = req.body;

    // validate user data (you can add more robust validation here)
    if (!name) {
      return res.status(400).json({ error: "Missing name" });
    }
    if (!points) {
      return res.status(400).json({ error: "Missing points" });
    }

    const queryRef = doc(db, "user", name);

    // set the "capital" field of the city 'DC'
    await updateDoc(queryRef, {
      score: increment(points),
    });

    // send success response
    res
      .status(200)
      .json({ message: "Score added successfully", userId: queryRef.id });
  } catch (error) {
    console.error("Error adding score:", error);
    res.status(500).json({ error: "Failed to add score" });
  }
});

app.get("/viewLeaderboard", async (req, res) => {
  try {
    const usersRef = collection(db, "user");
    const usersSnapshot = await getDocs(usersRef);

    const users: { name: string, score: number }[] = []; // define the type of the users array

    usersSnapshot.forEach((doc) => {
      const user = doc.data();
      users.push({ name: user.name, score: user.score });
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving leaderboard:", error);
    res.status(500).json({ error: "Failed to retrieve leaderboard" });
  }
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
