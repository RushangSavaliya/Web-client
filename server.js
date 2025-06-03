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

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
