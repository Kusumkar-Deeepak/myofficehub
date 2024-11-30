function deleteStudent(enrollmentNo) {
    if (confirm("Are you sure you want to delete this student?")) {
      fetch('/deleteBus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enrollmentNumber: enrollmentNo })
      })
      .then(response => {
        if (response.ok) {
          // Redirect to the main page after successful deletion
          window.location.href = '/home'; // Update this route to match your main page route
        } else {
          // Handle the case where there was an error during deletion
          console.error('Error deleting student data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
}
function openUpdateForm(studentId) {
  // Redirect the user to the update form page with the specific student's id
  window.location.href = '/updateUser/' + studentId;
}
