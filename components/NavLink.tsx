"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  disableActive?: boolean;
}

export default function NavLink({
  href,
  children,
  disableActive = false,
}: NavLinkProps) {
  const pathname = usePathname();

  const active = !disableActive && pathname === href;

  return (
    <Link
      href={href}
      className="group relative font-medium transition-all duration-300 hover:-translate-y-0.5"
    >
      <span
        className={
          active
            ? "font-semibold text-blue-700"
            : "text-slate-700 transition-colors duration-300 group-hover:text-blue-700"
        }
      >
        {children}
      </span>

      <span
        className={`absolute -bottom-2 left-0 h-0.5 bg-blue-700 transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}