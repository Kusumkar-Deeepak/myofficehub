const Student = require('../models/student');
const Feedback = require('../models/feedback');
const Register = require('../models/Register');
const multer = require('multer');
const sharp = require('sharp');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');


// async function getEnrollmentNo(req, res) {
//   try {
//     const enrollmentNumber = req.params.enrollmentNumber;
//     const enrollToken = req.enrollmentNo;
//     console.log("the token is :",enrollToken);
//     const student = await Student.findOne({ enrollmentNo: enrollmentNumber }).maxTimeMS(20000);

//     if (!student) {
//       res.status(404).send('Student not found');
//       return;
//     }

//     res.render('busmanagement/studentInfo2', { student });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }

// async function getEnrollmentNo1(req, res) {
//   try {
//     const enrollmentNumber = req.params.enrollmentNumber;

//     const student = await Student.findOne({ enrollmentNo: enrollmentNumber });

//     if (!student) {
//       res.status(404).send('Student not found');
//       return;
//     }

//     res.render('busmanagement/studentInfo', { student });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }
async function getEnrollmentNo(req, res) {
  try {
    const enrollmentNumber = req.params.enrollmentNumber;
    console.log('Requested Enrollment Number:', enrollmentNumber);
    console.log('User Enrollment Number (from JWT token):', req.enrollmentNo);

    // Check if the enrollment number matches the user's enrollment number
    if (req.enrollmentNo !== enrollmentNumber) {
      return res.status(403).send('Alert: Enrollment number does not match. Please provide the enrollment number used during sign-in.');
    }

    const student = await Student.findOne({ enrollmentNo: enrollmentNumber }).maxTimeMS(20000);

    if (!student) {
      return res.status(404).send('Student not found');
    }

    res.render('busmanagement/studentInfo2', { student });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getEnrollmentNo1(req, res) {
  try {
    const enrollmentNumber = req.params.enrollmentNumber;
    console.log('Requested Enrollment Number:', enrollmentNumber);
    console.log('User Enrollment Number (from JWT token):', req.enrollmentNo);

    // Check if the enrollment number matches the user's enrollment number
    if (req.enrollmentNo !== enrollmentNumber) {
      return res.status(403).send('Alert: Enrollment number does not match. Please provide the enrollment number used during sign-in.');
    }

    const student = await Student.findOne({ enrollmentNo: enrollmentNumber });

    if (!student) {
      return res.status(404).send('Student not found');
    }

    res.render('busmanagement/studentInfo', { student });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function saveStudentWithImage(req, res) {
  try {
    // Check if the enrollmentNumber is present in the request body
    const enrollmentNumber = req.body.enrollmentNo;
    
    if (!enrollmentNumber) {
      return res.status(400).json({ message: 'Enrollment number is required' });
    }

    // Check if a student with the given enrollment number already exists
    const existingStudent = await Student.findOne({ enrollmentNo: enrollmentNumber });

    if (existingStudent) {
      return res.status(400).json({ message: 'Form already submitted for this enrollment number' });
    }

    const studentData = req.body;

    if (req.file) {
      const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
      studentData.studentImage = buffer;
    }

    const student = new Student(studentData);

    // Validate the document
    const validationError = student.validateSync();

    if (validationError) {
      const errors = Object.keys(validationError.errors).map(key => validationError.errors[key].message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    // Save the document
    await student.save();
    console.log("saved")
    res.status(201).json({ message: 'Student data saved successfully' });
  } catch (error) {
    console.error('Error saving student data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}




async function submitFeedback(req, res) {
  try {
    const feedbackData = req.body;

    const rollNo = parseInt(feedbackData.rollNo, 10);
    if (isNaN(rollNo)) {
      throw new Error('Invalid rollNo. Must be a number.');
    }

    feedbackData.rollNo = rollNo;

    console.log('Received feedback data:', feedbackData);

    const feedback = new Feedback(feedbackData); // Use the Feedback model

    await feedback.save();

    console.log('Feedback saved successfully');

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function feedback(req, res) {
  try {
    const feedbackData = await Feedback.find();
    res.render('busmanagement/feedback', { feedbackData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteBus(req, res) {
  try {
    const enrollmentNumber = req.body.enrollmentNumber;

    const result = await Student.deleteOne({ enrollmentNo: enrollmentNumber });

    if (result.deletedCount === 1) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'Student not found for deletion' });
    }
  } catch (e) {
    console.error(e);
    console.error('Error deleting student data:', e.message);
    res.status(500).json({ success: false, error: 'Error deleting student data' });
  }
}

async function deleteFeedbackById(req, res) {
  try {
    const feedbackId = req.params.id;

    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Placeholder for a function to update a student by ID from the database
async function updateStudentById(studentId, newData) {
  return await Student.findByIdAndUpdate(studentId, newData, { new: true }).exec();
}

async function updateStudent(req, res) {
  try {
    const studentId = req.params.id;
    let updateData = {
      name: req.body.name,
      class: req.body.class, // Change req.body.studentClass to req.body.class
      homeAddress: req.body.homeAddress,
      rollNo: req.body.rollNo,
      enrollmentNo: req.body.enrollmentNo,
      busName: req.body.busName,
      busRoute: req.body.busRoute,
      busDriverName: req.body.busDriverName,
      totalFees: req.body.totalFees,
      totalFeesPaid: req.body.totalFeesPaid,
      totalFeesRemained: req.body.totalFeesRemained,
      year: req.body.year
    };

    if (req.file) {
      const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
      updateData.studentImage = buffer;
    }

    // Assuming you have a function to update a student in the database
    const updatedStudent = await updateStudentById(studentId, updateData);

    if (!updatedStudent) {
      res.status(404).send('Student not found');
      return;
    }

    res.redirect('/home');
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).send('Internal Server Error');
  }
}
async function getStudentById(req, res) {
  try {
    const studentId = req.params.id;
    // Ensure studentId is defined and not an empty string
    if (!studentId) {
      res.status(400).send('Invalid student ID');
      return;
    }

    // Assuming you have a function to get a student by ID
    const student = await getStudentByIdFromDatabase(studentId);

    // Check if the student is not found
    if (!student) {
      res.status(404).send('Student not found');
      return;
    }

    res.render('busmanagement/updateUser', { student });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Function to get a student by ID from the database
async function getStudentByIdFromDatabase(studentId) {
  return await Student.findById(studentId).exec();
}


// Updated registration route without unique_id
async function register(req, res) {
  const { email, username, password, passwordConf, enrollmentNo } = req.body;

  try {
    console.log('Received registration request:', req.body);

    // Check if all required fields are provided
    if (!email || !username || !password || !passwordConf || !enrollmentNo) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if passwords match
    if (password !== passwordConf) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Check if enrollment number is already registered
    const existingEnrollment = await Register.findOne({ enrollmentNo });
    if (existingEnrollment) {
      return res.status(400).json({ success: false, message: 'Enrollment number is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new Register({
      email,
      username,
      enrollmentNo,
      password: hashedPassword, // Store hashed password
      passwordConf,
    });

    // Save the user to the database
    await newUser.save();

    console.log('User registered successfully');
    return res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err.message);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}
/// Function to handle user login
async function login(req, res) {
  const { email, password } = req.body;
  console.log(email + " " + password);

  
// In a real application, you should store the secret key in an environment variable
const secretKey = 'your-secret-key';


  try {
    // Check if user exists
    const user = await Register.findOne({ email });

    if (!user) {
      // Invalid email
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      // Invalid password
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ enrollmentNo: user.enrollmentNo ,  username: user.username }, secretKey, { expiresIn: '1h' });
    // Set the JWT token as a cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: 60 * 100, // 10 minutes
      sameSite: 'strict', // Adjust this based on your security requirements
      path: '/', // Specify the path where the cookie is accessible
            }));
console.log('User logged in successfully:', user.username);


    // Successful login, send username
    return res.status(200).json({ success: true, username: user.username });
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).send('Server Error');
  }
}
module.exports = {
  getEnrollmentNo,
  getEnrollmentNo1,
  saveStudentWithImage,
  submitFeedback,
  feedback,
  deleteBus,
  deleteFeedbackById,
  getStudentById,
  updateStudent,
  register,
  login
};