import { X, Trophy, Target, Zap, Gamepad as GamepadIcon, Award, Menu } from 'lucide-react';
import { User } from '../types/game';
import { Achievement } from '../types/game';

interface SidebarProps {
  user: User;
  achievements: Achievement[];
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ user, achievements, isOpen, onClose }: SidebarProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-red-600 via-black to-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Menu className="w-6 h-6" />
              Driver Stats
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg ring-4 ring-white/30 mx-auto mb-3"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-center">{user.username}</h3>
            <p className="text-red-200 text-sm text-center">{user.email}</p>
          </div>

          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border-l-4 border-yellow-400">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-300">Best WPM</span>
              </div>
              <p className="text-3xl font-bold">{user.bestWPM}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border-l-4 border-green-400">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">Best Accuracy</span>
              </div>
              <p className="text-3xl font-bold">{user.bestAccuracy}%</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border-l-4 border-red-400">
              <div className="flex items-center gap-3 mb-2">
                <GamepadIcon className="w-5 h-5 text-red-400" />
                <span className="text-sm text-gray-300">Total Races</span>
              </div>
              <p className="text-3xl font-bold">{user.totalGames}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border-l-4 border-orange-400">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-gray-300">Achievements</span>
              </div>
              <p className="text-3xl font-bold">{unlockedCount}/{achievements.length}</p>
            </div>
          </div>

          {unlockedCount > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">Achievements</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {achievements
                  .filter(a => a.unlocked)
                  .map((achievement) => (
                    <div
                      key={achievement.id}
                      className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition-colors"
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
      </div>
    </>
  );
}
