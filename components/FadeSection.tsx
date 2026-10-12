import { ReactNode } from "react";

interface FadeSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeSection({
  children,
  delay = 0,
  className = "",
}: FadeSectionProps) {
  return (
    <div className={`cn-section-reveal ${className}`} style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}>
      {children}
    </div>
  );
}
