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

// const mongoose = require('mongoose');
// import dotenv from "dotenv"; 

// dotenv.config();

// mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(() => {
//         console.log("Connected to db");
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });

//     module.exports = mongoose;
