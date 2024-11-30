
  // models/document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  enrollmentNo: {
    type: String,
    required: true,
    unique: false,
  },
  documentName: {
    type: String,
    required: true,
    unique: false,
  },
  documentType: {
    type: String,
    required: true,
    unique: false,
  },
  documentFile: {
    type: String, // This will store the path to the uploaded file
    required: true,
    unique: false,
  }
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
