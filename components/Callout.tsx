import { ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
  variant?: "info" | "success" | "warning";
  className?: string;
}

const variantStyles = {
  info: "border-brand-cyan bg-brand-cyan/5",
  success: "border-green-400 bg-green-400/5",
  warning: "border-brand-yellow bg-brand-yellow/5",
};

export default function Callout({
  children,
  variant = "info",
  className = "",
}: CalloutProps) {
  return (
    <div
      className={`
        border-l-4 px-6 py-4 rounded-r-lg
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
