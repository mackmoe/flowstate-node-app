import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";
import Button from "@/components/Button";
import YouTubeLiveEmbed from "@/components/YouTubeLiveEmbed";
import SessionCards from "@/components/SessionCards";

export const metadata: Metadata = {
  title: "Listen — FlowState FM",
  description: "Start your focus session. Choose 25, 60, or 180 minutes of uninterrupted flow.",
  openGraph: {
    title: "Listen — FlowState FM",
    description: "Start your focus session. Choose 25, 60, or 180 minutes of uninterrupted flow.",
  },
};

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
            channelUrl="https://www.youtube.com/@FlowStateFM1"
          />
        </div>
        
        {/* Session Cards */}
        <SessionCards />
        
        {/* Flow State Section */}
        <div id="flow-state" className="scroll-mt-20">
          <Card className="text-center max-w-3xl mx-auto bg-gradient-subtle">
            <h2 className="text-4xl font-serif font-bold mb-4 text-gradient-warm">
              Flow State
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Discover the science and art of achieving peak performance. 
              Learn how to consistently enter your flow state.
            </p>
            <Button variant="secondary" size="lg" href="/flow-state">
              Explore Flow State
            </Button>
          </Card>
        </div>
      </Container>
    </main>
  );
}
