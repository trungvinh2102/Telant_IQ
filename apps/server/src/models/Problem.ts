import pool from "../config/database";

export interface Problem {
  id?: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  skeleton_code: Record<string, unknown>;
  created_at?: Date;
  updated_at?: Date;
}

export const getAllProblems = async (): Promise<Problem[]> => {
  const query = "SELECT * FROM problems ORDER BY created_at DESC;";
  const { rows } = await pool.query(query);
  return rows;
};

export const getProblemBySlug = async (
  slug: string
): Promise<Problem | null> => {
  const query = "SELECT * FROM problems WHERE slug = $1;";
  const { rows } = await pool.query(query, [slug]);
  return rows[0] || null;
};

export const createProblem = async (problem: Problem): Promise<Problem> => {
  const query = `
    INSERT INTO problems (title, slug, description, difficulty, tags, skeleton_code)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    problem.title,
    problem.slug,
    problem.description,
    problem.difficulty,
    problem.tags,
    JSON.stringify(problem.skeleton_code),
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};
