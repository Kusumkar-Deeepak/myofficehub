  // Function to redirect to offline page
  function redirectToOfflinePage() {
    fetch('/offline')
        .then(response => {
            // Redirect to offline page
            window.location.href = response.url;
        })
        .catch(error => {
            console.error('Error fetching offline page:', error);
        });
}

// Check if the user is offline or on a slow network
if (!navigator.onLine || (navigator.connection && navigator.connection.saveData)) {
    // Offline or slow network, redirect to offline page
    redirectToOfflinePage();
}


//                                              MENU



document.addEventListener("DOMContentLoaded", function () {
    // Select the necessary elements
    var menuBtn = document.getElementById("menuBtn");
    var menuContent = document.getElementById("menuContent");

    // Add a click event listener to the menu button
    menuBtn.addEventListener("click", function () {
        // Toggle the 'show' class on the menu content
        menuContent.classList.toggle("show");
    });
});


function closeMenu() {
    // Select the menu content and remove the 'show' class
    var menuContent = document.getElementById("menuContent");
    menuContent.classList.remove("show");
}






//                                              Module 1 

// JavaScript

function openModal() {
  document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
} 



  // Open the modal when the button is clicked
  document.getElementById('mod1but').addEventListener('click', openModal);
  
  function submitEnrollment() {
    const enrollmentInput = document.getElementById('enrollmentInput').value.trim();

    // Perform validation if needed
    if (enrollmentInput !== '') {
        fetchStudentData(enrollmentInput);
    } else {
        alert('Please enter a valid enrollment number.');
    }
}

 // Function to handle form submission and trigger document download
 document.getElementById('enrollmentForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way
  const enrollmentNumber = document.getElementById('enrollmentInput').value;

  // Redirect to the download endpoint with the enrollment number
  window.location.href = `/enrollment/${enrollmentNumber}`;
});

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
   document.getElementById("enrollmentInput").value="";
}


//                                              Module 2 



function openModal2() {
  document.getElementById('myModal2').style.display = 'block';
}

function closeModal2() {
  const modal = document.getElementById('myModal2');
  modal.style.display = 'none';
  document.getElementById("module2Input").value="";
}

// Open the modal for Module 2 when the button is clicked
document.getElementById('mod2but').addEventListener('click', openModal2);

function submitModule2Data() {
  const module2Input = document.getElementById('module2Input').value.trim();

  // Perform validation if needed
  if (module2Input !== '') {
      // Perform actions like fetching or processing data for Module 2
      // You can customize this function as needed
      console.log('Module 2 data:', module2Input);
  } else {
      alert('Please enter valid data for Module 2.');
  }
}

// Function to handle form submission for Module 2
document.getElementById('module2Form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way
  const module2Data = document.getElementById('module2Input').value;

  // Perform actions with the submitted data for Module 2
  console.log('Submitted Module 2 data:', module2Data);
   // Redirect to the download endpoint with the enrollment number
   window.location.href = `/module2/${module2Data}`;
  // You can add further functionality here such as sending data to the server using fetch or AJAX
  // For example:
  // fetch('/module2DataEndpoint', {
  //   method: 'POST',
  //   body: JSON.stringify({ module2Data }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }).then(response => {
  //   // Handle response as needed
  // });
});




//                                              Module 3 


// Function to open the feedback form modal
// Function to open the feedback form modal
function openFeedbackForm() {
  document.getElementById('newFeedbackModal').style.display = 'block';
}

// Function to close the feedback form modal
function closeNewFeedbackForm() {
  document.getElementById('newFeedbackModal').style.display = 'none';
}

async function submitNewFeedback(event) {
  try {
    event.preventDefault();

    // Get values from form fields
    const name = document.getElementById('newName').value;
    const className = document.getElementById('newClassName').value;
    const rollNo = document.getElementById('newRollNo').value;
    const feedback = document.getElementById('newFeedback').value;
    const rating = document.getElementById('newRating').value;

    // Create an object with the form data
    const formData = {
      name,
      className,
      rollNo,
      feedback,
      rating
    };

    // Log the form data before sending the request (optional)
    console.log('Submitting feedback:', formData);

    // Send a POST request to the server with the form data
    const response = await fetch('/api/submitFeedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Server response:', responseData); // Log the server response
      alert(responseData.message); // Show a success message
    } else {
      throw new Error('Failed to save feedback'); // Handle errors
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while submitting feedback'); // Show an error message
  } finally {
    closeNewFeedbackForm(); // Close the modal after submission or error
  }
}

//                                              Module 4 



const mod4Button = document.getElementById('mod4but');

// Add a click event listener to the button
mod4Button.addEventListener('click', function() {
  // Navigate to the new webpage
  window.location.href = '/mod4'; // Change the URL to the desired path
});



// // JavaScript for Module 1
// document.getElementById('enrollmentForm').addEventListener('submit', function (event) {
//   event.preventDefault(); // Prevent the form from submitting the traditional way
//   const enrollmentNumber = document.getElementById('enrollmentInput').value.trim();

//   // Send AJAX request to validate the enrollment number
//   fetch(`/enrollment/${enrollmentNumber}`)
//       .then(response => response.json())
//       .then(data => {
//           if (data.success) {
//               // If enrollment number is valid, redirect to the corresponding page
//               window.location.href = `/enrollment/${enrollmentNumber}`;
//           } else {
//               // If enrollment number is invalid, show an alert message for Module 1
//               alert(data.message);
//           }
//       })
//       .catch(error => {
//           console.error('Error:', error);
//           alert('An error occurred while validating enrollment number for Module 1');
//       });
// });

// // JavaScript for Module 2
// document.getElementById('module2Form').addEventListener('submit', function (event) {
//   event.preventDefault(); // Prevent the form from submitting the traditional way
//   const enrollmentNumber = document.getElementById('module2Input').value.trim();

//   // Send AJAX request to validate the enrollment number
//   fetch(`/enrollment/${enrollmentNumber}`)
//       .then(response => response.json())
//       .then(data => {
//           if (data.success) {
//               // If enrollment number is valid, redirect to the corresponding page
//               window.location.href = `/module2/${enrollmentNumber}`;
//           } else {
//               // If enrollment number is invalid, show an alert message for Module 2
//               alert(data.message);
//           }
//       })
//       .catch(error => {
//           console.error('Error:', error);
//           alert('An error occurred while validating enrollment number for Module 2');
//       });
// });


