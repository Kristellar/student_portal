import { API_BASE_URL } from './config.js';


document.getElementById('resetForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(document.getElementById('resetForm'));

    // Create a JSON object to send to the backend
    const data = {
        otp: formData.get('otp'),
        new_password: formData.get('new_password'),
        confirm_password: formData.get('confirm_password')
    };

    try {
        const response = await fetch(`${API_BASE_URL}/reset-password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Password reset successful!");
            window.location.href = "../login-registration.html";  // Redirect to success page
        } else {
            const error = await response.json();
            const errorMessage = error.detail || "Failed to reset password. Please try again.";
            alert(errorMessage);
        }
    } catch (error) {
        alert("An unexpected error occurred. Please try again.");
        console.error("Error:", error);
    }
});
