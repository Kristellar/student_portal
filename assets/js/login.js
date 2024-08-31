document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const loginData = {
        username: document.getElementById("email_id").value,
        password: document.getElementById("password").value,
    };

    const backendUrl = "http://localhost:8000";

    try {
        let response = await fetch(`${backendUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            let data = await response.json();
            localStorage.setItem("accessToken", data.access_token);

            // Fetch and store user profile data
            let profileResponse = await fetch(`${backendUrl}/user/profile/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${data.access_token}`,
                    "Content-Type": "application/json"
                }
            });

            if (profileResponse.ok) {
                let user = await profileResponse.json();
                localStorage.setItem("userProfile", JSON.stringify(user));
                window.location.href = "../dash.html";
            } else {
                window.location.href = "../login-registration.html";
            }

        } else {
            alert("Login failed. Check your credentials.");
        }
    } catch (error) {
        alert("Network error. Please try again later.");
    }
});
