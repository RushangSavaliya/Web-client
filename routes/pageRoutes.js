// routes/pageRoutes.js

import express from "express";
import path from "path";

const router = express.Router();
const htmlPath = path.resolve("public/html");

router.get("/register", (_req, res) => {
  res.sendFile(path.join(htmlPath, "register.html"));
});

router.get("/login", (_req, res) => {
  res.sendFile(path.join(htmlPath, "login.html"));
});

router.get("/dashboard", (_req, res) => {
  res.sendFile(path.join(htmlPath, "dashboard.html"));
});

export default router;
