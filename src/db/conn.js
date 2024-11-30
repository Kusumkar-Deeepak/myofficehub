const mongoose = require('mongoose');

// Connect to the primary MongoDB database (Student)
mongoose.connect('mongodb://localhost:27017/myofficehub_student')
  .then(() => {
    console.log("Student MongoDB Connected");
  })
  .catch((error) => {
    console.error("Student MongoDB Connection Error:", error);
  });

// Create a connection to the Feedback database
const feedbackDb = mongoose.createConnection('mongodb://localhost:27017/myofficehub_feedback');

feedbackDb.on('error', console.error.bind(console, 'Feedback MongoDB connection error:'));
feedbackDb.once('open', () => {
  console.log('Feedback MongoDB Connected');
});

// Create a connection to the User database
const userDb = mongoose.createConnection('mongodb://localhost:27017/myofficehub_user');

userDb.on('error', console.error.bind(console, 'User MongoDB connection error:'));
userDb.once('open', () => {
  console.log('User MongoDB Connected');
});

// Create a connection to the Register database
const registerDb = mongoose.createConnection('mongodb://localhost:27017/myofficehub_register');

registerDb.on('error', console.error.bind(console, 'Register MongoDB connection error:'));
registerDb.once('open', () => {
  console.log('Register MongoDB Connected');
});
const Document = mongoose.createConnection('mongodb://localhost:27017/myofficehub_Documents');

registerDb.on('error', console.error.bind(console, 'Register MongoDB connection error:'));
registerDb.once('open', () => {
  console.log('doc MongoDB Connected');
});

module.exports = { mongoose, feedbackDb, userDb, registerDb,Document };



//                                              for vedant laptop
// const mongoose = require('mongoose');

// // Connect to the primary MongoDB database (Student)
// mongoose.connect('mongodb://localhost:27017/Student?retryWrites=true&w=majority')
//   .then(() => {
//     console.log("Student MongoDB Connected");
//   })
//   .catch((error) => {
//     console.error("Student MongoDB Connection Error:", error);
//   });

// // Once connected to the primary database, create a connection to the Feedback database
// const feedbackDb = mongoose.createConnection('mongodb://localhost:27017/Feedback?retryWrites=true&w=majority');

// feedbackDb.on('error', console.error.bind(console, 'Feedback MongoDB connection error:'));
// feedbackDb.once('open', () => {
//   console.log('Feedback MongoDB Connected');
// });

// // Create a connection to the User database
// const userDb = mongoose.createConnection('mongodb://localhost:27017/UserAdd?retryWrites=true&w=majority');

// userDb.on('error', console.error.bind(console, 'User MongoDB connection error:'));
// userDb.once('open', () => {
//   console.log('User MongoDB Connected');
// });

// module.exports = { mongoose, feedbackDb, userDb }; // Export all connections if needed elsewhere


