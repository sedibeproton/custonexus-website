"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

import { createWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";
import Container from "./Container";
import TechnologyShowcase from "./TechnologyShowcase";

const reveal = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function HeroContent() {
  const reduced = useReducedMotion();

  return (
    <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      <motion.div initial={reduced ? "show" : "hidden"} animate="show" transition={{ staggerChildren: reduced ? 0 : 0.09 }} className="relative z-10 min-w-0">
        <motion.div variants={reveal} className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-800 shadow-sm backdrop-blur sm:text-xs sm:tracking-[0.18em]">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Technology for South African businesses
        </motion.div>
        <motion.h1 variants={reveal} className="mt-7 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#071a3d] sm:text-6xl lg:text-[5rem]">
          Technology that helps your <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">business work better.</span>
        </motion.h1>
        <motion.p variants={reveal} className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          Professional websites, business systems and custom digital solutions for companies, practices and healthcare organisations.
        </motion.p>
        <motion.div variants={reveal} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/contact" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-700 px-7 py-4 font-bold text-white shadow-[0_14px_35px_rgba(29,78,216,.25)] transition hover:-translate-y-0.5 hover:bg-blue-800">Start a project <ArrowRight size={19} aria-hidden className="transition group-hover:translate-x-1" /></Link>
          <Link href="/services" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-7 py-4 font-bold text-blue-950 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white">Explore services</Link>
          <a href={createWhatsAppUrl(whatsappMessages.project)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-bold text-emerald-700 transition hover:bg-emerald-50"><MessageCircle size={19} aria-hidden /> WhatsApp us</a>
        </motion.div>
        <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
          {["Clear project scope", "Mobile-first delivery", "Direct communication"].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 size={17} aria-hidden className="text-emerald-600" />{item}</span>)}
        </motion.div>
      </motion.div>

      <motion.div initial={reduced ? { opacity: 1 } : { opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto min-w-0 w-full max-w-[700px]">
        <TechnologyShowcase variant="overview" />
      </motion.div>
    </Container>
  );
}
