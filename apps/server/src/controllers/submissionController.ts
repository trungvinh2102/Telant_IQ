import { Response } from "express";
import * as SubmissionModel from "../models/Submission";
import { AuthRequest } from "../types";

export const submitCode = async (req: AuthRequest, res: Response) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 1. Save initial submission as pending
    const submission = await SubmissionModel.createSubmission({
      user_id: userId,
      problem_id: problemId,
      code,
      language,
      status: "pending",
    });

    // 2. Simulate evaluation (Mock logic)
    // In a real app, this would be sent to a queue or a judge service
    setTimeout(async () => {
      try {
        const statuses: SubmissionModel.Submission["status"][] = [
          "accepted",
          "wrong_answer",
          "runtime_error",
        ];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        await SubmissionModel.updateSubmissionStatus(
          submission.id!,
          randomStatus,
          Math.floor(Math.random() * 200), // Execution time
          Math.floor(Math.random() * 50000) // Memory usage
        );
        console.log(
          `[server] 📝 Submission ${submission.id} evaluated as: ${randomStatus}`
        );
      } catch (err) {
        console.error("[server] ❌ Evaluation error:", err);
      }
    }, 2000);

    res.status(202).json({
      message: "Submission received and is being evaluated",
      submissionId: submission.id,
    });
  } catch (error) {
    const err = error as Error;
    console.error("[server] ❌ submitCode error:", err.message);
    res.status(500).json({ message: "Error processing submission" });
  }
};

export const getUserSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const submissions = await SubmissionModel.getSubmissionsByUser(userId);
    res.json(submissions);
  } catch (error) {
    const err = error as Error;
    console.error("[server] ❌ getUserSubmissions error:", err.message);
    res.status(500).json({ message: "Error fetching submissions" });
  }
};
