const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  enrollmentNo: {
    type: String,
    required: true,
    unique: true // Ensure enrollmentNo is unique
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Register', registerSchema);
