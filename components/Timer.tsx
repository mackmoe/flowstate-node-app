'use client';

import { useEffect, useState, useCallback } from 'react';
import Confetti from 'react-confetti';
import { formatDuration, intervalToDuration } from 'date-fns';

interface TimerProps {
  durationMinutes: number;
  sessionTitle: string;
  color: 'cyan' | 'pink' | 'yellow';
  onClose: () => void;
}

export default function Timer({ durationMinutes, sessionTitle, color, onClose }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(durationMinutes * 60); // in seconds
  const [isRunning, setIsRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalSeconds = durationMinutes * 60;
  const progress = ((totalSeconds - timeRemaining) / totalSeconds) * 100;

  // Countdown logic
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsCompleted(true);
          setShowConfetti(true);
          // Play completion sound
          try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi2J0/DTfy0FKHzN8dyMPAkSZbnq7I8+CQ9asdSVSwcRUKjg8blmHQU7k9fzzHksBSl7zfDdkEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSiAzvHbj0AKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBSh8zfHckEAKFF2z6eymVBQKRp/g8r5sIQYtidPw04AuBQ==');
            audio.volume = 0.3;
            audio.play();
          } catch (e) {
            console.log('Audio playback not available');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  // Format time display
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimeRemaining(durationMinutes * 60);
    setIsRunning(true);
    setIsCompleted(false);
    setShowConfetti(false);
  };

  const handleClose = () => {
    if (isRunning && !isCompleted) {
      const confirmed = confirm('Timer is still running. Are you sure you want to close?');
      if (!confirmed) return;
    }
    onClose();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === ' ' && !isCompleted) {
        e.preventDefault();
        setIsRunning(!isRunning);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, isCompleted]);

  const colorClasses = {
    cyan: 'text-brand-cyan',
    pink: 'text-brand-pink',
    yellow: 'text-brand-yellow',
  };

  const glowClasses = {
    cyan: 'shadow-glow',
    pink: 'shadow-glow-pink',
    yellow: 'shadow-[0_0_40px_rgba(255,195,10,0.3)]',
  };

  return (
    <>
      {/* Confetti effect on completion */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-2xl mx-4">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110 focus-ring"
            aria-label="Close timer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Timer Card */}
          <div className={`glass rounded-3xl p-12 text-center ${glowClasses[color]}`}>
            {/* Session Title */}
            <h2 className="text-2xl font-serif font-bold mb-8 text-gray-300">
              {sessionTitle}
            </h2>

            {/* Circular Progress Indicator */}
            <div className="relative w-80 h-80 mx-auto mb-8">
              {/* SVG Circle Progress */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className={`${colorClasses[color]} transition-all duration-1000`}
                  style={{
                    strokeDasharray: `${2 * Math.PI * 45}`,
                    strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`,
                  }}
                />
              </svg>

              {/* Timer Display (centered in circle) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-7xl font-bold ${colorClasses[color]} font-mono tracking-tight mb-2 transition-all ${isRunning && !isCompleted ? 'animate-pulse' : ''}`}>
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">
                  {isCompleted ? 'Completed!' : isRunning ? 'In Progress' : 'Paused'}
                </div>
                {!isCompleted && (
                  <div className="text-xs text-gray-600 mt-2">
                    {Math.round(progress)}% complete
                  </div>
                )}
              </div>
            </div>

            {/* Completion Message */}
            {isCompleted && (
              <div className="mb-8 animate-scale-in">
                <p className={`text-3xl font-serif font-bold mb-2 ${colorClasses[color]}`}>
                  🎉 Session Complete!
                </p>
                <p className="text-gray-400">
                  Great work! You&apos;ve completed your {durationMinutes}-minute flow session.
                </p>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-4 justify-center">
              {!isCompleted && (
                <>
                  <button
                    onClick={handlePlayPause}
                    className="px-8 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-105 focus-ring flex items-center gap-2"
                  >
                    {isRunning ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                        Pause
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Resume
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-105 focus-ring"
                  >
                    Reset
                  </button>
                </>
              )}
              {isCompleted && (
                <button
                  onClick={handleReset}
                  className={`px-8 py-3 rounded-lg bg-brand-${color} text-black font-medium hover:scale-105 transition-all focus-ring`}
                >
                  Start Another Session
                </button>
              )}
            </div>

            {/* Keyboard Shortcuts Hint */}
            {!isCompleted && (
              <div className="mt-6 text-xs text-gray-600 flex items-center justify-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">Space</kbd> 
                  Pause/Resume
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">Esc</kbd> 
                  Close
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
