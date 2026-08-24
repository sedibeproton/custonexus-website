import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const db = new Database("./sqlite.db");

export const auth = betterAuth({
  database: db,

  emailAndPassword: {
    enabled: true,
  },
});