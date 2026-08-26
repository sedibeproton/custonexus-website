import Container from "@/components/Container";
import Link from "next/link";
import { LockKeyhole, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-blue-900 bg-gradient-to-br from-[#041534] via-blue-950 to-[#06276a] text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.8fr]">
          <div>
            <div className="inline-flex rounded-2xl bg-white px-4 py-2 shadow-lg"><Logo /></div>
            <p className="mt-6 max-w-sm leading-8 text-slate-400">
              Strengthening healthcare through trusted partnerships, thoughtful innovation and people-first solutions.
            </p>
            <p className="mt-6 font-semibold text-blue-400">
              Building meaningful healthcare together.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Explore</h3>
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
                <Link href="/services" className="transition hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="transition hover:text-white">
                  FAQs
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
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Contact</h3>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <a href="mailto:info@custonexus.com" className="transition hover:text-white">info@custonexus.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400" />
                <a href="tel:+27722701087" className="transition hover:text-white">072 270 1087</a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={18} className="text-blue-400" />
                <a href="https://wa.me/27722701087" target="_blank" rel="noreferrer" className="transition hover:text-white">WhatsApp us</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-400" />
                <span>South Africa</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <div className="flex flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row md:items-center">
            <p>© 2026 CustoNexus Technologies. All Rights Reserved.</p>
            <Link href="/secure/login" className="inline-flex items-center gap-2 transition hover:text-white">
              <LockKeyhole size={15} /> Secure Archive
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
