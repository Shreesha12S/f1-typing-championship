export const gameTexts = [
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Racing through the digital highway, fingers dance across the keyboard with lightning speed.",
  "In the world of typing, accuracy and speed combine to create the perfect rhythm.",
  "Challenge yourself to reach new heights as each keystroke brings you closer to victory.",
  "Speed demons unite as we race through words, sentences, and paragraphs with precision.",
  "Master the art of typing through dedication, practice, and unwavering determination.",
  "Every champion was once a beginner who refused to give up on their dreams.",
  "The keyboard becomes an extension of your thoughts when you type at maximum velocity.",
  "Breaking records requires focus, skill, and the burning desire to be the best.",
  "Your fingers are the engine, your mind is the driver, and victory is the destination.",
  "Precision and velocity merge into one seamless motion as you dominate the track.",
  "Champions are made through countless hours of practice and relentless pursuit of excellence.",
  "The sweet sound of victory echoes through the digital realm as you cross the finish line.",
  "From novice to expert, every journey begins with a single keystroke and endless determination.",
  "Speed typing is not just a skill, it is an art form mastered through dedication.",
  "Conquer the leaderboard by combining lightning-fast reflexes with pinpoint accuracy.",
  "Your path to greatness is paved with practice, perseverance, and passion for perfection.",
  "In this race, your only opponent is yourself and your previous best performance.",
  "Unlock your true potential by pushing beyond your limits with every single race.",
  "The thrill of competition drives us forward as we chase the ultimate high score."
];

export const getRandomText = (): string => {
  return gameTexts[Math.floor(Math.random() * gameTexts.length)];
};

export const calculateWPM = (characters: number, seconds: number): number => {
  if (seconds === 0) return 0;
  const words = characters / 5;
  const minutes = seconds / 60;
  return Math.round(words / minutes);
};

export const calculateAccuracy = (total: number, errors: number): number => {
  if (total === 0) return 100;
  return Math.round(((total - errors) / total) * 100);
};
