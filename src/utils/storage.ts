import { User, GameSession } from '../types/game';

const STORAGE_KEYS = {
  CURRENT_USER: 'typing_racer_current_user',
  USERS: 'typing_racer_users',
  SESSIONS: 'typing_racer_sessions',
  LEADERBOARD: 'typing_racer_leaderboard'
};

export const storageUtils = {
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  getAllUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  saveUser: (user: User): void => {
    const users = storageUtils.getAllUsers();
    const index = users.findIndex(u => u.id === user.id);

    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  findUserByEmail: (email: string): User | undefined => {
    const users = storageUtils.getAllUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  findUserByUsername: (username: string): User | undefined => {
    const users = storageUtils.getAllUsers();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase());
  },

  getAllSessions: (): GameSession[] => {
    const sessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return sessions ? JSON.parse(sessions) : [];
  },

  saveSession: (session: GameSession): void => {
    const sessions = storageUtils.getAllSessions();
    sessions.push(session);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  getUserSessions: (userId: string): GameSession[] => {
    const sessions = storageUtils.getAllSessions();
    return sessions.filter(s => s.userId === userId).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getTopSessions: (limit: number = 10): GameSession[] => {
    const sessions = storageUtils.getAllSessions();
    return sessions
      .sort((a, b) => b.wpm - a.wpm)
      .slice(0, limit);
  }
};
