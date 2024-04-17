require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Enable JSON parsing
app.use(express.json({ extended: true }));

// Imported routes
const NoteRoutes = require('./routes/NoteRouter');

// Register routes
app.use('/api/notes', NoteRoutes);

const db = require('./config/database');

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});