// userfind.js

// Add your JavaScript code for handling dynamic functionality here

function openUpdateForm() {
    const updateForm = document.getElementById('updateForm');
    updateForm.style.display = 'block';
  }
  
  function confirmDelete() {
    const deleteConfirmation = document.getElementById('deleteConfirmation');
    deleteConfirmation.style.display='block';
    
    
  }
  
 // userfind.js

function deleteStudent(enrollmentNumber) {
    if (confirm(`Are you sure you want to delete this student ${enrollmentNumber}?`)) {
      console.log(enrollmentNumber)
      // If the user confirms, send a POST request to the delete route
      fetch('/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enrollmentNumber: enrollmentNumber }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Server Response:', data);
        if (data.success) {
          window.location.href = '/studantmanagement';
        } else {
          console.error('Server reported failure:', data.error);
          alert('Error deleting student data');
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        window.location.href = '/studantmanagement';
      });
    }
  }
  
  function cancelDelete() {
    // Handle cancelation as needed
  }
  
  