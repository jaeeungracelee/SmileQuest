import express from "express";
import axios from "axios";
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";

// Import necessary modules
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

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "stormhacks2024-a10e6.firebaseapp.com",
  projectId: "stormhacks2024-a10e6",
  storageBucket: "stormhacks2024-a10e6.appspot.com",
  messagingSenderId: "281448850358",
  appId: "1:281448850358:web:06f3a9b791134d54205717",
};
const firebaseApp = initializeApp(firebaseConfig);
var db = getFirestore(firebaseApp);

const initialPrompt = {
  role: 'system',
  content: "Always respond as Smiley, a friendly and supportive virtual friend. Sound like a real person, not a robot! Provide empathetic, helpful, concise responses. Start now."
};

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions', // Update the endpoint
      {
        model: 'gpt-3.5-turbo', // Use the new model
        messages: [
          initialPrompt,  // Include the initial prompt
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

// Route to handle user creation
app.post("/createUser", async (req, res) => {
  try {
    // Extract user information from the request body
    const { name, password, email, score } = req.body;

    // Validate user data (you can add more robust validation here)
    if (!name || !password || !email || !score) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const docRef = await setDoc(doc(db, "user", name), {
      name,
      password,
      email,
      score,
    });
    // Send success response
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
    // Extract user information from the request body
    const { name, points } = req.body;

    // Validate user data (you can add more robust validation here)
    if (!name) {
      return res.status(400).json({ error: "Missing name" });
    }
    if (!points) {
      return res.status(400).json({ error: "Missing points" });
    }

    const queryRef = doc(db, "user", name);

    // Set the "capital" field of the city 'DC'
    await updateDoc(queryRef, {
      score: increment(points),
    });

    // Send success response
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

    const users: { name: string, score: number }[] = []; // Define the type of the users array

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

