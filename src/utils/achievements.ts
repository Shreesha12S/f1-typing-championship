import { Achievement } from '../types/game';

export const achievementTemplates: Achievement[] = [
  {
    id: 'speed_50',
    type: 'speed',
    title: 'Speed Apprentice',
    description: 'Reach 50 WPM',
    value: 50,
    icon: '🚗',
    unlocked: false
  },
  {
    id: 'speed_75',
    type: 'speed',
    title: 'Speed Racer',
    description: 'Reach 75 WPM',
    value: 75,
    icon: '🏎️',
    unlocked: false
  },
  {
    id: 'speed_100',
    type: 'speed',
    title: 'Speed Demon',
    description: 'Reach 100 WPM',
    value: 100,
    icon: '🚀',
    unlocked: false
  },
  {
    id: 'speed_125',
    type: 'speed',
    title: 'Velocity Master',
    description: 'Reach 125 WPM',
    value: 125,
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'speed_150',
    type: 'speed',
    title: 'Lightning Typer',
    description: 'Reach 150 WPM',
    value: 150,
    icon: '💫',
    unlocked: false
  },
  {
    id: 'accuracy_95',
    type: 'accuracy',
    title: 'Precision Driver',
    description: 'Achieve 95% accuracy',
    value: 95,
    icon: '🎯',
    unlocked: false
  },
  {
    id: 'accuracy_98',
    type: 'accuracy',
    title: 'Perfect Control',
    description: 'Achieve 98% accuracy',
    value: 98,
    icon: '💎',
    unlocked: false
  },
  {
    id: 'accuracy_100',
    type: 'accuracy',
    title: 'Flawless Victory',
    description: 'Achieve 100% accuracy',
    value: 100,
    icon: '👑',
    unlocked: false
  },
  {
    id: 'games_10',
    type: 'games',
    title: 'Getting Started',
    description: 'Complete 10 races',
    value: 10,
    icon: '🎮',
    unlocked: false
  },
  {
    id: 'games_50',
    type: 'games',
    title: 'Dedicated Racer',
    description: 'Complete 50 races',
    value: 50,
    icon: '🏁',
    unlocked: false
  },
  {
    id: 'games_100',
    type: 'games',
    title: 'Century Club',
    description: 'Complete 100 races',
    value: 100,
    icon: '💯',
    unlocked: false
  }
];

export const checkAchievements = (
  wpm: number,
  accuracy: number,
  totalGames: number
): Achievement[] => {
  const unlockedAchievements: Achievement[] = [];

  achievementTemplates.forEach(achievement => {
    let unlocked = false;

    if (achievement.type === 'speed' && wpm >= achievement.value) {
      unlocked = true;
    } else if (achievement.type === 'accuracy' && accuracy >= achievement.value) {
      unlocked = true;
    } else if (achievement.type === 'games' && totalGames >= achievement.value) {
      unlocked = true;
    }

    if (unlocked) {
      unlockedAchievements.push({ ...achievement, unlocked: true });
    }
  });

  return unlockedAchievements;
};
