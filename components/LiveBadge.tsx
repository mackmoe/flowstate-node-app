'use client';

import Link from 'next/link';

interface LiveBadgeProps {
  isLive?: boolean;
  href?: string;
}

export default function LiveBadge({ isLive = true, href = '/listen' }: LiveBadgeProps) {
  const mainText = isLive ? 'LIVE 24/7' : 'Sessions';
  const helperText = isLive ? 'Streaming now' : 'Tap to listen';
  const ariaLabel = isLive ? 'Jump to live stream' : 'Browse sessions';

  return (
    <Link href={href}>
      <div
        className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full
          bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20
          transition-all duration-300 ease-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black
          hover:bg-white/10 hover:shadow-glow
          group cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
      >
        {/* Pulsing Dot Indicator */}
        <div className="relative flex items-center justify-center">
          <div
            className={`w-2 h-2 rounded-full ${
              isLive ? 'bg-brand-cyan' : 'bg-brand-rose'
            } ${
              isLive ? 'animate-pulse' : ''
            } motion-reduce:animate-none`}
          />
          {isLive && (
            <div
              className="absolute inset-0 w-2 h-2 rounded-full bg-brand-cyan opacity-75
                animate-pulse motion-reduce:animate-none"
              style={{ animationDelay: '0.3s' }}
            />
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-start leading-tight">
          <span className="text-xs font-semibold tracking-wider text-white">
            {mainText}
          </span>
          <span className="text-xs text-gray-400 font-light">
            {helperText}
          </span>
        </div>

        {/* Arrow Icon */}
        <svg
          className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-cyan
            transition-colors duration-300 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </Link>
  );
}
