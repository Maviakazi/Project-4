require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = require('./config/database');

app.listen(process.env.PORT || 3000);