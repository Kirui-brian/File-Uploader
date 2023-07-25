const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to db");
    })
    .catch((err) => {
        console.log(err.message);
    });

module.exports = mongoose;
