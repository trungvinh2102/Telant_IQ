import { Router } from "express";
import * as submissionController from "../controllers/submissionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, submissionController.submitCode);
router.get("/my", authMiddleware, submissionController.getUserSubmissions);

export default router;
