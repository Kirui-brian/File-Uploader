const mongoose = require('../db');

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    filePath: { type: String, required: true },
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;
