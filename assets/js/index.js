document.addEventListener("DOMContentLoaded", () => {
    const accessToken = localStorage.getItem("accessToken");
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const userIcon = document.querySelector(".header-contact-right .header-search");
    // localStorage.clear()

    if (accessToken && userProfile) {
        const profileImageUrl = `http://localhost:8000/images/${userProfile.image_filename}`;
        userIcon.innerHTML = `
            <img src="${profileImageUrl}" alt="Profile Image" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">
        `;
        userIcon.href = "../dash.html";
    } else {
        userIcon.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "../login-registration.html";
        });
    }
});
