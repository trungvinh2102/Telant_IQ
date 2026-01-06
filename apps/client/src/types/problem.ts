/**
 * Problem Types
 */

export interface Example {
  id: number;
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  skeleton_code?: Record<string, unknown>;
  created_by?: string;
  creator_name?: string;
  test_cases?: TestCase[];
  examples?: Example[];
  constraints?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface TestCase {
  id?: number;
  input: string;
  expected_output: string;
  is_hidden: boolean;
}
