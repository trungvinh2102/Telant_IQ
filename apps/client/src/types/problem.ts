/**
 * Problem Types
 */

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  test_cases?: TestCase[];
  created_at?: string;
  updated_at?: string;
}

export interface TestCase {
  id?: number;
  input: string;
  expected_output: string;
  is_hidden: boolean;
}
