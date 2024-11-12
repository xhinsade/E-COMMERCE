// JavaScript to handle Profile Dropdown Toggle
document.querySelector('.profile-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevents default link behavior
    const dropdown = this.nextElementSibling; // The .dropdown-content
    dropdown.classList.toggle('show'); // Toggles the visibility by adding/removing the 'show' class
});


// Function to navigate to the Orders page
function goToOrders() {
    // Add any additional logic here if needed (e.g., fetching order data)
    window.location.href = "orders.html"; // Navigates to the Orders Page
}

// Function to handle user logout without clearing data
function handleLogout() {
    // Ask for user confirmation before logging out
    const confirmation = confirm("Are you sure you want to log out?");
    
    if (confirmation) {
        // Alert the user that they have logged out, but their data is still available
        alert("You have been logged out. Your data is still available for next login.");
        
        // Redirect the user to the login page after confirmation
        window.location.href = "index.html"; // Redirects to the Login Page
    } else {
        // If the user cancels, show an alert confirming the action was canceled
        alert("Logout canceled. You are still logged in.");
    }
}
