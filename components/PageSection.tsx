import { ReactNode } from "react";

interface PageSectionProps {
  children: ReactNode;
  background?: "white" | "gray" | "dark";
}

export default function PageSection({
  children,
  background = "white",
}: PageSectionProps) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-slate-50",
    dark: "bg-gradient-to-br from-slate-950 via-blue-900 to-blue-700 text-white",
  };

  return (
    <section className={`py-28 ${backgrounds[background]}`}>
      {children}
    </section>
  );
}