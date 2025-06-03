// public/js/register.js

import { showMessage } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { username, email, password } = form;
    const data = {
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value,
    };

    if (!data.username || !data.email || !data.password) {
      showMessage(message, "All fields are required.");
      return;
    }

    try {
      const res = await fetch(`${window.API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        showMessage(
          message,
          result.message || "Registration successful!",
          "success",
        );
        form.reset();

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        showMessage(message, result.error || "Something went wrong.");
      }
    } catch {
      showMessage(message, "⚠️ Network error.");
    }
  });
});
