import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

const variantStyles = {
  primary:
    "bg-brand-cyan text-black hover:bg-brand-cyan/90 font-medium shadow-lg hover:shadow-glow",
  secondary:
    "bg-brand-pink text-white hover:bg-brand-pink/90 font-medium shadow-lg hover:shadow-glow-pink",
  outline:
    "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20",
  ghost: "hover:bg-white/5",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg transition-all duration-300 focus-ring disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95";
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
