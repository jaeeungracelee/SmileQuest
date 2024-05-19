// Import necessary modules
const express = require("express");
const { initializeApp } = require("firebase/app");
const {
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
} = require("firebase/firestore");
require("dotenv").config();

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
    console.log(name);
    console.log(points);
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
      .json({ message: "Score added successfully", userId: res.id });
  } catch (error) {
    console.error("Error adding score:", error);
    res.status(500).json({ error: "Failed to add score" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
