import { Car } from 'lucide-react';

interface RaceTrackProps {
  progress: number;
  carColor: string;
  showConfetti?: boolean;
}

export default function RaceTrack({ progress, carColor, showConfetti }: RaceTrackProps) {
  return (
    <div className="relative w-full bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-8 shadow-2xl overflow-hidden border-4 border-red-600">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>

      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>

      <div className="relative space-y-4">
        {[0, 1, 2].map((lane) => (
          <div key={lane} className="relative h-16 bg-black/50 rounded-lg border-2 border-dashed border-red-900/50 overflow-hidden">
            <div className="absolute inset-0 flex items-center">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-8 h-1 bg-red-500 mx-2 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>

            {lane === 1 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                style={{ left: `${Math.min(progress, 95)}%` }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-red-500/50 to-transparent blur-xl"></div>
                  <Car
                    className="w-12 h-12 relative z-10 drop-shadow-2xl transform -rotate-90"
                    style={{ color: carColor }}
                  />
                  {showConfetti && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 rounded-full animate-ping"
                          style={{
                            backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'][i % 4],
                            animationDelay: `${i * 0.1}s`,
                            transform: `rotate(${i * 45}deg) translateX(${20 + i * 5}px)`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {progress >= 100 && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <div className="text-6xl animate-bounce">🏁</div>
        </div>
      )}
    </div>
  );
}
