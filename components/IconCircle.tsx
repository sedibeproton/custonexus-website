import { ReactNode } from "react";

interface IconCircleProps {
  children: ReactNode;
}

export default function IconCircle({
  children,
}: IconCircleProps) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-700 group-hover:text-white">
      {children}
    </div>
  );
}