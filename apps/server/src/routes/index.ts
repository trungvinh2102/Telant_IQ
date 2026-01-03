import { Router, Request, Response } from "express";

const router = Router();

import authRoutes from "./authRoutes";
import problemRoutes from "./problemRoutes";
import submissionRoutes from "./submissionRoutes";

router.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "Server is running" });
});

router.use("/api/auth", authRoutes);
router.use("/api/problems", problemRoutes);
router.use("/api/submissions", submissionRoutes);

router.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Talent IQ API v1" });
});

export default router;
