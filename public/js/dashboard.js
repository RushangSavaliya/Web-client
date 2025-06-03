// public/js/dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const welcomeMessage = document.getElementById("welcomeMessage");
  const logoutBtn = document.getElementById("logoutBtn");

  // Check if token exists in localStorage
  const token = localStorage.getItem("sessionToken");
  if (!token) {
    // No token, redirect to login
    window.location.href = "/login";
    return;
  }

  // Optional: Display username or fetch profile using token if needed
  welcomeMessage.textContent = "You are logged in with a valid session.";

  logoutBtn.addEventListener("click", async () => {
    try {
      // Call API to delete session (logout server-side)
      const res = await fetch(`${window.API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }), // send token in body per your backend
      });

      if (res.ok) {
        localStorage.removeItem("sessionToken");
        window.location.href = "/login";
      } else {
        alert("Logout failed. Try again.");
      }
    } catch {
      alert("Network error during logout.");
    }
  });
});
