import type { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: "sm" | "md" | "lg";
}

export default function Section({
  children,
  className = "",
  id,
  spacing = "lg",
}: SectionProps) {

  const spacingClass = {
    sm: "py-12 sm:py-16",
    md: "py-14 sm:py-20",
    lg: "py-16 sm:py-24 lg:py-28",
  }[spacing];

  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden ${spacingClass} ${className}`}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
}
