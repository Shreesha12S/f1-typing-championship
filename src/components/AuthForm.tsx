import { useState } from 'react';
import { User, LogIn, UserPlus, Palette } from 'lucide-react';
import { User as UserType } from '../types/game';
import { storageUtils } from '../utils/storage';

interface AuthFormProps {
  onLogin: (user: UserType) => void;
}

const AVATAR_COLORS = [
  '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899',
  '#06B6D4', '#14B8A6', '#F97316', '#84CC16'
];

export default function AuthForm({ onLogin }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [selectedColor, setSelectedColor] = useState(AVATAR_COLORS[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isSignUp && !username)) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignUp) {
      const existingEmail = storageUtils.findUserByEmail(email);
      if (existingEmail) {
        setError('Email already registered');
        return;
      }

      const existingUsername = storageUtils.findUserByUsername(username);
      if (existingUsername) {
        setError('Username already taken');
        return;
      }

      const newUser: UserType = {
        id: crypto.randomUUID(),
        username,
        email,
        avatarColor: selectedColor,
        totalGames: 0,
        totalWins: 0,
        bestWPM: 0,
        bestAccuracy: 0,
        createdAt: new Date().toISOString()
      };

      storageUtils.saveUser(newUser);
      storageUtils.setCurrentUser(newUser);
      onLogin(newUser);
    } else {
      const user = storageUtils.findUserByEmail(email);
      if (!user) {
        setError('Invalid email or password');
        return;
      }

      storageUtils.setCurrentUser(user);
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
          <div className="bg-gradient-to-r from-red-600 to-black p-8 text-white border-b-4 border-yellow-400">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-lg rounded-full p-4">
                <User className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center mb-2 tracking-wider">TYPING CHAMPIONSHIP</h1>
            <p className="text-center text-yellow-400 font-semibold text-lg">F1 VERSION</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-shake">
                {error}
              </div>
            )}

            {isSignUp && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
                    placeholder="Choose a username"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <LogIn className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Car Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {AVATAR_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        selectedColor === color
                          ? 'ring-4 ring-yellow-400 scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-black text-white py-3 rounded-lg font-bold text-lg hover:from-red-700 hover:to-gray-900 transform hover:scale-105 transition-all duration-200 shadow-lg border-2 border-yellow-400"
            >
              {isSignUp ? 'Start Racing' : 'Login'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
