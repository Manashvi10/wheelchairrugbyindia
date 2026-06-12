import pool from "./db";

type LogType = "edit" | "create" | "delete" | "publish" | "upload";

export async function logActivity(
  type: LogType,
  description: string,
  actorName: string
) {
  try {
    await pool.execute(
      "INSERT INTO activity_logs (type, description, actor_name) VALUES (?, ?, ?)",
      [type, description, actorName]
    );
  } catch (e) {
    console.error("Activity log failed:", e);
  }
}
