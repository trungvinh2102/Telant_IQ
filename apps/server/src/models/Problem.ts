import pool from "../config/database";

export interface Problem {
  id?: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  skeleton_code: Record<string, unknown>;
  examples?: Record<string, unknown>[];
  constraints?: string[];
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const getAllProblems = async (): Promise<Problem[]> => {
  const query = `
    SELECT p.*, u.username as creator_name 
    FROM problems p
    LEFT JOIN users u ON p.created_by = u.id
    ORDER BY p.created_at DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const getProblemBySlug = async (
  slug: string
): Promise<Problem | null> => {
  const query = `
    SELECT p.*, u.username as creator_name 
    FROM problems p
    LEFT JOIN users u ON p.created_by = u.id
    WHERE p.slug = $1;
  `;
  const { rows } = await pool.query(query, [slug]);
  return rows[0] || null;
};

export const createProblem = async (problem: Problem): Promise<Problem> => {
  const query = `
    INSERT INTO problems (title, slug, description, difficulty, tags, skeleton_code, examples, constraints, created_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  const values = [
    problem.title,
    problem.slug,
    problem.description,
    problem.difficulty,
    problem.tags,
    JSON.stringify(problem.skeleton_code),
    JSON.stringify(problem.examples || []),
    problem.constraints || [],
    problem.created_by,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const updateProblem = async (
  id: string,
  problem: Partial<Problem>
): Promise<Problem | null> => {
  const updates: string[] = [];
  const values: unknown[] = [];
  let index = 1;

  if (problem.title) {
    updates.push(`title = $${index++}`);
    values.push(problem.title);
  }
  if (problem.slug) {
    updates.push(`slug = $${index++}`);
    values.push(problem.slug);
  }
  if (problem.description) {
    updates.push(`description = $${index++}`);
    values.push(problem.description);
  }
  if (problem.difficulty) {
    updates.push(`difficulty = $${index++}`);
    values.push(problem.difficulty);
  }
  if (problem.tags) {
    updates.push(`tags = $${index++}`);
    values.push(problem.tags);
  }
  if (problem.skeleton_code) {
    updates.push(`skeleton_code = $${index++}`);
    values.push(JSON.stringify(problem.skeleton_code));
  }
  if (problem.examples) {
    updates.push(`examples = $${index++}`);
    values.push(JSON.stringify(problem.examples));
  }
  if (problem.constraints) {
    updates.push(`constraints = $${index++}`);
    values.push(problem.constraints);
  }

  if (updates.length === 0) return null;

  updates.push(`updated_at = CURRENT_TIMESTAMP`);

  const query = `
    UPDATE problems 
    SET ${updates.join(", ")}
    WHERE id = $${index}
    RETURNING *;
  `;
  values.push(id);

  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

export const deleteProblem = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM problems WHERE id = $1;";
  const result = await pool.query(query, [id]);
  return (result.rowCount ?? 0) > 0;
};
