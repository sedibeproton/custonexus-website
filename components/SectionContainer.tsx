import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function SectionContainer({
  children,
  className = "",
}: Props) {
  return (
    <div className={`mx-auto max-w-7xl px-8 ${className}`}>
      {children}
    </div>
  );
}