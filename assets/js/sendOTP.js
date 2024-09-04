import { API_BASE_URL } from './config.js';

document.getElementById('emailForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const email = document.getElementById('email').value;

    try {
        const response = await fetch(`${API_BASE_URL}/forgot-password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || "OTP sent successfully!"); // Show a success message
            window.location.href = "../Password reset.html"; // Redirect to the reset password page
        } else {
            const error = await response.json();
            alert(error.detail || "Failed to send OTP. Please try again.");
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
        console.error("Error:", error);
    }
});
