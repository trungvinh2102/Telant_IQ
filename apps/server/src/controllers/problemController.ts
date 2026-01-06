import { Request, Response } from "express";
import * as ProblemModel from "../models/Problem";
import { AuthRequest } from "../types";

export const getProblems = async (req: Request, res: Response) => {
  try {
    const problems = await ProblemModel.getAllProblems();
    res.json(problems);
  } catch (error) {
    const err = error as Error;
    console.error("[server] ❌ getProblems error:", err.message);
    res.status(500).json({ message: "Error fetching problems" });
  }
};

export const getProblem = async (req: Request, res: Response) => {
  try {
    const problem = await ProblemModel.getProblemBySlug(req.params.slug);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json(problem);
  } catch (error) {
    const err = error as Error;
    console.error("[server] ❌ getProblem error:", err.message);
    res.status(500).json({ message: "Error fetching problem" });
  }
};

export const addProblem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const problemData = { ...req.body, created_by: userId };
    const problem = await ProblemModel.createProblem(problemData);
    res.status(201).json(problem);
  } catch (error) {
    const err = error as Error;
    console.error("[server] ❌ addProblem error:", err.message);
    res.status(500).json({ message: "Error creating problem" });
  }
};

export const updateProblem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    // Fetch existing problem to check ownership
    const problems = await ProblemModel.getAllProblems();
    const existingProblem = problems.find(p => p.id === id);

    if (!existingProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const isSystemAdmin = userRole === "system_admin";
    const isAdmin = userRole === "admin";
    const isOwner = existingProblem.created_by === userId;
    const isModerator = userRole === "moderator";

    if (!isSystemAdmin && !isAdmin && !(isModerator && isOwner)) {
      return res
        .status(403)
        .json({ message: "You don't have permission to update this problem" });
    }

    const updatedProblem = await ProblemModel.updateProblem(id, req.body);
    res.json(updatedProblem);
  } catch (error) {
    const err = error as Error;
    console.error("[server] ❌ updateProblem error:", err.message);
    res.status(500).json({ message: "Error updating problem" });
  }
};

export const deleteProblem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    // Fetch existing problem to check ownership
    const problems = await ProblemModel.getAllProblems();
    const existingProblem = problems.find(p => p.id === id);

    if (!existingProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const isSystemAdmin = userRole === "system_admin";
    const isAdmin = userRole === "admin";
    const isOwner = existingProblem.created_by === userId;
    const isModerator = userRole === "moderator";

    if (!isSystemAdmin && !isAdmin && !(isModerator && isOwner)) {
      return res
        .status(403)
        .json({ message: "You don't have permission to delete this problem" });
    }

    await ProblemModel.deleteProblem(id);
    res.json({ message: "Problem deleted successfully" });
  } catch (error) {
    const err = error as Error;
    console.error("[server] ❌ deleteProblem error:", err.message);
    res.status(500).json({ message: "Error deleting problem" });
  }
};
