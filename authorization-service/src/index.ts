import "dotenv/config";
import express from "express";

import { CONFIG } from "./config";

import { healthcheck } from "./endpoints/healthcheck";

const app = express();

app.use(express.json());

app.get("/health", healthcheck);

app.listen(CONFIG.PORT, () => {
  console.log(`Authorization Service running on port ${CONFIG.PORT}`);
});
