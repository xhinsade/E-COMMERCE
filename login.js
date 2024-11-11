// Function to toggle between login and signup forms
function toggleForms() {
  const loginForm = document.getElementById('login-main');
  const signupForm = document.getElementById('signup-main');

  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  }
}

// Signup handling
function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  // Retrieve existing users from localStorage or initialize an empty array
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Check if the username already exists
  const userExists = existingUsers.find(user => user.username === username);

  if (userExists) {
    alert('Username already exists.');
    return;  // Stop execution if the username exists
  }

  // If the username doesn't exist, create a new user and save it
  existingUsers.push({ username, password });
  localStorage.setItem('users', JSON.stringify(existingUsers));

  // Show signup confirmation
  alert('Signup successful! You can now log in.');

  // Clear the input fields after submission
  document.getElementById('signup-username').value = '';
  document.getElementById('signup-password').value = '';

  // Optionally, auto-toggle to login form after signup
  setTimeout(() => {
    toggleForms(); 
  }, 2000); // 2 seconds delay before toggling to login form
}

// Login handling
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = existingUsers.find(user => user.username === username && user.password === password);

  const notification = document.getElementById('login-notification');

  if (user) {
    alert('Login successful!');
    window.location.href = 'home.html'; // Redirect to home page
  } else {
    notification.style.display = 'block';
    notification.style.color = 'red'; 
    notification.textContent = 'Invalid username or password.';
  }

  // Clear the input fields after submission
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Forgot Password handling
function handleForgotPassword(event) {
  event.preventDefault();

  const username = document.getElementById('forgot-username').value;

  // Get all users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Check if username exists
  const user = existingUsers.find(user => user.username === username);

  const notification = document.getElementById('forgot-password-notification');

  if (user) {
    // If username exists, ask for new password
    const newPassword = prompt('Enter your new password:');
    if (newPassword) {
      user.password = newPassword;  // Update password
      localStorage.setItem('users', JSON.stringify(existingUsers));  // Save updated user data

      notification.style.display = 'block';
      notification.style.color = 'green';
      notification.textContent = 'Password reset successful! You can now log in with your new password.';
    } else {
      notification.style.display = 'block';
      notification.style.color = 'red';
      notification.textContent = 'Password reset failed. Please try again.';
    }
  } else {
    // If username doesn't exist
    notification.style.display = 'block';
    notification.style.color = 'red';
    notification.textContent = 'Username not found. Please check and try again.';
  }

  // Clear the input field after submission
  document.getElementById('forgot-username').value = '';

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Show Forgot Password form
function showForgotPasswordForm() {
  document.getElementById('login-main').style.display = 'none'; // Hide the login form
  document.getElementById('forgot-password-main').style.display = 'block'; // Show the forgot password form
}

// Show Login form
function showLoginForm() {
  document.getElementById('forgot-password-main').style.display = 'none'; // Hide the forgot password form
  document.getElementById('login-main').style.display = 'block'; // Show the login form
}

// Toggle password visibility for login form
const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const loginPasswordField = document.getElementById('login-password');
toggleLoginPassword.addEventListener('click', function() {
  const type = loginPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
  loginPasswordField.setAttribute('type', type);
  this.src = type === 'password' ? 'resources/hidePassword.png' : 'resources/seePassword.png'; // Change image based on visibility
});

// Toggle password visibility for signup form
const toggleSignupPassword = document.getElementById('toggleSignupPassword');
const signupPasswordField = document.getElementById('signup-password');
toggleSignupPassword.addEventListener('click', function() {
  const type = signupPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
  signupPasswordField.setAttribute('type', type);
  this.src = type === 'password' ? 'resources/hidePassword.png' : 'resources/seePassword.png'; // Change image based on visibility
});
