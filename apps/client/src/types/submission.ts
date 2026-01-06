/**
 * Submission Types
 */

export interface Submission {
  id: number;
  problem_id: number;
  user_id: number;
  language: string;
  code: string;
  status:
    | "pending"
    | "accepted"
    | "wrong_answer"
    | "runtime_error"
    | "time_limit_exceeded"
    | "compilation_error";
  execution_time?: number;
  memory_used?: number;
  created_at: string;
}

export interface SubmissionRequest {
  problem_id: string;
  language: string;
  code: string;
}
