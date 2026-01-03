import { Request, Response, NextFunction } from "express";

interface Error {
  status?: number;
  message?: string;
  stack?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("[server] ❌ Error:", err.message);
  console.error("[server] 📍 Stack:", err.stack);

  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
};
