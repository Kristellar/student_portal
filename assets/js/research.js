document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submissionForm').addEventListener('submit', async function (e) {
        e.preventDefault();  // Prevent the default form submission

        const form = document.getElementById('submissionForm');
        const formData = new FormData(form);

        // Debugging: Log the FormData to check key-value pairs
        for (let [key, value] of formData.entries()) {
            console.log(key, value);  // Logs each key-value pair
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/research-paper/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')  // Add your authorization token
                }
            });

            if (response.ok) {
                alert("Research paper submitted successfully!");
                window.location.href = "../dash.html";  // Redirect to dashboard or any other page
            } else {
                const error = await response.json();
                const errorMessage = error.detail || "Failed to submit research paper. Please try again.";
                console.log(errorMessage);

                if (["Invalid token", "Token has expired", "User not found"].some(msg => errorMessage.includes(msg))) {
                    alert("Please log in again.");
                    window.location.href = "../login-registration.html";  // Redirect to login page
                } else {
                    alert(errorMessage);
                }
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
            console.error("Error:", error);
        }
    });
});
