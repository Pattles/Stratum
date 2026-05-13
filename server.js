require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const songsRouter = require('./api/songs');

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.use('/api/songs', songsRouter);

app.listen(3000, () => console.log('Server running on port 3000'));