import Container from "@/components/Container";
import Link from "next/link";
import { LockKeyhole, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050f25] text-white">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_12%_25%,rgba(37,99,235,.2),transparent_28%),radial-gradient(circle_at_90%_80%,rgba(16,185,129,.1),transparent_23%)]" />
      <Container className="relative py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.55fr_0.9fr_0.8fr] lg:gap-12">
          <div>
            <div className="inline-flex rounded-2xl bg-white px-4 py-2 shadow-2xl"><Logo /></div>
            <p className="mt-6 max-w-sm leading-8 text-slate-400">
              Websites, business systems and custom digital solutions for South African businesses and healthcare organisations.
            </p>
            <p className="mt-6 font-semibold text-blue-400">
              Technology that helps organisations work better.
            </p>
            <div className="mt-8">
              <SocialLinks />
            </div>
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
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Services</h3>
            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              <li><Link href="/services/business-websites" className="transition hover:text-white">Custom Website Design & Development</Link></li>
              <li><Link href="/services/website-support" className="transition hover:text-white">Website Redesign, Maintenance & Support</Link></li>
              <li><Link href="/services/business-systems" className="transition hover:text-white">Business Systems & Custom Software</Link></li>
              <li><Link href="/services/healthcare-technology" className="transition hover:text-white">Healthcare Technology</Link></li>
              <li><Link href="/services/professional-services" className="transition hover:text-white">Consulting, Projects & Technical Support</Link></li>
              <li><Link href="/services/strategic-partnerships" className="transition hover:text-white">Healthcare Partnerships</Link></li>
              <li><Link href="/services/medical-equipment-consumables" className="transition hover:text-white">Medical Equipment Enquiries</Link></li>
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
                <a href={createWhatsAppUrl(whatsappMessages.general)} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">WhatsApp us</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-400" />
                <span>South Africa</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-9 border-t border-slate-800 pt-6">
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
