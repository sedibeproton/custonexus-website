import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function SecondaryButton({ href, children, className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-white/70 px-8 py-4 font-semibold text-blue-800 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-white hover:shadow-lg active:scale-[0.98] ${className}`}
    >
      {children}
    </Link>
  );
}
