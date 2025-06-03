// server.js

import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(path.resolve("public/html/register.html"));
});

app.get("/login", (_req, res) => {
  res.sendFile(path.resolve("public/html/login.html"));
});

// Serve config.js that exposes API URL
app.get("/js/config.js", (_req, res) => {
  res.type(".js");
  res.send(`window.API_URL = "${process.env.URL}";`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
