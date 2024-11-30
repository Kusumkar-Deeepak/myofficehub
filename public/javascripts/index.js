// function vedu() {
//     window.location.href = "https://www.instagram.com/vedu_8733/";
// }
// function rushi() {
//     window.location.href = "https://www.instagram.com/rushi_karlekar/";
// }
// function vaibhav() {
//     window.location.href = "https://www.instagram.com/v.a.i.b.h.a.v_80/";
// }
// function deepak() {
//     window.location.href = "https://www.instagram.com/__deeepak__08/";
// }

    // Check if the browser supports the navigator.online property
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

