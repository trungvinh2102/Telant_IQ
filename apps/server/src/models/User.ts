import pool from "../config/database";

export interface User {
  id?: string;
  username: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role_id?: string;
  role_name?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const createUser = async (user: User): Promise<User> => {
  const query = `
    INSERT INTO users (username, email, password_hash, first_name, last_name, avatar_url, role_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    user.username,
    user.email,
    user.password_hash,
    user.first_name,
    user.last_name,
    user.avatar_url,
    user.role_id,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = `
    SELECT u.*, r.name as role_name 
    FROM users u 
    LEFT JOIN roles r ON u.role_id = r.id 
    WHERE u.email = $1;
  `;
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
};

export const findUserByUsername = async (
  username: string
): Promise<User | null> => {
  const query = `
    SELECT u.*, r.name as role_name 
    FROM users u 
    LEFT JOIN roles r ON u.role_id = r.id 
    WHERE u.username = $1;
  `;
  const { rows } = await pool.query(query, [username]);
  return rows[0] || null;
};

export const findUserById = async (id: string): Promise<User | null> => {
  const query = `
    SELECT u.*, r.name as role_name 
    FROM users u 
    LEFT JOIN roles r ON u.role_id = r.id 
    WHERE u.id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};
