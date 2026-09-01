"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Archive, LayoutDashboard, Landmark, LogOut, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const workspaceLinks = [
  { href: "/secure/dashboard", label: "Workspace", icon: LayoutDashboard },
  { href: "/secure/archive", label: "Archive", icon: Archive },
  { href: "/secure/finance", label: "Financial", icon: Landmark },
] as const;

const administrationLink = {
  href: "/secure/administration",
  label: "Administration",
  icon: ShieldCheck,
} as const;

export default function SecureNavigation({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  if (pathname === "/secure/login") return null;

  const links = isAdmin ? [...workspaceLinks, administrationLink] : workspaceLinks;

  async function signOut() {
    setSigningOut(true);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-5">
        <Link href="/secure/dashboard" className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 font-bold text-white">CN</span>
          <span>
            <span className="block text-sm font-bold text-slate-950">CustoNexus</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">Secure workspace</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Secure workspace navigation">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${active ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}>
                <Icon aria-hidden="true" size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => void signOut()} disabled={signingOut} className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-50 sm:flex">
            <LogOut aria-hidden="true" size={17} />
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="secure-mobile-nav" aria-label={open ? "Close workspace menu" : "Open workspace menu"} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 lg:hidden">
            {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="secure-mobile-nav" aria-label="Secure mobile navigation" className="mx-auto grid max-w-7xl gap-1 border-t border-slate-100 py-3 lg:hidden">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-4 py-3 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${active ? "bg-blue-50 text-blue-800" : "text-slate-700 hover:bg-blue-50 hover:text-blue-800"}`}>
                <Icon aria-hidden="true" size={18} />
                {label}
              </Link>
            );
          })}
          <button type="button" onClick={() => void signOut()} disabled={signingOut} className="flex items-center gap-3 rounded-xl px-4 py-3 text-left font-bold text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 disabled:opacity-50">
            <LogOut aria-hidden="true" size={18} />
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </nav>
      )}
    </header>
  );
}
