// server.js

import express from "express";
import path from "path";
import { PORT, API_URL } from "./config/index.js";
import pageRoutes from "./routes/pageRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.resolve("public")));
app.use(pageRoutes);

// Dynamic frontend config
app.get("/js/config.js", (_req, res) => {
  res.type("application/javascript");
  res.send(`window.API_URL = "${API_URL}";`);
});

// Fallback route
app.use((_req, res) => {
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`🚀 Web client running at http://localhost:${PORT}`);
});
