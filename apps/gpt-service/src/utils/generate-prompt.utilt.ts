export const generatePrompt = (
  input: string,
  archetype: string,
): string =>
  `Изучив этот архетип "${archetype}", отвечай на следующее сообщение, будто ты соответствуешь этому архетипу: ${input}`;
