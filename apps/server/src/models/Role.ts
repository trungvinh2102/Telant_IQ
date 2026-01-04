import pool from "../config/database";

export interface Role {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
}

export const findRoleByName = async (name: string): Promise<Role | null> => {
  const query = "SELECT * FROM roles WHERE name = $1;";
  const { rows } = await pool.query(query, [name]);
  return rows[0] || null;
};

export const getAllRoles = async (): Promise<Role[]> => {
  const query = "SELECT * FROM roles;";
  const { rows } = await pool.query(query);
  return rows;
};
