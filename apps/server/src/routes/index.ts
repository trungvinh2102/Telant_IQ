import { Router, Request, Response } from "express";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "Server is running" });
});

router.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Talent IQ API" });
});

export default router;
