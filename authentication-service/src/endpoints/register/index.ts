import type { Request, Response } from "express";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

import { DB_CONFIG } from "../../config";
import { encrypt } from "../../utils/encrypt";

import type { RegisterBody, User } from "../../types";

const { DB_DOC_CLIENT } = DB_CONFIG;

export const register = async (
  request: Request<unknown, unknown, RegisterBody>,
  response: Response
) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response
        .status(400)
        .json({ error: "The username and password are required" });
    }

    const { hash, salt } = await encrypt(password);
    const now = new Date().toISOString();
    const userIpHeader = request.headers["x-forwarded-for"];
    const ip =
      (typeof userIpHeader === "string" && userIpHeader.split(",")[0].trim()) ||
      request.ip ||
      "unknown";

    const userAgent = request.headers["user-agent"] ?? "unknown";

    const user: User = {
      id: uuidv4(),
      username,
      password_hash: hash,
      password_salt: salt,
      registered_at: now,
      ip_addresses: [ip],
      user_agents: [userAgent],
    };

    await DB_DOC_CLIENT.send(
      new PutCommand({
        TableName: DB_CONFIG.USERS_TABLE_NAME,
        Item: user,
        ConditionExpression: "attribute_not_exists(username)",
      })
    );

    return response
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (err: any) {
    console.error(err);

    if (err?.name === "ConditionalCheckFailedException") {
      return response
        .status(409)
        .json({ error: "Entry with this username already exists" });
    }

    return response.status(500).json({ error: "Internal server error" });
  }
};
