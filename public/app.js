// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login');
    const profileCard = document.getElementById('profileCard');
    const profileDiv = document.getElementById('profile');
  
    // Function to handle login button click
    const handleLogin = () => {
      window.location.href = 'http://localhost:3000/auth/github';
    };
  
    loginButton.addEventListener('click', handleLogin);
  
    // Function to fetch and display user profile data
    const showUserProfile = async () => {
      const response = await fetch('http://localhost:3000/profile');
      const data = await response.text();
  
      // Update the profileDiv with the access token
      profileDiv.textContent = data;
  
      // Show the profile card
      profileCard.classList.remove('hidden');
    };
  
    // Call the function to fetch user profile when the page loads
    showUserProfile();
  });
  