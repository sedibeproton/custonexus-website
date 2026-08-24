import Container from "@/components/Container";
import Link from "next/link";
import { Mail, MapPin, Globe, Building2 } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm leading-8 text-slate-400">
              CustoNexus Technologies strengthens healthcare through trusted partnerships, thoughtful innovation, and people-first solutions.
            </p>
            <p className="mt-6 font-semibold text-blue-400">
              Building meaningful healthcare together.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Quick Links</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link href="/about" className="transition hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/constitution" className="transition hover:text-white">
                  Constitution
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="transition hover:text-white">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Contact</h3>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <span>hello@custonexus.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-400" />
                <span>South Africa</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Socials</h3>
            <div className="flex gap-3">
              <a href="#" className="rounded-full bg-slate-800 p-3 transition hover:bg-blue-700" aria-label="LinkedIn">
                <Building2 size={18} />
              </a>
              <a href="#" className="rounded-full bg-slate-800 p-3 transition hover:bg-blue-700" aria-label="Website">
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <div className="flex flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row md:items-center">
            <p>© 2026 CustoNexus Technologies. All Rights Reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="transition hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:text-white">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
