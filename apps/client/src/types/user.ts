/**
 * User Types
 */

export interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role: "admin" | "user";
  created_at?: string;
  updated_at?: string;
}
