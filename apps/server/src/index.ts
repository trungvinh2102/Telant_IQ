import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";

dotenv.config();

import { connectDB } from "./config/database";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import { setupSocket } from "./config/socket";

console.log("[server] 🚀 Starting Talent IQ Server...");
console.log("[server] 🌍 NODE_ENV:", process.env.NODE_ENV || "development");

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

// 1. CORS - MUST BE AT THE VERY TOP
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Cookie",
    ],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// 2. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. Compression and Logging
app.use(compression() as any);
app.use(requestLogger);

// 4. Security Headers (Permissive for local dev)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false, // Disable CSP for local dev to avoid interference
  })
);

// Setup Socket.io
setupSocket(httpServer);

// 5. Routes
app.use("/", routes);

// 6. Error Handling
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    // Listen on both IPv4 and IPv6 if possible, but 0.0.0.0 is safe for IPv4
    httpServer.listen(Number(PORT), () => {
      console.log(`[server] 🚀 Server running on port ${PORT}`);
      console.log(`[server] 📡 API available at http://127.0.0.1:${PORT}/api`);
    });
  } catch (error) {
    console.error("[server] ❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
