import { ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: "slow" | "medium" | "fast";
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = "medium",
  className = "",
}: ParallaxLayerProps) {
  const speedMap = {
    slow: "translate-y-[-5%]",
    medium: "translate-y-[-10%]",
    fast: "translate-y-[-15%]",
  };

  return (
    <div
      className={`
        parallax-layer
        transition-transform duration-[2s] ease-out
        ${speedMap[speed]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
