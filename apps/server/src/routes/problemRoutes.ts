import { Router } from "express";
import * as problemController from "../controllers/problemController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", problemController.getProblems);
router.get("/:slug", problemController.getProblem);
router.post("/", authMiddleware, problemController.addProblem);
router.put("/:id", authMiddleware, problemController.updateProblem);
router.delete("/:id", authMiddleware, problemController.deleteProblem);

export default router;
