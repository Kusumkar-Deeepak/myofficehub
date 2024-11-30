const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const sharp = require('sharp');
const createError = require('http-errors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const excelToJson = require('convert-excel-to-json');
const xlsx = require("xlsx");
const {verifyToken} = require('./middleware/auth');
const cookieParser = require('cookie-parser');


// Import models
const Student = require('./models/student');
const Feedback = require('./models/feedback');
const Userdata = require('./models/userAdd');
const Register = require('./models/Register');
const Document = require('./models/doc');

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files and body parsing middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Database connection
require("./src/db/conn");



//                                           documents management routes start here


// Document management routes
app.get('/doc', (req, res) => {
  res.render('documentmanagement/doc');
});

app.get('/index', (req, res) => {
  res.render('documentmanagement/index');
});


app.get('/key2', (req, res) => {
  res.render('documentmanagement/key2');
});

// const storage1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'public', 'uploads')); // Specify the destination folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const up = multer({ storage: storage1 });

// app.get('/docindex', (req, res) => {
//   const documents = [];
//   res.render('documentmanagement/index', {
//     documents
//   });
// });

// app.get('/adddoc', (req, res) => {
//   res.render('documentmanagement/addDocument');
// });

// const st = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/') // Save uploaded files in the uploads directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname) // Add timestamp to ensure unique filenames
//   }
// });

// const up = multer({ storage: st});

// // Route for adding a document
// app.post('/add-document', up.single('documentFile'), async (req, res) => {
//   try {
//     const { enrollmentNo, documentName, documentType } = req.body;
//     const documentFile = req.file.path; // Save the path to the uploaded file

//     // Create a new document instance
//     const newDocument = new Document({
//       enrollmentNo,
//       documentName,
//       documentType,
//       documentFile
//     });

//     // Save the document to the database
//     await newDocument.save();

//     res.status(201).json({ message: 'Document added successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.post('/view-documents', async (req, res) => {
//   const { enrollmentNo } = req.body;

//   try {
//     const documents = await Document.find({ enrollmentNo });
//     res.render('index', { documents });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/view-documents', async (req, res) => {
//   const { enrollmentNo } = req.body;

//   try {
//     const documents = await document.find({ enrollmentNo });
//     res.render('documentmanagement/viewDocument', { documents });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });


// app.get('/download/:documentId', async (req, res) => {
//   const { documentId } = req.params;

//   try {
//     const document = await document.findById(documentId);

//     if (!document) {
//       return res.status(404).send('Document not found');
//     }

//     // Set the file path based on your document storage location
//     const filePath = document.filePath ? path.join(__dirname, 'public', document.filePath) : '';


//     // Set the appropriate content type based on your document type
//     const contentType = 'application/pdf'; // Adjust as needed

//     // Send the file as a download
//     res.download(filePath, `${document.documentName}.${document.documentType}`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });






//                                           Document management routes Ends here

//                                           Bus management routes Starts here

// Multer setup for image upload
// Multer setup for image upload
const imageStorage = multer.memoryStorage();
const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 15, // 15MB file size limit
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true);
    } else {
      callback(new Error('Only images are allowed'));
    }
  },
});
    // Routes
    app.get('/login', (req, res) => {
      res.render('login'); // Rendering the "index" view
    });
    

    
    app.get('/signup', (req, res) => {
      res.render('busmanagement/signup'); // Rendering the "signup" view
    });

    
    app.get('/log', (req, res) => {
      res.render('busmanagement/log');
  });
  
    app.get('/data', (req, res) => {
      res.render('busmanagement/data');
  });
  

// Home route handler
app.get('/home', verifyToken, (req, res) => {
  // Log the presence of the username variable
  console.log('Username:', req.username);

  // Assuming you have the username available in the request object
  const { username } = req;
  res.render('busmanagement/home', { username });
});


app.post('/isloggedin',verifyToken, (req,res)=>{
  res.status(200).json({'success': true})
});
// Logout route
app.post('/logout', (req, res) => {
  // Clear the cookie
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    expires: new Date(0), // Set expiry to a past date
    httpOnly: true,
    sameSite: 'strict',
    path: '/'
}));

  // Redirect to login page or any other page as needed
  res.status(200);
});


    

    app.get('/devoloper', (req, res) => {
      res.render('busmanagement/devoloper'); // Rendering the "devoloepr" view
    });

    app.get('/teacherCode', (req, res) => {
      res.render('busmanagement/teacherCode');
    });

    app.get('/teacherCode2', (req, res) => {
      res.render('busmanagement/teacherCode2');
    });

    app.get('/data', (req, res) => {
      res.render('busmanagement/data');
    });
    
    app.get('/mod4', (req, res) => {
      res.render('busmanagement/mod4');
    });
    
    app.get('/updateUser', (req, res) => {
      res.render('busmanagement/updateUser');
    });
    
    app.get('/documentation', (req, res) => {
      res.render('busmanagement/documentation');
    });

    app.get('/updateUser', (req, res) => {
      res.render('busmanagement/updateUser');
    });
    
    app.get('/reg', (req, res) => {
      res.render('busmanagement/reg'); // Render 'reg.ejs' from 'busmanagement' subdirectory
    });

    app.get('/safety', (req, res) => {
      res.render('busmanagement/safety'); 
    });

    app.get('/emergency', (req, res) => {
      res.render('busmanagement/emergency'); 
    });

    app.get('/busRevenue', (req, res) => {
      res.render('busmanagement/busRevenue'); 
    });
    
    
    app.get('/', (req, res) => {
      res.render('index'); // Rendering the "index" view
    });

    app.get('/about_us', (req, res) => {
      res.render('about_us'); // Rendering the "index" view
    });
    // Define route to serve the offline page
    app.get('/offline', (req, res) => {
    res.render('offline');
    });

const {
  register,
  login,
  getEnrollmentNo,
  getEnrollmentNo1,
  saveStudentWithImage,
  submitFeedback,
  feedback,
  deleteBus,
  deleteFeedbackById,
  getStudentById,
  updateStudent,
} = require('./controllerDeepak/studentController');
    
    
// Routes
app.post('/register', register);
app.post('/log', login);
app.get('/updateUser/:id', getStudentById);
app.post('/update/:id', upload.single('imageInput'), updateStudent); // Use 'upload' middleware here
app.post('/api/saveStudentWithImage', upload.single('imageInput'), saveStudentWithImage);
app.post('/api/submitFeedback', submitFeedback);
app.delete('/deleteFeedback/:id', deleteFeedbackById);
app.get('/feedback', feedback);
app.post('/deleteBus', deleteBus);
app.get('/enrollment/:enrollmentNumber', verifyToken, getEnrollmentNo1);
app.get('/module2/:enrollmentNumber', verifyToken, getEnrollmentNo);
// Route to fetch user data
app.get('/users', async (req, res) => {
  // Fetch user data from the database
  try {
    const userData = await Register.find({});
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});


    
//                                                 Emergency Alert Sending Code

// app.post('/send-emergency-alert', (req, res) => {
//   // Logic to send emergency alert email
//   const output = `
//       <p>Emergency alert! Immediate assistance required.</p>
//   `;

//   // create reusable transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport({
//     host: 'live.smtp.mailtrap.io',
//     port: 587,
//     auth: {
//         user: 'api',
//         pass: '8ed81daad5bee88067aacb56bacde553'
//     }
// });

//   // setup email data with unicode symbols
//   let mailOptions = {
//       from: '"PolyTransport" <deeepak.kusumkar@gmail.com>', // sender address
//       to: 'kusumkarsuyash1234@gmail.com', // list of receivers
//       subject: 'Emergency Alert', // Subject line
//       text: 'Emergency alert! Immediate assistance required.', // plain text body
//       html: output // html body
//   };

//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           console.error('Error sending emergency alert:', error);
//           res.status(500).json({ success: false });
//       } else {
//           console.log('Emergency alert sent:', info.response);
//           res.status(200).json({ success: true });
//       }
//   });
// });


// var transport = nodemailer.createTransport({
//   host: "live.smtp.mailtrap.io",
//   port: 587,
//   auth: {
//     user: "api",
//     pass: "8ed81daad5bee88067aacb56bacde553"
//   }
// });

// // Define endpoint to handle emergency alert requests
// app.post('/sendEmergencyAlert', (req, res) => {
//   // Call the function to send the emergency alert email
//   sendEmergencyAlert((error, info) => {
//       if (error) {
//           console.error('Error occurred:', error);
//           res.status(500).send('Failed to send emergency alert email.');
//       } else {
//           console.log('Emergency alert email sent:', info.response);
//           res.send('Emergency alert email sent successfully.');
//       }
//   });
// });

// // Function to send the emergency alert email
// function sendEmergencyAlert(callback) {
//   // Email content
//   let mailOptions = {
//       from: 'demomailtrap.com',
//       to: 'deeepak.kusumkar@gmail.com',
//       subject: 'Emergency Alert',
//       text: 'This is an emergency alert!'
//   };

//   // Send email
//   transporter.sendMail(mailOptions, callback);
// }

// // Emergency alert route
// app.post('/emergency-alert', async (req, res) => {
//   try {
//       // Customize the email content based on your requirements
//       const mailOptions = {
//         from: 'deeepak.kusumkar@gmail.com', // replace with the college principal's email
//           to: 'kusumkarsuyash1234@gmail.com', // replace with your email
//           subject: 'Emergency Alert',
//           text: 'Emergency alert: A user needs immediate assistance.',
//       };

//       // Send the emergency alert email
//       await sendEmergencyAlert(mailOptions);

//       // Send a success response to the client
//       res.json({ success: true });
//   } catch (error) {
//       console.error('Error handling emergency alert:', error);
//       res.status(500).json({ success: false, error: 'Internal server error' });
//   }
// });

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 587,
  auth: {
      user: 'api',
      pass: '8ed81daad5bee88067aacb56bacde553'
  }
});

// Function to send emergency alert email
async function sendEmergencyAlert(mailOptions) {
  try {
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Emergency alert email sent:', info.response);
      return true;
  } catch (error) {
      console.error('Error sending emergency alert:', error);
      throw error;
  }
}

// Route to handle sending emergency alert
app.post('/send-emergency-alert', async (req, res) => {
  try {
      // Email content
      const output = `
          <p>Emergency alert! Immediate assistance required.</p>
      `;

      // Email options
      const mailOptions = {
          from: '"PolyTransport" <deeepak.kusumkar@gmail.com>', // sender address
          to: 'kusumkarsuyash1234@gmail.com', // list of receivers
          subject: 'Emergency Alert', // Subject line
          text: 'Emergency alert! Immediate assistance required.', // plain text body
          html: output // html body
      };

      // Send email
      await sendEmergencyAlert(mailOptions);

      // Send success response
      res.status(200).json({ success: true });
  } catch (error) {
      // Send error response
      console.error('Error occurred while sending emergency alert:', error);
      res.status(500).json({ success: false, error: 'An error occurred. Please try again.' });
  }
});

// Route to handle receiving emergency alert requests
app.post('/emergency-alert', async (req, res) => {
  try {
      // Email content
      const mailOptions = {
          from: 'deeepak.kusumkar@gmail.com', // replace with the sender's email
          to: 'kusumkarsuyash1234@gmail.com', // replace with the recipient's email
          subject: 'Emergency Alert',
          text: 'Emergency alert: A user needs immediate assistance.'
      };

      // Send email
      await sendEmergencyAlert(mailOptions);

      // Send success response
      res.status(200).json({ success: true });
  } catch (error) {
      // Send error response
      console.error('Error occurred while handling emergency alert:', error);
      res.status(500).json({ success: false, error: 'An error occurred. Please try again.' });
  }
});//                                                 Emergency Alert Sending Code End


//                                           Bus management routes Ends here


// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'public', 'uploads')); // Specify the destination folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const uploader = multer({ storage: storage });

// // Define Document schema
// const documentSchema = new mongoose.Schema({
//   enrollmentNumber: { type: String, unique: true, required: true },
//   documentName: String,
//   documentType: String,
//   filePath: String,
// });



// const Document = mongoose.model('Document', documentSchema);

// app.get('/addDocument', (req, res) => {
//   res.render('documentmanagement/addDocument');
// });


// app.post('/add-document', uploader.single('documentFile'), async (req, res) => {
//   const { enrollmentNo, documentName, documentType } = req.body;
//   const documentFile = req.file;

//   try {
//     // Assuming 'uploads' is the folder where documents are stored
//     const filePath = path.join('uploads', documentFile.filename);

//     await Document.create({ enrollmentNo, documentName, documentType, filePath });
//     res.redirect('/doc');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });



    //                                      Student management routes starts
    app.get('/studantmanagement', (req, res) => {
      res.render('studentmanagement/user');
    });

    app.get('/addstudant', (req, res) => {
      res.render('studentmanagement/addstudant',{});
    });

    app.get('/userfind', (req, res) => {
      res.render('studentmanagement/userfind',{ studentData: studentData});
    });
    app.get('/excelupload', (req, res) => {
      res.render('studentmanagement/excelupload');
    });
    app.get('/about', (req, res) => {
      res.render('studentmanagement/about');
    });
    app.get('/key', (req, res) => {
      res.render('studentmanagement/key');
    });


    const {
      userSubmit,
      userfind,
      userperfind,
      update,
      updateSubmit,
      deleteUser,
    } = require('./controllerVedant/userController');
const { log } = require('console');

    app.post('/submit', userSubmit);
    app.post('/userfind', userfind);
    app.post('/updateUser', update);
    app.post('/update-submit', updateSubmit);
    app.post('/delete', deleteUser);
    app.post('/userperfind', userperfind);





  //   const exupload = multer({ dest: 'uploads/' });

   
  //   app.post('/addexcel', exupload.single('file'), async (req, res) => {
  //     if (!req.file) {
  //         return res.status(400).send('No files were uploaded.');
  //     }
  
  //     const excelData = excelToJson({
  //         sourceFile: req.file.path
  //     });
  //     // console.log(excelData);
  
  //     const jsonData = excelData.Sheet1; // Assuming your sheet name is Sheet1
  //     console.log(jsonData);
  
  //     try {
  //         await Userdata.insertMany(jsonData);
  //         res.send('Data imported successfully!');
  //     } catch (err) {
  //         console.error(err);
  //         res.status(500).send('Error importing data.');
  //     }
  // });
  // Multer configuration for file upload
const customStorage = multer.memoryStorage();
const customUpload = multer({ storage: customStorage });

// Express route for uploading Excel file
app.post("/addexcel", customUpload.single("file"), async (req, res) => {
  const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  try {
    for (const row of data) {
      await Userdata.create({
        // your document creation code here
        firstName: row.firstName,
        middleName: row.middleName,
        lastName: row.lastName,
        rollNumber: row.rollNumber,
        enrollmentNumber: row.enrollmentNumber,
        email: row.email,
        address: row.address,
        semester_1_marks: row.semester_1_marks,
        semester_2_marks: row.semester_2_marks,
        semester_3_marks: row.semester_3_marks,
        semester_4_marks: row.semester_4_marks,
        semester_5_marks: row.semester_5_marks,
        semester_6_marks: row.semester_6_marks,
        year: row.year,
      });
    }

    // res.send("Excel data uploaded and inserted into database.");
    alert("data is inserted");
  } catch (error) {
    console.error("Error saving users:", error);
    res.status(500).send("Error saving users");
  }
});
  
  

    

                                              // Student Management Routes Ends hEre


    

                                             // Bonafide management route

    app.get('/bonaMain', (req, res) => {
      res.render('bonafidemanagement/bonaMain');
    });


    app.get('/key1', (req, res) => {
      res.render('bonafidemanagement/key1');
    });

    app.post('/doc', (req, res) => {
      // Get the current date in the format YYYY-MM-DD
      const currentDate = new Date().toISOString().split('T')[0];

      // Get form data from the request
      const certificateData = {
        issueDate: currentDate,
        title: req.body.title,
        studentName: req.body.name,
        isWas: req.body.isWas,
        course: req.body.course,
        academicYear: req.body.acaYear,
        dob: req.body.birthdate,
        section: req.body.section,
        enrollmentNumber: req.body.enrollmentNumber,
        imageUrl: req.body.imageUrl, // Add the imageUrl property
        // Add more fields as needed
      };

      // Check if studentName is present in the form data
      if (!certificateData.studentName) {
        // Handle the case where studentName is not provided (you can redirect or show an error message)
        res.status(400).send('Student name is required.');
        return;
      }

      // Render the 'bonafide' template with the data
      res.render('bonafidemanagement/bonafide', { certificateData, student: { name: certificateData.studentName } });
    });


    // Function to format date (example, you may need to customize this based on your requirements)
    function formatDate(date) {
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }

    app.post('/res', (req, res) => {
      const resdata = {
       name:req.body.fullName,
       amount:req.body.amount,
       through:req.body.through,
       reason:req.body.reason,
      
       
        // Add more fields as needed
      };
      console.log(resdata);
      res.render('bonafidemanagement/recipt', {resdata});
    });
  

   // Route to handle form submission with file upload
// app.post('/bona', upload.single('studentImage'), (req, res) => {
// // Set up Multer storage for student image
// const studentImageStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/studentImages/') // Define the destination folder where student images will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname) // Define how the student image files should be named
//   }
// })
// })

// // Initialize Multer upload for student image with the configured storage
// const uploadStudentImage = multer({ storage: studentImageStorage });

// // Route to handle form submission with file upload
// app.post('/bona', uploadStudentImage.single('studentImage'), (req, res) => {
//   // Get the current date in the format DD-MM-YYYY
//   const currentDate = new Date().toISOString().split('T')[0];

//   // Get form data from the request
//   const certificateData = {
//       issueDate: currentDate,
//       title: req.body.title,
//       studentName: req.body.name,
//       isWas: req.body.isWas,
//       course: req.body.course,
//       academicYear: req.body.acaYear,
//       dob: req.body.birthdate,
//       section: req.body.section,
//       enrollmentNumber: req.body.enrollmentNumber,
//       // Pass the image data as a data URL
//       imageData: req.file ? `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}` : null,
//       // Add more fields as needed
//   };

//   // Check if studentName is present in the form data
//   if (!certificateData.studentName) {
//       // Handle the case where studentName is not provided (you can redirect or show an error message)
//       res.status(400).send('Student name is required.');
//       return;
//   }

//   // Render the 'bonafide' template with the data
//   res.render('bonafidemanagement/bonafide', { certificateData, student: { name: certificateData.studentName } });
// });

//     // Function to format date (example, you may need to customize this based on your requirements)
//     function formatDate(date) {
//       const options = { day: 'numeric', month: 'numeric', y: 'numeric' };
//       return date.toLocaleDateString('en-US', options);
//     }


    // Error handling middleware
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack trace

  if (err.status === 404) {
    res.status(4043).send('Not Found');
  } else {
    res.status(500).send('Internal Server Error');
  }
});

// app.post('/contact',async (req, res) => {
//   try {
//     await Contact.create({
//       name: req.body.name,
//       email: req.body.email,
//       number: req.body.number,
//       messege: req.body.messege,
//     });
//     res.redirect('/studantmanagement');
//     // alert("data added sucessfully")
//   } catch (e) {
//     console.log(e);
//   }
// });


// /// contact us form 


// app.post('/contact', async (req, res) => {
//   const { name, email, number, message } = req.body;

//   try {
//     // Create new contact document
//     const contactData = {
//       name,
//       email,
//       number,
//       message
//     };

//     // Call a function to insert contact data into the database
//     await createContact(contactData);

//     res.status(200).send('Message sent successfully!');
//   } catch (err) {
//     console.error('Error saving contact:', err);
//     res.status(500).send('An error occurred while sending the message.');
//   }
// });

// // Function to create and insert contact data into the database
// async function createContact(data) {
//   try {
//     // Create new contact document
//     await Contact.create(data);
//   } catch (err) {
//     throw err; // Forward the error to the calling function for handling
//   }
// }
// // Mongoose model naming corrected
// const Contact = mongoose.model('Contact', contactSchema);
// module.exports = Contact;


    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    module.exports = app;
