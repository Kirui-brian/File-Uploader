const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    filePath: String
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
