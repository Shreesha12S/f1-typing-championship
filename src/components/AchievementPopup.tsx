import { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';
import { Achievement } from '../types/game';

interface AchievementPopupProps {
  achievements: Achievement[];
  onClose: () => void;
}

export default function AchievementPopup({ achievements, onClose }: AchievementPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (achievements.length === 0) return;

    const timer = setTimeout(() => {
      if (currentIndex < achievements.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsExiting(true);
        setTimeout(onClose, 500);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, achievements.length, onClose]);

  if (achievements.length === 0) return null;

  const achievement = achievements[currentIndex];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`pointer-events-auto transform transition-all duration-500 ${
          isExiting ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-1 shadow-2xl animate-pulse-slow">
          <div className="bg-white rounded-3xl p-8 relative">
            <button
              onClick={() => {
                setIsExiting(true);
                setTimeout(onClose, 500);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl animate-pulse"></div>
                <div className="relative text-6xl animate-bounce">{achievement.icon}</div>
              </div>

              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <h3 className="text-2xl font-bold text-gray-900">Achievement Unlocked!</h3>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-gray-800">{achievement.title}</h4>
                <p className="text-gray-600">{achievement.description}</p>
              </div>

              {achievements.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {achievements.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentIndex ? 'bg-yellow-600 w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][
                  Math.floor(Math.random() * 5)
                ]
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
