import { Request, Response } from "express";
import * as ProblemModel from "../models/Problem";

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

export const addProblem = async (req: Request, res: Response) => {
  try {
    const problem = await ProblemModel.createProblem(req.body);
    res.status(201).json(problem);
  } catch (error) {
    const err = error as Error;
    console.error("[server] ❌ addProblem error:", err.message);
    res.status(500).json({ message: "Error creating problem" });
  }
};
