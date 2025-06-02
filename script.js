// script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const message = document.getElementById("message");

  if (!form || !message) {
    console.error("Form or message element not found in the DOM.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    message.className = "";
    message.textContent = "";

    if (!username || !email || !password) {
      message.textContent = "All fields are required";
      message.classList.add("error");
      return;
    }

    const data = { username, email, password };

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        form.reset();
        message.textContent = result.message || "Registration successful";
        message.classList.add("success");
      } else {
        message.textContent = result.error || "Something went wrong";
        message.classList.add("error");
      }
    } catch (err) {
      message.textContent = "⚠️ Network error";
      message.classList.add("error");
    }
  });
});
