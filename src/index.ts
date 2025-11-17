import "dotenv/config";
import express from "express";

import { CONFIG } from "./config.ts";

import { healthcheck } from "./endpoints/healthcheck/index.ts";
import { register } from "./endpoints/register/index.ts";

const app = express();

app.use(express.json());

app.get("/health", healthcheck);
app.post("/register", register);

app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
});
