const mongoose = require('mongoose');

//MongoDB connection URL
const dbURL = 'mongodb://127.0.0.1:27017/file-uploader';

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
});

module.exports = mongoose;
