import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./config/database";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";

console.log("[server] 🚀 Starting Talent IQ Server...");
console.log("[server] 🌍 NODE_ENV:", process.env.NODE_ENV || "development");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(compression() as any);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/", routes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[server] 🚀 Server running on port ${PORT}`);
      console.log(`[server] 📡 API available at http://localhost:${PORT}/api`);
      console.log(`[server] 🔒 CORS origin: ${process.env.CORS_ORIGIN}`);
    });
  } catch (error) {
    console.error("[server] ❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
