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

  const usernameField = document.getElementById('signup-username');
  const passwordField = document.getElementById('signup-password');
  const emailField = document.getElementById('signup-email'); // Add email field
  
  const username = usernameField.value;
  const password = passwordField.value;
  const email = emailField.value;

  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Check if the username already exists
  const userExists = existingUsers.find(user => user.username === username);

  if (userExists) {
    alert('Username already exists.');
    return;
  }

  // Confirm account creation
  const createAccount = confirm('Are you sure you want to create this account?');

  if (createAccount) {
    existingUsers.push({ username, password, email }); // Save email with username and password
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Signup successful! You can now log in.');

    // Clear input fields and switch to login form
    usernameField.value = '';
    passwordField.value = '';
    emailField.value = ''; // Clear email field
    toggleForms();
  } else {
    // Clear the input fields if the user cancels
    usernameField.value = '';
    passwordField.value = '';
    emailField.value = ''; // Clear email field

    alert('Signup canceled.');
  }
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
  document.getElementById('login-email').value = '';

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Forgot Password handling
function handleForgotPassword(event) {
  event.preventDefault();

  const usernameField = document.getElementById('forgot-username');
  const username = usernameField.value;

  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = existingUsers.find(user => user.username === username);

  if (user) {
    const newPassword = prompt('Enter your new password:');
    if (newPassword) {
      user.password = newPassword;
      localStorage.setItem('users', JSON.stringify(existingUsers));

      alert('Password reset successful! You can now log in with your new password.');

      // Clear input and automatically switch to login form
      usernameField.value = '';
      toggleForms(); // Switch to login form
    } else {
      alert('Password reset failed. Please try again.');
    }
  } else {
    alert('Username not found. Please check and try again.');
  }

  // Clear the input field after submission
  usernameField.value = '';
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
