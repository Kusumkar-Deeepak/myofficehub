
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

//modulle 1

let addstudant = document.getElementById('mod1but');
addstudant.addEventListener("click",()=>{

    window.location.href=`/addstudant`;
})
let doc = document.getElementById('mod3but');
doc.addEventListener("click",()=>{
    window.location.href=`/doc`;

    // window.location.href=`/addstudant`
    

})

// Add this script at the end of your HTML body or link it as an external JavaScript file

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("mod4but");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Close the modal
function closeModal() {
  modal.style.display = "none";
}

// Function to handle submission of enrollment number
function submitEnrollmentNumber() {
  // You can add your logic here to handle the submitted enrollment number
  var enrollmentNumber = document.getElementById("enrollmentNumber").value;
  console.log("Enrollment Number Submitted:", enrollmentNumber);
  window.location.href="/userfind"
  closeModal(); // Close the modal after submission
}






//module performance

// Add this script in your existing JavaScript file or create a new one

// Get the modal
var enrollmentModal = document.getElementById("enrollmentModal");

// Get the button that opens the modal
var mod2but = document.getElementById("mod2but");

// Get the <span> element that closes the modal
var closeEnrollmentModalBtn = document.getElementsByClassName("close")[1]; // Assuming the second close button in your modal is for enrollment

// When the user clicks the "Use This!" button, open the enrollment modal 
// mod2but.onclick = function() {
//   enrollmentModal.style.display = "block";
// }

// When the user clicks on the close button inside the enrollment modal
closeEnrollmentModalBtn.onclick = function() {
  enrollmentModal.style.display = "none";
}

// Close the enrollment modal when clicking anywhere outside of it
window.onclick = function(event) {
  if (event.target == enrollmentModal) {
    enrollmentModal.style.display = "none";
  }
}

// Close the enrollment modal
function closeEnrollmentModal() {
  enrollmentModal.style.display = "none";
}

// Function to handle submission of enrollment number
function submitEnrollmentNumber() {
  var enrollmentNumber = document.getElementById("enrollmentNumber").value;
  console.log("Enrollment Number Submitted:", enrollmentNumber);
  // You can add your logic here to handle the submitted enrollment number
  // Redirect to the next route or perform other actions as needed
  // For example: window.location.href = "/next-route?enrollmentNumber=" + enrollmentNumber;
  closeEnrollmentModal(); // Close the enrollment modal after submission
}






// Add this script in your existing JavaScript file or create a new one

var mod4but = document.getElementById("mod4but");
var enrollmentModal = document.getElementById("enrollmentModal");

mod4but.onclick = function() {
  enrollmentModal.style.display = "block";
}

// Other existing code...

function closeEnrollmentModal() {
  enrollmentModal.style.display = "none";
}

function submitEnrollmentNumber() {
  var enrollmentNumber = document.getElementById("enrollmentNumber").value;
  
  // Assuming you have a route for submitting enrollment number, update the URL accordingly
  fetch('/userfind', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ enrollmentNumber: enrollmentNumber }),
  })
  .then(response => response.json())
  .then(data => {
    // Assuming you have a function to display student details dynamically
    displayStudentDetails(data);
  })
  .catch((error) => {
    console.error('Error:', error);
    // Handle errors if needed
  });

  closeEnrollmentModal();
}

function displayStudentDetails(studentData) {
  // Modify this function to dynamically display student details on the userfind.ejs page
  // Access studentData to get the details and update the DOM
  console.log("Student Details:", studentData);
}
