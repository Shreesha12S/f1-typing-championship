import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { GameSession } from '../types/game';

interface LeaderboardProps {
  sessions: GameSession[];
  currentUserId: string;
}

export default function Leaderboard({ sessions, currentUserId }: LeaderboardProps) {
  const topSessions = sessions.slice(0, 10);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-gray-500 font-bold">#{index + 1}</span>;
    }
  };

  const getRankBg = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 border-yellow-400';
      case 1:
        return 'bg-gradient-to-r from-gray-800/30 to-gray-700/30 border-gray-400';
      case 2:
        return 'bg-gradient-to-r from-orange-900/30 to-orange-800/30 border-orange-600';
      default:
        return 'bg-gray-900/50 border-gray-700';
    }
  };

  return (
    <div className="bg-black rounded-2xl shadow-xl p-6 border-4 border-red-600">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-red-600 to-yellow-500 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">LEADERBOARD</h2>
      </div>

      <div className="space-y-3">
        {topSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-red-600" />
            <p>No races yet. Be the first!</p>
          </div>
        ) : (
          topSessions.map((session, index) => (
            <div
              key={session.id}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-102 hover:shadow-lg ${getRankBg(
                index
              )} ${session.userId === currentUserId ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="flex-shrink-0 w-12 flex items-center justify-center">
                {getRankIcon(index)}
              </div>

              <div className="flex-grow min-w-0">
                <p className="font-semibold text-white truncate">{session.username}</p>
                <p className="text-sm text-gray-400">
                  {new Date(session.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-6 flex-shrink-0">
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-500">{session.wpm}</p>
                  <p className="text-xs text-gray-400">WPM</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-yellow-400">{session.accuracy}%</p>
                  <p className="text-xs text-gray-400">Accuracy</p>
                </div>
              </div>

              {session.userId === currentUserId && (
                <div className="flex-shrink-0 px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full border border-yellow-400">
                  YOU
                </div>
              )}

              {session.isPersonalBest && (
                <div className="flex-shrink-0 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full animate-pulse">
                  PB
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
