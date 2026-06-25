import { getAdjustedScore } from "./score";

describe("getAdjustedScore", () => {
  test("caps the score at 2 for short passwords", () => {
    expect(getAdjustedScore("aB3$xY", 4)).toBe(2);
  });

  test("caps the score at 2 with fewer than 3 character classes", () => {
    expect(getAdjustedScore("abcdefghijklmnop", 4)).toBe(2);
  });

  test("keeps a high score for long, diverse passwords", () => {
    expect(getAdjustedScore("Abcdef123!@#xyz", 4)).toBe(4);
  });

  test("never inflates a low score", () => {
    expect(getAdjustedScore("Abcdef123!@#xyz", 1)).toBe(1);
  });
});
