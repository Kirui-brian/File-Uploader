const fs = require('fs-extra');
const path = require('path');
const FormDataModel = require('../models/formDataModel');

async function saveFormData(formData, file) {
    try {
        if (!file || !file.path) {
            throw new Error('Invalid file data: path is missing');
        }
        // Create a folder if it doesn't exist to store uploaded documents
        const uploadDir = path.join(__dirname, '../uploads');
        await fs.ensureDir(uploadDir);

        // Generate a unique filename for the uploaded file
        const fileName = `${Date.now()}_${file.originalname}`;
        const filePath = path.join('uploads', fileName).replace(/\\/g, '/');

        // Move the uploaded file to the storage folder
        await fs.move(file.path, filePath);

        // Save the form data along with the file path in the database
        const formDataObj = new FormDataModel({
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            filePath: filePath,
        });

        await formDataObj.save();
        
        return filePath;
    } catch (error) {
        throw new Error('Error saving form data and file');
    }
}

async function getAllFormData() {
    try {
        const formDataList = await FormDataModel.find().select('-__v');
        return formDataList;
    } catch (error) {
        throw new Error('Error fetching form data from the database');
    }
}

module.exports = {
    saveFormData,
    getAllFormData,
};
