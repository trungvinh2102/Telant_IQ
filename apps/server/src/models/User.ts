import pool from "../config/database";

export interface User {
  id?: string;
  username: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const createUser = async (user: User): Promise<User> => {
  const query = `
    INSERT INTO users (username, email, password_hash, first_name, last_name, avatar_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    user.username,
    user.email,
    user.password_hash,
    user.first_name,
    user.last_name,
    user.avatar_url,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = "SELECT * FROM users WHERE email = $1;";
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
};

export const findUserByUsername = async (
  username: string
): Promise<User | null> => {
  const query = "SELECT * FROM users WHERE username = $1;";
  const { rows } = await pool.query(query, [username]);
  return rows[0] || null;
};

export const findUserById = async (id: string): Promise<User | null> => {
  const query = "SELECT * FROM users WHERE id = $1;";
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};
