import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: "cyan" | "pink" | "yellow";
  children?: ReactNode;
  centered?: boolean;
}

const accentColors = {
  cyan: "text-brand-cyan",
  pink: "text-brand-pink",
  yellow: "text-brand-yellow",
};

export default function SectionHeader({
  title,
  subtitle,
  accent = "cyan",
  children,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 ${accentColors[accent]}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
