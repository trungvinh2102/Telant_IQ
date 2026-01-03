import { User } from "./user";

/**
 * Auth Types
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  name?: string;
}
