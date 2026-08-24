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
        rounded-xl
        bg-blue-700
        font-semibold
        text-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-blue-800
        hover:shadow-2xl
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