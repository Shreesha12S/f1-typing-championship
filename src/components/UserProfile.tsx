import { User, Trophy, Target, Zap, Gamepad as GamepadIcon, LogOut, Award } from 'lucide-react';
import { User as UserType } from '../types/game';
import { Achievement } from '../types/game';

interface UserProfileProps {
  user: UserType;
  achievements: Achievement[];
  onLogout: () => void;
}

export default function UserProfile({ user, achievements, onLogout }: UserProfileProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg ring-4 ring-white/30"
            style={{ backgroundColor: user.avatarColor }}
          >
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-blue-100 text-sm">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-300" />
            <span className="text-sm text-blue-100">Best WPM</span>
          </div>
          <p className="text-3xl font-bold">{user.bestWPM}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-300" />
            <span className="text-sm text-blue-100">Best Accuracy</span>
          </div>
          <p className="text-3xl font-bold">{user.bestAccuracy}%</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <GamepadIcon className="w-5 h-5 text-purple-300" />
            <span className="text-sm text-blue-100">Total Races</span>
          </div>
          <p className="text-3xl font-bold">{user.totalGames}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-orange-300" />
            <span className="text-sm text-blue-100">Achievements</span>
          </div>
          <p className="text-3xl font-bold">{unlockedCount}/{achievements.length}</p>
        </div>
      </div>

      {unlockedCount > 0 && (
        <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-semibold">Recent Achievements</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {achievements
              .filter(a => a.unlocked)
              .slice(0, 6)
              .map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex-shrink-0 bg-white/20 rounded-lg p-3 text-center min-w-[80px] hover:bg-white/30 transition-colors"
                  title={achievement.description}
                >
                  <div className="text-3xl mb-1">{achievement.icon}</div>
                  <p className="text-xs font-medium truncate">{achievement.title}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
