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
    sm: "py-16",
    md: "py-20",
    lg: "py-24",
  }[spacing];

  return (
    <section
      id={id}
      className={`${spacingClass} ${className}`}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
}