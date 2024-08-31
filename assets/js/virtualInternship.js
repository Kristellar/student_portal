document.getElementById('internshipForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('internshipForm'));

    // Extract and split full name
    const fullName = formData.get('fullName').trim().split(' ');
    const firstName = fullName.shift() || '';
    const lastName = fullName.join(' ') || '';
    formData.delete('fullName');

    // Create reordered FormData object
    const newFormData = new FormData();
    newFormData.append('first_name', firstName);
    newFormData.append('last_name', lastName);
    for (let [key, value] of formData.entries()) {
        newFormData.append(key, value);
    }


    for (let [key, value] of newFormData.entries()) {
        console.log(key, value); // Logs each key-value pair
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/virtualInternship/', {
            method: 'POST',
            body: newFormData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        });

        if (response.ok) {
            alert("Application submitted successfully!");
            window.location.href = "../dash.html";
        } else {
            const error = await response.json();
            const errorMessage = error.detail || "Failed to submit application. Please try again.";
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
