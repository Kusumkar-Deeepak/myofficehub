const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  className: String,
  rollNo: {
    type: Number,
    // Add your custom validation or handling logic here if necessary
  },
  feedback: String,
  rating: Number
});

module.exports = mongoose.model('Feedback', feedbackSchema);




