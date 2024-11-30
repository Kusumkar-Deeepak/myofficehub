
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


const mod11but = document.getElementById('mod1but');

// // Add a click event listener to the button
// mod11but.addEventListener('click', function() {
//     window.location.href = '/add-document';
// mod1but.addEventListener('click', function() {
//     window.location.href = '/addDocument';
//   });
  

// function openModal() {
//     document.getElementById('myModal').style.display = 'block';
//   }
  
//   function closeModal() {
//     document.getElementById('myModal').style.display = 'none';
//   } 

//   document.getElementById('mod1but').addEventListener('click', openModal);

//   // Function to close the modal
// function closeModal() {
//     const modal = document.getElementById('myModal');
//     modal.style.display = 'none';
//    document.getElementById("enrollmentInput").value="";
// }
