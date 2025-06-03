// public/js/login.js

import { showMessage } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { username, password } = form;
    const data = {
      username: username.value.trim(),
      password: password.value,
    };

    if (!data.username || !data.password) {
      showMessage(message, "Please fill in both fields.");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        showMessage(message, result.message || "Login successful!", "success");
        form.reset();
        // Optional redirect
      } else {
        showMessage(message, result.error || "Login failed.");
      }
    } catch {
      showMessage(message, "Network error. Try again.");
    }
  });
});
