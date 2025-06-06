// public/js/dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("sessionToken");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  // Load user-specific dashboard content
  // This is a placeholder — replace with actual data fetching
  document.getElementById("dashboard").innerText = "Welcome to your dashboard!";
});
