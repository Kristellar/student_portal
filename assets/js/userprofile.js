import { API_BASE_URL } from './config.js';

document.addEventListener("DOMContentLoaded", async () => {
    const accessToken = localStorage.getItem("accessToken");
    const backendUrl = "http://localhost:8000/user";

    if (!accessToken) {
        alert("You need to log in first.");
        window.location.href = "login-registration.html"; // Redirect to login if no token is present
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const user = await response.json(); // Expecting a single user object
            displayProfile(user);
        } else {
            const error = await response.json();
            const errorMessage = error.detail;
            console.log(errorMessage)

            if (errorMessage.includes("Invalid token") || errorMessage.includes("Token has expired") || errorMessage.includes("User not found")) {
                alert("Please log in again.");
                window.location.href = "../login-registration.html"; // Redirect to the login page
            } else {
                alert(errorMessage || "Failed to submit application. Please try again.");
            }
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please try again later.");
    }
});

function displayProfile(user) {
    const profileContainer = document.getElementById("profileContainer");
    const imageBaseUrl = "http://localhost:8000/images/"; // Adjust this base URL to match your server configuration

    if (user) {
        profileContainer.innerHTML = `
            <img src="${imageBaseUrl}${user.image_filename}" alt="Profile Picture">
            <h2>${user.first_name} ${user.last_name}</h2>
            <p>Email: ${user.email_id}</p>
            <p>Contact: ${user.mobile_number}</p>
        `;
    } else {
        profileContainer.innerHTML = "<p>No user data available.</p>";
    }
}
