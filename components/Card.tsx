import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  glow = false,
}: CardProps) {
  return (
    <div
      className={`
        glass rounded-2xl p-6 
        ${hover ? "hover:bg-white/5 transition-smooth hover:scale-[1.02]" : ""}
        ${glow ? "hover:shadow-glow" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
