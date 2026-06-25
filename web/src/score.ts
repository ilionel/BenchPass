/**
 * Cap the raw zxcvbn score (0-4) for passwords that are too short or lack character
 * diversity, so the displayed strength can't be inflated by length/entropy alone.
 */
export const getAdjustedScore = (password: string, score: number): number => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);

  const characterSets = [hasUpperCase, hasLowerCase, hasDigits, hasSymbols];
  const uniqueCharacterSets = characterSets.filter(Boolean).length;

  if (uniqueCharacterSets < 3 || password.length < 12) {
    return Math.min(score, 2);
  }

  return score;
};
