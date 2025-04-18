// index.js
require("dotenv").config(); // For loading environment variables


// 💻 Import Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// 🔧 Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// 🧱 Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON
app.use('/api', require('./routes/potentialroutes'));

//to covert pincode to lat and lng
const axios = require("axios");



async function getCoordinatesFromPincode(pincode) {
  const apiKey = process.env.OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${pincode}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const { lat, lng } = response.data.results[0].geometry;

    return { lat, lng };
  } catch (error) {
    console.error("❌ Error fetching coordinates:", error.message);
    return null;
  }
}

// 🌐 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 🛣️ Routes
app.use('/api', require('./routes/potentialroutes'));
app.use("/api/auth", require("./routes/auth")); // ONLY if you're keeping auth.js

// 🧪 Health Check Route
app.get("/", (req, res) => {
  res.send("🌞 Lumos Backend is running!");
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`⚡ Server is live at http://localhost:${PORT}`);
});
