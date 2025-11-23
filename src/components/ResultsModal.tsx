import { Trophy, Target, Zap, Clock, Award, TrendingUp, X } from 'lucide-react';
import { Achievement } from '../types/game';

interface ResultsModalProps {
  wpm: number;
  accuracy: number;
  time: number;
  isPersonalBest: boolean;
  achievements: Achievement[];
  onPlayAgain: () => void;
  onClose: () => void;
}

export default function ResultsModal({
  wpm,
  accuracy,
  time,
  isPersonalBest,
  achievements,
  onPlayAgain,
  onClose
}: ResultsModalProps) {
  const isExceptional = wpm >= 100 || accuracy >= 98;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform animate-scaleIn">
        <div className={`p-8 ${isExceptional ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500' : 'bg-gradient-to-br from-blue-500 to-purple-600'} text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center">
            <div className="mb-4">
              {isExceptional ? (
                <div className="text-8xl animate-bounce">🏆</div>
              ) : (
                <div className="text-8xl animate-bounce">🏁</div>
              )}
            </div>
            <h2 className="text-4xl font-bold mb-2">Race Complete!</h2>
            {isPersonalBest && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full animate-pulse">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">New Personal Best!</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-600">Speed</span>
              </div>
              <p className="text-4xl font-bold text-yellow-700">{wpm}</p>
              <p className="text-sm text-gray-600">Words Per Minute</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-600">Accuracy</span>
              </div>
              <p className="text-4xl font-bold text-green-700">{accuracy}%</p>
              <p className="text-sm text-gray-600">Perfect Typing</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-600">Time</span>
              </div>
              <p className="text-4xl font-bold text-blue-700">{time}s</p>
              <p className="text-sm text-gray-600">Race Duration</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-600">Performance</span>
              </div>
              <p className="text-2xl font-bold text-purple-700">
                {wpm >= 100 ? 'Exceptional' : wpm >= 75 ? 'Excellent' : wpm >= 50 ? 'Great' : 'Good'}
              </p>
              <p className="text-sm text-gray-600">Overall Rating</p>
            </div>
          </div>

          {achievements.length > 0 && (
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-bold text-gray-900">New Achievements!</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm"
                  >
                    <span className="text-3xl">{achievement.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onPlayAgain}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Race Again
            </button>
            <button
              onClick={onClose}
              className="px-8 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
            >
              View Stats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
