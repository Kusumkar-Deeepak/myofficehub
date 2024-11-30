// // script.js

// document.addEventListener('DOMContentLoaded', function () {
//     // Get references to relevant elements
//     const uploadPdfButton = document.getElementById('upload-pdf');
//     const viewPdfButton = document.getElementById('view-pdf');
//     const uploadPdfForm = document.getElementById('upload-pdf-form');
//     const viewPdfForm = document.getElementById('view-pdf-form');
//     const pdfFileInput = document.getElementById('pdf-file');
//     const uploadPdfNumberInput = document.getElementById('pdf-number');
//     const viewPdfNumberInput = document.getElementById('pdf-number'); // Note: Same id as uploadPdfNumberInput
  
//     // Array to store uploaded PDFs
//     const uploadedPdfs = [];
  
//     // Event listener for the "Upload PDF" button
//     uploadPdfButton.addEventListener('click', function () {
//       // Show the upload form and hide the view form
//       uploadPdfForm.style.display = 'block';
//       viewPdfForm.style.display = 'none';
//     });
  
//     // Event listener for the "View PDF" button
//     viewPdfButton.addEventListener('click', function () {
//       // Show the view form and hide the upload form
//       viewPdfForm.style.display = 'block';
//       uploadPdfForm.style.display = 'none';
//     });
  
//     // Event listener for the "Upload PDF" button inside the upload form
//     document.getElementById('upload-pdf-button').addEventListener('click', function () {
//       // Get the selected PDF file
//       const pdfFile = pdfFileInput.files[0];
  
//       // Get the associated number
//       const pdfNumber = parseInt(uploadPdfNumberInput.value);
  
//       // Check if both a file and a number are provided
//       if (pdfFile && !isNaN(pdfNumber)) {
//         // Add the PDF file and number to the array
//         uploadedPdfs.push({ number: pdfNumber, file: pdfFile });
//         alert('PDF uploaded successfully!');
//       } else {
//         alert('Please select a PDF file and enter a valid number.');
//       }
  
//       // Clear the input fields
//       pdfFileInput.value = '';
//       uploadPdfNumberInput.value = '';
//     });
  
//     // Event listener for the "View PDF" button inside the view form
//     document.getElementById('view-pdf-button').addEventListener('click', function () {
//       // Get the requested PDF number
//       const requestedNumber = parseInt(viewPdfNumberInput.value);
  
//       // Find the corresponding PDF in the array
//       const requestedPdf = uploadedPdfs.find(pdf => pdf.number === requestedNumber);
  
//       // Display the PDF or show an error message
//       if (requestedPdf) {
//         // You can implement code to display the PDF here.
//         alert('Displaying PDF with number ' + requestedPdf.number);
//       } else {
//         alert('PDF not found. Please enter a valid number.');
//       }
  
//       // Clear the input field
//       viewPdfNumberInput.value = '';
//     });
//   });
  