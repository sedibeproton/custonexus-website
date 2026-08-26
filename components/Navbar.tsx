"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, LockKeyhole, Menu, X } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";

const navItems = [
  { href: "/", label: "Home" }, { href: "/about", label: "About" },
  { href: "/services", label: "Services" }, { href: "/solutions", label: "Solutions" },
  { href: "/constitution", label: "Constitution" }, { href: "/faqs", label: "FAQs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <Container className={`rounded-[1.4rem] border transition-all duration-500 ${scrolled ? "border-white/70 bg-white/90 py-2 shadow-[0_14px_45px_rgba(8,31,73,0.14)] backdrop-blur-2xl" : "border-white/80 bg-white/75 py-3 shadow-[0_8px_30px_rgba(8,31,73,0.08)] backdrop-blur-xl"}`}>
        <div className="flex items-center justify-between gap-5">
          <div className={scrolled ? "origin-left scale-90 transition" : "transition"}><Logo /></div>
          <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${active ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50 hover:text-blue-800"}`}>{item.label}</Link>;
            })}
          </nav>
          <div className="hidden items-center gap-3 xl:flex">
            <Link href="/secure/login" aria-label="Open Secure Archive" className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:text-blue-700"><LockKeyhole size={18} /></Link>
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800">Let&apos;s talk <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
          </div>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-blue-300 xl:hidden">{open ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
        <div id="mobile-navigation" className={`grid transition-[grid-template-rows,opacity] duration-300 xl:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden"><nav aria-label="Mobile navigation" className="grid gap-1 border-t border-slate-100 pb-2 pt-4 sm:grid-cols-2">
            {navItems.map((item) => { const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href); return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`rounded-xl px-4 py-3 font-semibold ${active ? "bg-blue-50 text-blue-800" : "text-slate-700 hover:bg-slate-50"}`}>{item.label}</Link>; })}
            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-xl bg-blue-700 px-4 py-3 font-bold text-white">Contact us</Link>
            <Link href="/secure/login" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-3 font-semibold text-slate-600"><LockKeyhole size={17} /> Secure Archive</Link>
          </nav></div>
        </div>
      </Container>
    </header>
  );
}
