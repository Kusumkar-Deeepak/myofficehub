const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  rollNumber: Number,
  enrollmentNumber: {
    type: Number,
    unique: true, // Enforce uniqueness for enrollmentNumber
    required: true // Require enrollmentNumber to be present
},
  email: String,
  address: String,
  semester_1_marks:String,
  semester_2_marks:String,
  semester_3_marks:String,
  semester_4_marks:String,
  semester_5_marks:String,
  semester_6_marks:String,
  year:String,
 
});

const User = mongoose.model("User", userSchema);

module.exports = User;
