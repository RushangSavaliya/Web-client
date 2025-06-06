// public/js/register.js

import { showMessage } from "./modules/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("sessionToken")) {
    window.location.href = "/dashboard";
    return;
  }

  const form = document.getElementById("registerForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!username || !email || !password) {
      showMessage(message, "All fields are required.", "error");
      return;
    }

    try {
      const res = await fetch(`${window.API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await res.json();

      if (res.ok) {
        showMessage(message, result.message || "Registered!", "success");
        form.reset();
        setTimeout(() => (window.location.href = "/login"), 1500);
      } else {
        showMessage(message, result.error || "Registration failed.", "error");
      }
    } catch {
      showMessage(message, "Network error. Try again.", "error");
    }
  });
});
