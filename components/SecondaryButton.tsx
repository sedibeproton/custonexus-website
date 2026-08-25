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
      className={`inline-flex items-center justify-center rounded-full border border-blue-700 px-8 py-4 font-semibold text-blue-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-xl active:scale-[0.98] ${className}`}
    >
      {children}
    </Link>
  );
}
