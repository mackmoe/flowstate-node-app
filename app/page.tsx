import Button from "@/components/Button";
import LiveBadge from "@/components/LiveBadge";

export default function Home() {
  const isLive = Boolean(process.env.NEXT_PUBLIC_YOUTUBE_LIVE_URL);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Placeholder with Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        <div className="absolute inset-0 bg-gradient-radial" />
        {/* Placeholder for future video background */}
        <div className="absolute inset-0 bg-[url('/placeholder-bg.jpg')] bg-cover bg-center opacity-20" />
        
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="relative z-20 px-6 pt-16 pb-20 text-center max-w-4xl mx-auto">
        {/* Hero Title */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight animate-fade-in">
          FlowState <span className="text-gradient-cyan">FM</span>
        </h1>

        {/* Live Badge */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <LiveBadge isLive={isLive} href="/listen" />
        </div>
        
        {/* Brand Paragraph */}
        <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed font-serif max-w-3xl mx-auto animate-slide-up">
          Your sophisticated sound sanctuary for deep work and creative flow.
        </p>
        
        <p className="text-base md:text-lg text-gray-400 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          One glance. One click. Start focusing.
        </p>
        
        {/* CTA Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button href="/listen" variant="primary" size="lg" className="w-full sm:w-auto">
            Listen Now
          </Button>
          
          <Button href="/kit" variant="outline" size="lg" className="w-full sm:w-auto">
            Get Free Kit
          </Button>
        </nav>
        
        {/* Secondary Links */}
        <div className="mt-12 flex flex-wrap gap-6 justify-center text-sm animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button href="/flow-state" variant="ghost" size="sm">
            What is Flow State?
          </Button>
        </div>
      </div>
    </main>
  );
}
