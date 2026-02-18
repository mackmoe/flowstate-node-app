'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ScrollReveal from '@/components/ScrollReveal';
import Timer from '@/components/Timer';

const sessions = [
  {
    duration: 25,
    title: "Sprint Session",
    description: "Perfect for focused bursts. Ideal for tackling single tasks with maximum intensity.",
    color: "cyan" as const,
  },
  {
    duration: 60,
    title: "Flow Session",
    description: "The sweet spot. Enough time to dive deep into complex work without fatigue.",
    color: "pink" as const,
  },
  {
    duration: 180,
    title: "Deep Dive",
    description: "Extended immersion. For when you need to completely lose yourself in creation.",
    color: "yellow" as const,
  },
];

export default function SessionCards() {
  const [activeSession, setActiveSession] = useState<{
    duration: number;
    title: string;
    color: "cyan" | "pink" | "yellow";
  } | null>(null);

  const handleStartSession = (session: typeof sessions[0]) => {
    setActiveSession(session);
  };

  const handleCloseTimer = () => {
    setActiveSession(null);
  };

  return (
    <>
      {/* Timer Modal */}
      {activeSession && (
        <Timer
          durationMinutes={activeSession.duration}
          sessionTitle={activeSession.title}
          color={activeSession.color}
          onClose={handleCloseTimer}
        />
      )}

      {/* Session Cards */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif font-bold mb-8 text-center">Choose Your Session</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <ScrollReveal key={session.duration} delay={index * 100}>
              <Card hover glow className="text-center h-full">
                <div className={`text-6xl font-bold mb-3 text-brand-${session.color}`}>
                  {session.duration}
                </div>
                <div className="text-sm text-gray-500 mb-3">MINUTES</div>
                <h3 className="text-xl font-serif font-bold mb-3">{session.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {session.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleStartSession(session)}
                >
                  Start Session
                </Button>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </>
  );
}
