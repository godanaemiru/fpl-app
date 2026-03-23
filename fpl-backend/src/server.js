const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));



// Import your routes
const playerRoutes = require('./routes/playerRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Prefixing with /api/players is standard practice
app.use('/api/players', playerRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'FPL Proxy is running' });
});

app.listen(PORT, () => {
    console.log(`Server is sprinting on http://localhost:${PORT}`);
});