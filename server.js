// server.js

import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (css, js, images)
app.use(express.static(path.resolve("public")));

// Routes for pages
app.get("/", (_req, res) => {
  res.sendFile(path.resolve("public/html/register.html"));
});

app.get("/login", (_req, res) => {
  res.sendFile(path.resolve("public/html/login.html"));
});

app.get("/dashboard", (_req, res) => {
  res.sendFile(path.resolve("public/html/dashboard.html"));
});

// Serve config.js exposing API URL to frontend
app.get("/js/config.js", (_req, res) => {
  res.type(".js");
  res.send(`window.API_URL = "${process.env.URL}";`);
});

// Optional: Catch-all route - redirect unknown paths to login or 404 page
app.use((_req, res) => {
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
