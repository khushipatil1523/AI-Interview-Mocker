import { db } from "@/utils/db"; // adjust path if needed

export default async function KeepAliveServer() {
  try {
    await db.execute(`SELECT 1`);
    console.log("✅ Neon DB pinged from server");
  } catch (error) {
    console.error("❌ DB ping failed:", error);
  }

  return null;
}
