// function openPopup() {
//     document.getElementById('popup').style.display = 'flex';
// }

// function closePopup() {
//     document.getElementById('popup').style.display = 'none';
// }

// function generateBonafide() {
//     // Perform necessary actions to generate bonafide
//     // For simplicity, just show an alert
//     alert('Your Bonafide PDF is downloaded.');
//     closePopup();
// }

// document.getElementById('generateBtn').addEventListener('click', openPopup);


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

    // Function to close the modal
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
   document.getElementById("enrollmentInput").value="";
}


    // Function to validate the form
    function validateForm() {
        // Get form inputs
        var title = document.getElementById('title').value;
        var name = document.getElementById('name').value;
        var isWas = document.getElementById('isWas').value;
        var semester = document.getElementById('semester').value;
        var year = document.getElementById('year').value;
        var birthdate = document.getElementById('birthdate').value;
        var course = document.getElementById('course').value;
        var acaYear = document.getElementById('acaYear').value;
        var issueDate = document.getElementById('issueDate').value;

        // Perform validation
        if (title === '' || name === '' || isWas === '' || semester === '' || year === '' || birthdate === '' || course === '' || acaYear === '' || issueDate === '') {
            alert('All fields are required.');
            return false;
        }

        // Validation passed
        return true;
    }

    // Add event listener for form submission
    document.getElementById('inner').addEventListener('submit', function(event) {
        // Prevent form submission if validation fails
        if (!validateForm()) {
            event.preventDefault();
        }
    });
