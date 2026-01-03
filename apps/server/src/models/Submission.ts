import pool from "../config/database";

export interface Submission {
  id?: string;
  user_id: string;
  problem_id: string;
  code: string;
  language: string;
  status:
    | "pending"
    | "accepted"
    | "wrong_answer"
    | "time_limit_exceeded"
    | "runtime_error"
    | "compilation_error";
  execution_time?: number;
  memory_usage?: number;
  created_at?: Date;
}

export const createSubmission = async (
  submission: Submission
): Promise<Submission> => {
  const query = `
    INSERT INTO submissions (user_id, problem_id, code, language, status, execution_time, memory_usage)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    submission.user_id,
    submission.problem_id,
    submission.code,
    submission.language,
    submission.status,
    submission.execution_time,
    submission.memory_usage,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getSubmissionsByUser = async (
  userId: string
): Promise<Submission[]> => {
  const query =
    "SELECT * FROM submissions WHERE user_id = $1 ORDER BY created_at DESC;";
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

export const updateSubmissionStatus = async (
  id: string,
  status: string,
  execution_time?: number,
  memory_usage?: number
): Promise<Submission> => {
  const query = `
    UPDATE submissions 
    SET status = $1, execution_time = $2, memory_usage = $3
    WHERE id = $4
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    status,
    execution_time,
    memory_usage,
    id,
  ]);
  return rows[0];
};
