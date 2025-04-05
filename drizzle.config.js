import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_K2ywz5OuAdEi@ep-aged-bread-a58oc6jc-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
  }
});
