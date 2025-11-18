import "dotenv/config";
import type { Request, Response } from "express";
import express from "express";

import { CONFIG } from "./config";

const app = express();

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.listen(CONFIG.PORT, () => {
  console.log(`Healthcheck Endpoint running on port ${CONFIG.PORT}`);
});
