const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
