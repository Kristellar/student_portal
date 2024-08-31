// logout.js

document.getElementById("logoutButton").addEventListener("click", () => {
    // Clear the access token from local storage
    localStorage.removeItem("accessToken");
    
    // Optionally, you can also clear any other user-related data from local storage or session storage here
    
    // Redirect to the login page or any other page
    window.location.href = "login-registration.html"; // Redirect to login or home page
});
