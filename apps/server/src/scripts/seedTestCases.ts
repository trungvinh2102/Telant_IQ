import pool from "../config/database";

const seed = async () => {
  try {
    console.log("Seeding Two Sum Test Cases...");

    // 1. Get Problem ID
    const res = await pool.query(
      "SELECT id FROM problems WHERE title = 'Two Sum' OR slug = 'two-sum' LIMIT 1"
    );
    let problemId;

    if (res.rows.length === 0) {
      console.log("Problem not found. Creating 'Two Sum'...");
      const insert = await pool.query(`
        INSERT INTO problems (title, slug, description, difficulty, tags, skeleton_code, created_by)
        VALUES (
            'Two Sum', 
            'two-sum', 
            'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 
            'easy', 
            ARRAY['Array', 'Hash Table'], 
            '{"javascript": "function twoSum(nums, target) {\\n  // Write your code here\\n}"}',
            NULL
        )
        RETURNING id
      `);
      problemId = insert.rows[0].id;
    } else {
      problemId = res.rows[0].id;
      console.log("Found existing problem ID:", problemId);
    }

    // 2. Clear existing cases to avoid dupes
    await pool.query("DELETE FROM test_cases WHERE problem_id = $1", [
      problemId,
    ]);

    // 3. Insert Test Cases
    const testCases = [
      { input: "[2, 7, 11, 15], 9", expected: "[0,1]", hidden: false },
      { input: "[3, 2, 4], 6", expected: "[1,2]", hidden: false },
      { input: "[3, 3], 6", expected: "[0,1]", hidden: false },
      // Hidden cases
      { input: "[1, 2, 3, 4, 5], 9", expected: "[3,4]", hidden: true },
      { input: "[0, 4, 3, 0], 0", expected: "[0,3]", hidden: true },
    ];

    for (const tc of testCases) {
      await pool.query(
        `
        INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
        VALUES ($1, $2, $3, $4)
      `,
        [problemId, tc.input, tc.expected, tc.hidden]
      );
    }
    console.log(`Successfully seeded ${testCases.length} test cases.`);
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    process.exit(0);
  }
};

seed();
