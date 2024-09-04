import { API_BASE_URL } from './config.js';

document.getElementById('seminarForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(document.getElementById('seminarForm'));

    // Extract and split full name
    const fullName = formData.get('studentName').trim().split(' ');
    const firstName = fullName.shift() || '';  // First part as first name
    const lastName = fullName.join(' ') || '';  // Remaining parts as last name
    formData.delete('studentName');  // Remove original full name field

    // Create reordered FormData object
    const newFormData = new FormData();
    newFormData.append('first_name', firstName);
    newFormData.append('last_name', lastName);
    for (let [key, value] of formData.entries()) {
        newFormData.append(key, value);
    }

    // Debugging: Log the new FormData to check key-value pairs
    // for (let [key, value] of newFormData.entries()) {
    //     console.log(key, value);  // Logs each key-value pair
    // }

    try {
        const response = await fetch(`${API_BASE_URL}/seminar/`, {
            method: 'POST',
            body: newFormData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')  // Add your authorization token
            }
        });

        if (response.ok) {
            alert("Seminar registration submitted successfully!");
            window.location.href = "../dash.html";
        } else {
            const error = await response.json();
            const errorMessage = error.detail || "Failed to submit registration. Please try again.";
            console.log(errorMessage);

            if (["Invalid token", "Token has expired", "User not found"].some(msg => errorMessage.includes(msg))) {
                alert("Please log in again.");
                window.location.href = "../login-registration.html";
            } else {
                alert(errorMessage);
            }
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
        console.error("Error:", error);
    }
});
