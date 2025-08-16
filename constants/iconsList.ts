import emojis from "unicode-emoji-json";

export const icons = Object.entries(emojis).map(([emoji, data], index) => ({
  id: index + 1,
  name: data.name,
  emoji: emoji,
}));
