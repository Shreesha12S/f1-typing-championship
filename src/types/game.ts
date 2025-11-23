export interface User {
  id: string;
  username: string;
  email: string;
  avatarColor: string;
  totalGames: number;
  totalWins: number;
  bestWPM: number;
  bestAccuracy: number;
  createdAt: string;
}

export interface GameSession {
  id: string;
  userId: string;
  username: string;
  wpm: number;
  accuracy: number;
  timeTaken: number;
  textLength: number;
  isPersonalBest: boolean;
  createdAt: string;
}

export interface Achievement {
  id: string;
  type: string;
  title: string;
  description: string;
  value: number;
  icon: string;
  unlocked: boolean;
}

export interface GameState {
  isPlaying: boolean;
  isFinished: boolean;
  currentText: string;
  typedText: string;
  startTime: number | null;
  endTime: number | null;
  errors: number;
  currentIndex: number;
}
