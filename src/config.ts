import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const AWS_REGION = process.env.AWS_REGION || "eu-west-1";

const dbClient = new DynamoDBClient({
  region: AWS_REGION,
});

const DB_DOC_CLIENT = DynamoDBDocumentClient.from(dbClient);

const TABLE_NAMES = {
  USERS_TABLE_NAME: process.env.USERS_TABLE_NAME || "lbt_users",
};

export const CONFIG = {
  AWS_REGION,
  PORT: Number(process.env.PORT) || 3000,
};

export const DB_CONFIG = {
  DB_DOC_CLIENT,
  ...TABLE_NAMES,
};
