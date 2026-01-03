import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DATABASE_HOST || "127.0.0.1",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  database: process.env.DATABASE_NAME || "talent_iq",
  user: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
});

import fs from "fs";
import path from "path";

export const connectDB = async () => {
  console.log("[server] 🔄 Connecting to database...");
  console.log(
    `[server] 📡 Database config: ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
  );

  try {
    await pool.connect();
    console.log("[server] ✅ Database connected successfully");

    // Initialize schema in development
    if (process.env.NODE_ENV !== "production") {
      await initSchema();
    }
  } catch (error) {
    console.error("[server] ❌ Database connection failed:", error);
    console.error(
      "[server] 💡 Tip: Make sure PostgreSQL is running or update DATABASE_* variables in .env"
    );
    console.error(
      "[server] ⚠️  Server will start without database. Database-dependent features will not work."
    );
  }
};

const initSchema = async () => {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schema);
    console.log("[server] 🛠️  Database schema initialized");
  } catch (error) {
    console.error("[server] ❌ Failed to initialize schema:", error);
  }
};

export default pool;
