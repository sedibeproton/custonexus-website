"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, HeartPulse, ShieldCheck } from "lucide-react";
import Container from "./Container";

const reveal = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function HeroContent() {
  const reduced = useReducedMotion();
  return (
    <Container className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
      <motion.div initial={reduced ? "show" : "hidden"} animate="show" transition={{ staggerChildren: reduced ? 0 : 0.09 }} className="relative z-10">
        <motion.div variants={reveal} className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-800 shadow-sm backdrop-blur sm:text-xs sm:tracking-[0.18em]"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Custom technology · Healthcare solutions</motion.div>
        <motion.h1 variants={reveal} className="mt-7 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#071a3d] sm:text-6xl lg:text-[5.25rem]">Together,<br /><span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Better Healthcare.</span></motion.h1>
        <motion.p variants={reveal} className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">Custom websites and applications, medical equipment services, professional expertise and trusted partnerships—designed around real people and real operational needs.</motion.p>
        <motion.div variants={reveal} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/services" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-700 px-7 py-4 font-bold text-white shadow-[0_14px_35px_rgba(29,78,216,.25)] transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:ring-4 focus-visible:ring-blue-200">Explore our capabilities <ArrowRight size={19} aria-hidden className="transition group-hover:translate-x-1" /></Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-7 py-4 font-bold text-blue-950 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white focus-visible:ring-4 focus-visible:ring-blue-100">Request a quote</Link>
        </motion.div>
        <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
          {["Fully custom digital work", "People-first delivery", "South African founded"].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 size={17} aria-hidden className="text-emerald-600" />{item}</span>)}
        </motion.div>
      </motion.div>

      <motion.div initial={reduced ? { opacity: 1 } : { opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[700px]">
        <div className="absolute -inset-8 rounded-[4rem] bg-blue-500/10 blur-3xl" />
        <div className="relative aspect-[4/4.35] overflow-hidden rounded-[2rem] border-[6px] border-white bg-slate-200 shadow-[0_35px_100px_rgba(7,26,61,.22)] sm:aspect-[5/4] sm:rounded-[2.5rem] sm:border-[8px]">
          <Image src="/images/healthcare-technology.jpg" alt="Healthcare professional using connected digital technology" fill priority sizes="(max-width: 1024px) 92vw, 52vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071a3d]/50 via-transparent to-blue-400/10" />
          <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-[#071a3d]/70 p-5 text-white backdrop-blur-xl sm:inset-x-7 sm:bottom-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200 sm:text-xs">Our core speciality</p><p className="mt-2 text-lg font-semibold sm:text-2xl">Websites, apps & connected healthcare systems</p>
          </div>
        </div>
        <motion.div animate={reduced ? undefined : { y: [0, -9, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-5 top-[18%] hidden rounded-2xl border border-white bg-white/90 p-4 text-blue-700 shadow-xl backdrop-blur sm:block"><Code2 size={27} /></motion.div>
        <div className="absolute -right-4 top-[38%] hidden rounded-2xl border border-white bg-white/90 p-4 text-emerald-600 shadow-xl backdrop-blur sm:block"><HeartPulse size={27} /></div>
        <div className="absolute -right-2 top-[12%] hidden items-center gap-3 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl backdrop-blur md:flex"><ShieldCheck className="text-blue-700" size={22} /><span className="text-sm font-bold text-blue-950">Built on trust</span></div>
      </motion.div>
    </Container>
  );
}
