import { API_BASE_URL } from './config.js';

const backendUrl = "http://127.0.0.1:8000/users/"


document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        console.log("ok")
        const response = await fetch(`${API_BASE_URL}/users/`, {
            method: "POST",
            body: formData,
        });

        console.log("Response status:", response.status);
        console.log(response);

        if (response.ok) {
            const data = await response.json();
            console.log("Registration successful:", data);
            window.location.href = "../login-registration.html";
        } else {
            const errorData = await response.json().catch(() => ({ detail: ["Registration failed."] }));
            console.error("Registration failed:", errorData);
            alert(`Registration failed: ${errorData.detail[0] || "An unknown error occurred."}`);
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please try again later.");
    }
});
