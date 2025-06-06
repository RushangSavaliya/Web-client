// public/js/logout.js

document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("sessionToken");
  window.location.href = "/login";
});
