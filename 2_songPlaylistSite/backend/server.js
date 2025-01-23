require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); //

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

