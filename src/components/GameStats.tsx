import { Clock, Target, Zap, TrendingUp } from 'lucide-react';

interface GameStatsProps {
  wpm: number;
  accuracy: number;
  time: number;
  isPlaying: boolean;
}

export default function GameStats({ wpm, accuracy, time, isPlaying }: GameStatsProps) {
  const stats = [
    {
      icon: Zap,
      label: 'WPM',
      value: wpm,
      color: 'from-red-600 to-red-800',
      bgColor: 'bg-black',
      textColor: 'text-red-500',
      borderColor: 'border-red-600'
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: `${accuracy}%`,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-black',
      textColor: 'text-yellow-400',
      borderColor: 'border-yellow-400'
    },
    {
      icon: Clock,
      label: 'Time',
      value: `${time}s`,
      color: 'from-white to-gray-300',
      bgColor: 'bg-black',
      textColor: 'text-white',
      borderColor: 'border-white'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${stat.borderColor}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-md`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            {isPlaying && (
              <TrendingUp className={`w-5 h-5 ${stat.textColor} animate-bounce`} />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-400">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
