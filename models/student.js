  const mongoose = require('mongoose');

  // Schema Definition
  const studentSchema = new mongoose.Schema({
    name: String,
    class: String,
    homeAddress: String,
    rollNo: Number,
    enrollmentNo: {
      type : String,
      unique : true
    },
    busName: String,
    busRoute: String,
    busDriverName: String,
    totalFees:String,
    totalFeesPaid:String,
    totalFeesRemained:String,
    year:String,
    studentImage: {
      type: Buffer // Store image as a Buffer
    }
  });

  // Model based on schema
  const Student = mongoose.model('Student', studentSchema);

  module.exports = Student;
