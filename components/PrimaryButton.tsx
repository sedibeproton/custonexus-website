import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function PrimaryButton({
  href,
  children,
  className = "",
  size = "md",
  fullWidth = false,
}: Props) {
  const sizeClass = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  }[size];

  return (
    <Link
      href={href}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2 rounded-2xl
        bg-gradient-to-r from-blue-700 to-blue-600
        font-semibold
        text-white
        shadow-lg
        shadow-blue-900/20
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_16px_36px_rgba(29,78,216,0.28)]
        active:scale-[0.98]
        focus:outline-none
        focus:ring-4
        focus:ring-blue-200
        ${sizeClass}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
