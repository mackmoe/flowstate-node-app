"use client";

import Button from "@/components/Button";

interface YouTubeLiveEmbedProps {
  /** 
   * Either a full embed URL (https://www.youtube.com/embed/VIDEO_ID) 
   * or just the video ID (VIDEO_ID)
   */
  videoIdOrUrl?: string;
  /** YouTube channel URL for fallback CTA */
  channelUrl?: string;
  /** Optional autoplay setting */
  autoplay?: boolean;
}

export default function YouTubeLiveEmbed({ 
  videoIdOrUrl, 
  channelUrl = "https://www.youtube.com/@flowstatefm",
  autoplay = false 
}: YouTubeLiveEmbedProps) {
  // Determine if we have a video ID or URL
  let embedUrl = "";
  let watchUrl = "";
  
  if (videoIdOrUrl) {
    // Check if it's already a full URL
    if (videoIdOrUrl.startsWith("http")) {
      embedUrl = videoIdOrUrl;
      // Extract video ID from embed URL for watch link
      const match = videoIdOrUrl.match(/embed\/([^?]+)/);
      const videoId = match ? match[1] : "";
      watchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : channelUrl;
    } else {
      // It's just a video ID
      embedUrl = `https://www.youtube.com/embed/${videoIdOrUrl}?autoplay=${autoplay ? 1 : 0}&mute=0`;
      watchUrl = `https://www.youtube.com/watch?v=${videoIdOrUrl}`;
    }
  }

  return (
    <div className="space-y-4">
      {/* Player Container */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-2xl">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="FlowState FM Live Stream"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-cyan/10 via-brand-pink/5 to-brand-yellow/10">
            <div className="text-center max-w-md px-6">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-cyan/20 to-brand-pink/20 border border-white/10 mb-6 shadow-lg">
                <svg 
                  className="w-10 h-10 text-brand-cyan" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
              
              {/* Message */}
              <h3 className="text-xl font-serif font-bold mb-3 text-white">
                Stream Active on YouTube
              </h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Our 24/7 live stream is broadcasting now. Click below to tune in and enter your flow state.
              </p>
              
              {/* CTA */}
              <Button 
                href={channelUrl}
                variant="primary"
                size="md"
                className="inline-flex items-center gap-2"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch Live on YouTube
              </Button>
              
              {/* Dev Note */}
              <p className="text-xs text-gray-500 mt-6 font-mono">
                Dev: Set NEXT_PUBLIC_YOUTUBE_LIVE_URL in .env.local
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Watch on YouTube Link (only show when embed is active) */}
      {embedUrl && (
        <div className="flex justify-center">
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-cyan transition-colors group"
          >
            <svg 
              className="w-4 h-4 group-hover:scale-110 transition-transform" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube
            <svg 
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
