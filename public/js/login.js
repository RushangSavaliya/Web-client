import { showMessage } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // 🔒 Redirect if already logged in
  const token = localStorage.getItem("sessionToken");
  if (token) {
    window.location.href = "/dashboard";
    return;
  }

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
      const res = await fetch(`${window.API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("sessionToken", result.token);
        showMessage(message, result.message || "Login successful!", "success");
        form.reset();

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        showMessage(message, result.error || "Login failed.");
      }
    } catch {
      showMessage(message, "Network error. Try again.");
    }
  });
});
