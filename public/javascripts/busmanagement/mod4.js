document.addEventListener('DOMContentLoaded', function () {
  const openPopupBtns = document.querySelectorAll('.open-popup-btn');

  openPopupBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Get the relevant bus details from the clicked button or other data source
      const busName = this.dataset.busName;
      const driverName = this.dataset.driverName;
      const busNo = this.dataset.busNo;

      // Call the function to open the popup with dynamic content
      openPopup(busName, driverName, busNo);
    });
  });

  // Function to open the popup with dynamic content
  function openPopup(busName, driverName, busNo) {
    const popup = document.getElementById('popup');
    const title = document.getElementById('busDetailsTitle');
    const content = document.getElementById('busDetailsContent');

    // Set the title
    title.textContent = `Bus Details - ${busName}`;

    // Set the content dynamically
    content.innerHTML = `
      <p><strong>Driver Name:</strong> ${driverName}</p>
      <p><strong>Bus No:</strong> ${busNo}</p>
      <!-- Add more details as needed -->
    `;

    // Display the popup
    popup.style.display = 'block';
  }

  // Function to close the popup
  window.closePopup = function () {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
  };
});
