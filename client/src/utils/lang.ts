export const isVowel = (char: string): boolean =>
  ['a', 'e', 'i', 'o', 'u'].includes(char);

export const plural = (singularString: string, count: number): string => {
  if (count === 1) return singularString;

  const lastChar = singularString.charAt(singularString.length - 1);
  if (isVowel(lastChar)) {
    return `${singularString}es`;
  }
  return `${singularString}s`;
};
