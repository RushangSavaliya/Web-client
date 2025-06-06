// public/js/login.js

import { showMessage } from "./modules/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("sessionToken")) {
    window.location.href = "/dashboard";
    return;
  }

  const form = document.getElementById("loginForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value;

    if (!username || !password) {
      showMessage(message, "Please fill in both fields.", "error");
      return;
    }

    try {
      const res = await fetch(`${window.API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("sessionToken", result.token);
        showMessage(message, result.message || "Login successful!", "success");
        form.reset();
        setTimeout(() => (window.location.href = "/dashboard"), 1500);
      } else {
        showMessage(message, result.error || "Login failed.", "error");
      }
    } catch {
      showMessage(message, "Network error. Try again.", "error");
    }
  });
});
