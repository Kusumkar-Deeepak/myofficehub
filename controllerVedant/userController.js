const userdata = require('../models/userAdd');

const temp = {
    userSubmit : async (req, res) => {
        try {
          await userdata.create({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            rollNumber: req.body.rollNumber,
            enrollmentNumber: req.body.enrollmentNumber,
            email: req.body.email,
            address: req.body.address,
            semester_1_marks:req.body.semester_1_marks,
            semester_2_marks:req.body.semester_2_marks,
            semester_3_marks:req.body.semester_3_marks,
            semester_4_marks:req.body.semester_4_marks,
            semester_5_marks:req.body.semester_5_marks,
            semester_6_marks:req.body.semester_6_marks,
            year:req.body.year,
          });
          res.redirect('/studantmanagement');
          
        } catch (e) {
          console.log(e);
        }
      },
      userfind:async (req, res) => {
        try {
          const enrollmentNumber = req.body.enrollmentNumber;
          const studentData = await userdata.findOne({ enrollmentNumber: enrollmentNumber });
  
          if (studentData) {
            res.render('studentmanagement/userfind', { studentData: studentData });
          } else {
            res.render('studentmanagement/userfind', { errorMessage: 'Student not found' });
          }
        } catch (e) {
          console.log(e);
          res.render('studentmanagement/  ', { errorMessage: 'Error retrieving student data' });
        }
      },

      userperfind:async (req, res) => {
        try {
          const enrollmentNumber = req.body.enrollmentNumber;
          console.log(enrollmentNumber)
          const studentData = await userdata.findOne({ enrollmentNumber: enrollmentNumber });
console.log(studentData)
          if (studentData) {
            res.render('studentmanagement/userperfind', { studentData: studentData });
          } else {
            // res.render('studentmanagement/', { errorMessage: 'Student not found' });
            res.send("student not found");
          }
        } catch (e) {
          console.log(e);
          res.render('studentmanagement/  ', { errorMessage: 'Error retrieving student data' });
        }
      },
      update:async (req, res) => {
        try {
          const enrollmentNumber = req.body.enrollmentNumber;
          const studentData = await userdata.findOne({ enrollmentNumber: enrollmentNumber });
  
          if (studentData) {
            // Render the update form with the existing data
            res.render('studentmanagement/update', { studentData: studentData });
          } else {
            // Handle the case where no student is found with the given enrollment number
            res.render('studentmanagement/userfind', { errorMessage: 'Student not found' });
          }
        } catch (e) {
          console.log(e);
          // Handle other errors
          res.render('studentmanagement/userfind', { errorMessage: 'Error retrieving student data' });
        }
      },
      updateSubmit:async (req, res) => {
        try {
          const enrollmentNumber = req.body.enrollmentNumber;
          const updatedData = {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            rollNumber: req.body.rollNumber,
            email: req.body.email,
            address: req.body.address,
            semester_1_marks:req.body.semester_1_marks,
            semester_2_marks:req.body.semester_2_marks,
            semester_3_marks:req.body.semester_3_marks,
            semester_4_marks:req.body.semester_4_marks,
            semester_5_marks:req.body.semester_5_marks,
            semester_6_marks:req.body.semester_6_marks,
            year:req.body.year
            // Add other fields as needed
          };
  
          // Update the student data in the database
          await userdata.updateOne({ enrollmentNumber: enrollmentNumber }, { $set: updatedData });
  
          // Redirect to the userfind page or display a success message
          res.redirect('/studantmanagement');
        } catch (e) {
          console.log(e);
          // Handle errors and render the update form with an error message if needed
          res.render('studentmanagement/update', { errorMessage: 'Error updating student data' });
        }
      },
      deleteUser: async (req, res) => {
        try {
          const enrollmentNumber = req.body.enrollmentNumber;
          console.log(enrollmentNumber)
  
          // Delete the student data from the database
          const result = await userdata.deleteOne({ enrollmentNumber: enrollmentNumber });
  
          if (result.deletedCount === 1) {
            // Redirect to the userfind page or display a success message
            res.redirect('/studantmanagement');
          } else {
            // Handle the case where no student is found with the given enrollment number
            res.render('studentmanagement/userfind', { errorMessage: 'Student not found for deletion' });
          }
        } catch (e) {
          console.log(e);
          // Handle errors and render the userfind page with an error message if needed
          res.render('studentmanagement/userfind', { errorMessage: 'Error deleting student data' });
        }
      },
}

module.exports = {
    userSubmit:temp.userSubmit,
    userfind:temp.userfind,
    update:temp.update,
    updateSubmit:temp.updateSubmit,
    deleteUser:temp.deleteUser,
    userperfind:temp.userperfind,
}