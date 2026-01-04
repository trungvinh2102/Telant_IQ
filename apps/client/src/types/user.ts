/**
 * User Types
 */

export interface User {
  id: string; // Changed from number to string because DB uses UUID
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  name?: string; // Virtual or concatenated name
  avatar_url?: string;
  roles?: string[]; // Multiple roles supported now
  role?: "admin" | "user"; // Kept for compatibility if needed
  created_at?: string;
  updated_at?: string;
}
