import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";
import Button from "@/components/Button";
import ScrollReveal from "@/components/ScrollReveal";
import YouTubeLiveEmbed from "@/components/YouTubeLiveEmbed";

export const metadata: Metadata = {
  title: "Listen — FlowState FM",
  description: "Start your focus session. Choose 25, 60, or 180 minutes of uninterrupted flow.",
  openGraph: {
    title: "Listen — FlowState FM",
    description: "Start your focus session. Choose 25, 60, or 180 minutes of uninterrupted flow.",
  },
};

const sessions = [
  {
    duration: "25",
    title: "Sprint Session",
    description: "Perfect for focused bursts. Ideal for tackling single tasks with maximum intensity.",
    color: "cyan",
  },
  {
    duration: "60",
    title: "Flow Session",
    description: "The sweet spot. Enough time to dive deep into complex work without fatigue.",
    color: "pink",
  },
  {
    duration: "180",
    title: "Deep Dive",
    description: "Extended immersion. For when you need to completely lose yourself in creation.",
    color: "yellow",
  },
];

export default function ListenPage() {
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_LIVE_URL;
  
  return (
    <main className="min-h-screen pt-24 pb-12">
      <Container size="xl">
        {/* Header */}
        <SectionHeader
          title="Live Now"
          subtitle="24/7 focus music to help you enter and maintain your flow state. Choose your session length below."
          accent="cyan"
        />
        
        {/* YouTube Live Embed */}
        <div className="mb-20">
          <YouTubeLiveEmbed 
            videoIdOrUrl={youtubeUrl}
            channelUrl="https://www.youtube.com/@flowstatefm"
          />
        </div>
        
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
                  <Button variant="outline" size="sm" className="w-full">
                    Start Session
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        {/* After Hours Section */}
        <div id="after-hours" className="scroll-mt-20">
          <Card className="text-center max-w-3xl mx-auto bg-gradient-subtle">
            <h2 className="text-4xl font-serif font-bold mb-4 text-gradient-warm">
              After Hours
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Late-night sessions for creators, night owls, and deep thinkers. 
              A different energy for when the world sleeps.
            </p>
            <Button variant="secondary" size="lg">
              Enter After Hours
            </Button>
          </Card>
        </div>
      </Container>
    </main>
  );
}
