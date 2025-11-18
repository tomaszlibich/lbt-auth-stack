import "dotenv/config";
import express from "express";

import { CONFIG } from "./config";

import { register } from "./endpoints/register";

const app = express();

app.use(express.json());

app.post("/register", register);

app.listen(CONFIG.PORT, () => {
  console.log(`Authentication Service running on port ${CONFIG.PORT}`);
});
