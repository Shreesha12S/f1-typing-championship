import { useState, useEffect } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { User, GameSession, Achievement } from './types/game';
import { storageUtils } from './utils/storage';
import { achievementTemplates } from './utils/achievements';
import AuthForm from './components/AuthForm';
import Sidebar from './components/Sidebar';
import GameEngine from './components/GameEngine';
import Leaderboard from './components/Leaderboard';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [leaderboard, setLeaderboard] = useState<GameSession[]>([]);
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const user = storageUtils.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      loadUserData(user);
    }
  }, []);

  useEffect(() => {
    setLeaderboard(storageUtils.getTopSessions(10));
  }, [currentUser]);

  const loadUserData = (user: User) => {
    const sessions = storageUtils.getUserSessions(user.id);
    const allAchievements = achievementTemplates.map(template => {
      let unlocked = false;

      if (template.type === 'speed' && user.bestWPM >= template.value) {
        unlocked = true;
      } else if (template.type === 'accuracy' && user.bestAccuracy >= template.value) {
        unlocked = true;
      } else if (template.type === 'games' && user.totalGames >= template.value) {
        unlocked = true;
      }

      return { ...template, unlocked };
    });

    setUserAchievements(allAchievements);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    loadUserData(user);
  };

  const handleLogout = () => {
    storageUtils.setCurrentUser(null);
    setCurrentUser(null);
    setUserAchievements([]);
  };

  const handleGameComplete = (session: GameSession, achievements: Achievement[]) => {
    setLeaderboard(storageUtils.getTopSessions(10));
    const updatedUser = storageUtils.getCurrentUser();
    if (updatedUser) {
      setCurrentUser(updatedUser);
      loadUserData(updatedUser);
    }
  };

  if (!currentUser) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <header className="relative bg-gradient-to-r from-red-600 via-black to-red-600 border-b-4 border-yellow-400 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-yellow-400"
              style={{ backgroundColor: currentUser.avatarColor }}
            >
              {currentUser.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wider">TYPING CHAMPIONSHIP</h1>
              <p className="text-yellow-400 text-sm font-semibold">Welcome, {currentUser.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-2 border border-white/30"
            >
              <Menu className="w-5 h-5" />
              <span className="hidden md:inline">Stats</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-all flex items-center gap-2 border border-yellow-400"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <Sidebar
        user={currentUser}
        achievements={userAchievements}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="relative max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GameEngine user={currentUser} onGameComplete={handleGameComplete} />
          </div>

          <div className="lg:col-span-1">
            <Leaderboard sessions={leaderboard} currentUserId={currentUser.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
