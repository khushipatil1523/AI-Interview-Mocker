import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv"; 
import * as schema from "./schema";

config(); // Load environment variables

if (!process.env.NEXT_PUBLIC_DRIZZLE_DB_URL) {
    throw new Error("DRIZZLE_DB_URL is not defined. Check your .env.local file.");
}

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
export const db = drizzle(sql, { schema });
