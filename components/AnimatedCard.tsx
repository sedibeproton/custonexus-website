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
        rounded-[2rem]
        border
        border-slate-200
        bg-white
        shadow-[0_12px_40px_rgba(15,48,105,0.07)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-[0_22px_55px_rgba(15,48,105,0.13)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}
