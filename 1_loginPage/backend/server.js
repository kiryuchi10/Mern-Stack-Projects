require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Ensure the path is correct

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = process.env.MONGO_URI; // Retrieve MongoDB URI from .env
if (!uri) {
    console.error('MONGO_URI is not defined in the .env file');
    process.exit(1); // Exit the app if the URI is missing
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the app if connection fails
    });

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
