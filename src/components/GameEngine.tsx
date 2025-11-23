import { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { User, GameSession, Achievement } from '../types/game';
import { getRandomText, calculateWPM, calculateAccuracy } from '../utils/gameTexts';
import { storageUtils } from '../utils/storage';
import { checkAchievements } from '../utils/achievements';
import RaceTrack from './RaceTrack';
import TypingArea from './TypingArea';
import GameStats from './GameStats';
import ResultsModal from './ResultsModal';
import AchievementPopup from './AchievementPopup';

interface GameEngineProps {
  user: User;
  onGameComplete: (session: GameSession, achievements: Achievement[]) => void;
}

export default function GameEngine({ user, onGameComplete }: GameEngineProps) {
  const [targetText, setTargetText] = useState(getRandomText());
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [pausedTime, setPausedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [showAchievementPopup, setShowAchievementPopup] = useState(false);

  const [gameStats, setGameStats] = useState({
    wpm: 0,
    accuracy: 100,
    time: 0
  });

  useEffect(() => {
    if (isPlaying && !isPaused && !isFinished && startTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime - pausedTime) / 1000);
        setCurrentTime(elapsed);

        const wpm = calculateWPM(currentIndex, elapsed);
        const accuracy = calculateAccuracy(currentIndex, errors);

        setGameStats({ wpm, accuracy, time: elapsed });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, isPaused, isFinished, startTime, pausedTime, currentIndex, errors]);

  const handleStart = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setStartTime(Date.now());
  };

  const handlePause = () => {
    if (isPaused) {
      setPausedTime(pausedTime + (Date.now() - (startTime || 0)));
      setStartTime(Date.now());
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  };

  const handleType = (text: string) => {
    if (!isPlaying || isPaused || isFinished) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    setTypedText(text);

    const newIndex = text.length;
    setCurrentIndex(newIndex);

    let errorCount = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== targetText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    if (text.length >= targetText.length) {
      finishRace(text, errorCount);
    }
  };

  const finishRace = useCallback((finalText: string, finalErrors: number) => {
    if (!startTime) return;

    setIsFinished(true);
    setIsPlaying(false);
    setIsPaused(false);

    const endTime = Date.now();
    const timeTaken = (endTime - startTime - pausedTime) / 1000;
    const finalWPM = calculateWPM(targetText.length, timeTaken);
    const finalAccuracy = calculateAccuracy(targetText.length, finalErrors);

    const isPersonalBest = finalWPM > user.bestWPM;

    const session: GameSession = {
      id: crypto.randomUUID(),
      userId: user.id,
      username: user.username,
      wpm: finalWPM,
      accuracy: finalAccuracy,
      timeTaken,
      textLength: targetText.length,
      isPersonalBest,
      createdAt: new Date().toISOString()
    };

    storageUtils.saveSession(session);

    const updatedUser = { ...user };
    updatedUser.totalGames += 1;
    if (finalWPM > updatedUser.bestWPM) {
      updatedUser.bestWPM = finalWPM;
    }
    if (finalAccuracy > updatedUser.bestAccuracy) {
      updatedUser.bestAccuracy = finalAccuracy;
    }
    storageUtils.saveUser(updatedUser);
    storageUtils.setCurrentUser(updatedUser);

    const achievements = checkAchievements(finalWPM, finalAccuracy, updatedUser.totalGames);

    setNewAchievements(achievements);
    setGameStats({ wpm: finalWPM, accuracy: finalAccuracy, time: Math.floor(timeTaken) });
    setShowResults(true);

    if (achievements.length > 0) {
      setTimeout(() => setShowAchievementPopup(true), 1000);
    }

    onGameComplete(session, achievements);
  }, [startTime, pausedTime, targetText, user, onGameComplete]);

  const handleReset = () => {
    setTargetText(getRandomText());
    setTypedText('');
    setCurrentIndex(0);
    setIsPlaying(false);
    setIsPaused(false);
    setIsFinished(false);
    setStartTime(null);
    setPausedTime(0);
    setCurrentTime(0);
    setErrors(0);
    setShowResults(false);
    setNewAchievements([]);
    setShowAchievementPopup(false);
    setGameStats({ wpm: 0, accuracy: 100, time: 0 });
  };

  const progress = (currentIndex / targetText.length) * 100;

  return (
    <div className="space-y-6">
      {!isPlaying && !isFinished && (
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-16 py-6 rounded-2xl font-bold text-2xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-2xl flex items-center justify-center gap-3 border-4 border-yellow-400"
          >
            <Play className="w-8 h-8" />
            START RACE
          </button>
        </div>
      )}

      {(isPlaying || isFinished) && (
        <>
          <RaceTrack
            progress={progress}
            carColor={user.avatarColor}
            showConfetti={isFinished && gameStats.wpm >= 100}
          />

          <TypingArea
            targetText={targetText}
            typedText={typedText}
            currentIndex={currentIndex}
            onType={handleType}
            isPlaying={isPlaying && !isPaused}
            isFinished={isFinished}
          />

          <GameStats
            wpm={gameStats.wpm}
            accuracy={gameStats.accuracy}
            time={currentTime}
            isPlaying={isPlaying && !isPaused}
          />

          <div className="flex gap-4">
            {isPlaying && !isFinished && (
              <button
                onClick={handlePause}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 border-2 border-yellow-300"
              >
                <Pause className="w-5 h-5" />
                {isPaused ? 'RESUME' : 'PAUSE'}
              </button>
            )}

            <button
              onClick={handleReset}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 border-2 border-white"
            >
              <RotateCcw className="w-5 h-5" />
              NEW RACE
            </button>
          </div>
        </>
      )}

      {showResults && (
        <ResultsModal
          wpm={gameStats.wpm}
          accuracy={gameStats.accuracy}
          time={gameStats.time}
          isPersonalBest={gameStats.wpm > (user.bestWPM || 0)}
          achievements={newAchievements}
          onPlayAgain={handleReset}
          onClose={() => setShowResults(false)}
        />
      )}

      {showAchievementPopup && newAchievements.length > 0 && (
        <AchievementPopup
          achievements={newAchievements}
          onClose={() => setShowAchievementPopup(false)}
        />
      )}
    </div>
  );
}
