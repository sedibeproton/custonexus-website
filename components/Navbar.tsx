"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, LockKeyhole, Menu, X } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";

type NavItem = {
  href: string;
  label: string;
  children?: Array<{ href: string; label: string; description?: string }>;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services", label: "All Services", description: "Explore our complete service portfolio" },
      { href: "/services/business-websites", label: "Custom Websites", description: "Purpose-built websites, responsive frontend and custom functionality" },
      { href: "/services/website-support", label: "Website Support", description: "Redesigns, maintenance, fixes and technical support" },
      { href: "/services/business-systems", label: "Business Systems", description: "Dashboards, portals, forms, applications and automation" },
      { href: "/services/healthcare-technology", label: "Healthcare Technology", description: "Healthcare websites, software and connected systems" },
      { href: "/services/professional-services", label: "Professional Services", description: "Consulting, project and flexible technical support" },
      { href: "/services/strategic-partnerships", label: "Strategic Partnerships", description: "Technology, supplier and delivery collaboration" },
      { href: "/services/medical-equipment-consumables", label: "Medical Equipment", description: "Specialist enquiries, servicing and consumables" },
    ],
  },
  { href: "/solutions", label: "Solutions" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "About CustoNexus", description: "Our company, purpose and approach" },
      { href: "/constitution", label: "Our Constitution", description: "The principles behind how we build and serve" },
    ],
  },
  { href: "/contact", label: "Contact" },
  {
    href: "/faqs",
    label: "FAQs",
    children: [
      { href: "/faqs", label: "All Questions" },
      { href: "/faqs#technology", label: "Technology & Websites" },
      { href: "/faqs#equipment", label: "Equipment & Consumables" },
      { href: "/faqs#professional-services", label: "Professional Services" },
      { href: "/faqs#partnerships", label: "Partnerships" },
    ],
  },
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

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <Container className={`rounded-[1.4rem] border transition-all duration-500 ${scrolled ? "border-white/70 bg-white/90 py-2 shadow-[0_14px_45px_rgba(8,31,73,0.14)] backdrop-blur-2xl" : "border-white/80 bg-white/75 py-3 shadow-[0_8px_30px_rgba(8,31,73,0.08)] backdrop-blur-xl"}`}>
        <div className="flex items-center justify-between gap-2 sm:gap-5">
          <div className={`min-w-0 ${scrolled ? "origin-left scale-90 transition" : "transition"}`}><Logo /></div>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => item.children ? (
              <div key={item.href} className="group relative">
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${isActive(item.href) ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50 hover:text-blue-800"}`}>
                  {item.label}<ChevronDown aria-hidden size={15} className="transition group-hover:rotate-180 group-focus-within:rotate-180" />
                </Link>
                <div className={`pointer-events-none absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 ${item.href === "/services" ? "w-[42rem]" : "w-80"}`}>
                  <div className={`grid gap-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_24px_65px_rgba(8,31,73,0.18)] ${item.href === "/services" ? "grid-cols-2" : ""}`}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="rounded-xl px-4 py-3 transition hover:bg-blue-50 focus-visible:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                        <span className="block text-sm font-bold text-slate-900">{child.label}</span>
                        {child.description && <span className="mt-1 block text-xs leading-5 text-slate-500">{child.description}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${isActive(item.href) ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50 hover:text-blue-800"}`}>{item.label}</Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <Link href="/secure/login" aria-label="Open Secure Archive" className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"><LockKeyhole aria-hidden size={18} /></Link>
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">Start a project <ArrowUpRight aria-hidden size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
          </div>

          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 xl:hidden">{open ? <X aria-hidden size={21} /> : <Menu aria-hidden size={21} />}</button>
        </div>

        <div id="mobile-navigation" className={`grid transition-[grid-template-rows,opacity] duration-300 xl:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <nav aria-label="Mobile navigation" className="max-h-[calc(100vh-7rem)] overflow-y-auto border-t border-slate-100 pb-2 pt-4">
              {navItems.map((item) => (
                <div key={item.href} className="mb-1">
                  <Link href={item.href} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 font-semibold ${isActive(item.href) ? "bg-blue-50 text-blue-800" : "text-slate-700 hover:bg-slate-50"}`}>{item.label}</Link>
                  {item.children && <div className="ml-4 grid border-l border-blue-100 pl-3 sm:grid-cols-2">
                    {item.children.slice(1).map((child) => <Link key={child.href} href={child.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-800">{child.label}</Link>)}
                  </div>}
                </div>
              ))}
              <div className="mt-3 grid gap-1 sm:grid-cols-2">
                <Link href="/contact" onClick={() => setOpen(false)} className="rounded-xl bg-blue-700 px-4 py-3 font-bold text-white">Contact us</Link>
                <Link href="/secure/login" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-3 font-semibold text-slate-600"><LockKeyhole aria-hidden size={17} /> Secure Archive</Link>
              </div>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
