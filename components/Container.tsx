import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1400px]",
};

export default function Container({
  children,
  className = "",
  size = "lg",
}: ContainerProps) {
  return (
    <div className={`container mx-auto px-6 ${sizeMap[size]} ${className}`}>
      {children}
    </div>
  );
}
