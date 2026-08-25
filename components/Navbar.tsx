"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LockKeyhole } from "lucide-react";

import Container from "@/components/Container";
import Logo from "./Logo";
import NavLink from "./NavLink";
import PrimaryButton from "./PrimaryButton";

const navItems: Array<{
  href: string;
  label: string;
  disableActive?: boolean;
}> = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Solutions" },
  { href: "/constitution", label: "Constitution" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const secureActive = pathname.startsWith("/secure");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b bg-white/95 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-slate-200 shadow-md"
          : "border-slate-200 shadow-sm"
      }`}
    >
      <Container
        className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <div
          className={`transition-all duration-300 ${
            scrolled ? "scale-[0.95]" : "scale-100"
          }`}
        >
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              disableActive={item.disableActive}
            >
              {item.label}
            </NavLink>
          ))}

          {/* Secure Archive */}
          <Link
            href="/secure/login"
            aria-label="Open Secure Archive"
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
              secureActive
                ? "text-blue-700"
                : "text-slate-600 hover:text-blue-700"
            }`}
          >
            <LockKeyhole size={16} strokeWidth={2} />
            <span>Secure Archive</span>
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <PrimaryButton href="/contact" className="rounded-full px-7 py-3.5">
            Let&apos;s Talk
          </PrimaryButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {/* Mobile Navigation */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:hidden border-t border-slate-200 bg-white/95 shadow-xl`}
      >
        <Container className="py-6">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Secure Archive */}
            <Link
              href="/secure/login"
              onClick={() => setMenuOpen(false)}
              aria-label="Open Secure Archive"
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-lg font-medium transition-colors ${
                secureActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <LockKeyhole size={20} strokeWidth={2} />
              <span>Secure Archive</span>
            </Link>
          </div>

          <div className="mt-6">
            <PrimaryButton href="/contact">
              Let&apos;s Talk
            </PrimaryButton>
          </div>
        </Container>
      </div>
    </header>
  );
}
