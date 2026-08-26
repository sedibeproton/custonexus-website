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
        cn-card-shine group
        rounded-[1.75rem]
        border
        border-slate-200
        bg-white/90 backdrop-blur-sm
        shadow-[0_16px_50px_rgba(15,48,105,0.08)]
        transition-all
        duration-500
        hover:-translate-y-1.5
        hover:border-blue-200
        hover:shadow-[0_28px_70px_rgba(15,48,105,0.15)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}
