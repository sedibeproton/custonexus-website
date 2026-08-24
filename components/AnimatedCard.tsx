import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedCard({
  children,
  className = "",
}: AnimatedCardProps) {
  return (
    <div
      className={`
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-blue-200
        hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}