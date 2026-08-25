"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, HeartPulse, Users } from "lucide-react";

import Container from "@/components/Container";

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export default function HeroContent() {
  const reduceMotion = useReducedMotion();

  return (
    <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
      <motion.div
        initial={reduceMotion ? "show" : "hidden"}
        animate="show"
        transition={{ staggerChildren: reduceMotion ? 0 : 0.1 }}
        className="relative z-10"
      >
        <motion.p variants={reveal} transition={{ duration: 0.55 }} className="text-xs font-bold uppercase tracking-[0.25em] text-blue-700 sm:text-sm">
          CustoNexus Technologies
        </motion.p>

        <motion.h1 variants={reveal} transition={{ duration: 0.65 }} className="mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-[-0.045em] text-blue-950 sm:text-6xl lg:text-[4.8rem]">
          Together,<br />Better Healthcare<span className="text-blue-600">.</span>
        </motion.h1>

        <motion.div variants={reveal} className="mt-7 h-1 w-14 rounded-full bg-blue-600" />

        <motion.p variants={reveal} transition={{ duration: 0.6 }} className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          Building trusted partnerships, innovative healthcare solutions and meaningful connections that improve healthcare experiences.
        </motion.p>

        <motion.div variants={reveal} className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Link href="/solutions" className="inline-flex items-center justify-center gap-5 rounded-xl bg-blue-700 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-1 hover:bg-blue-800 hover:shadow-xl">
            Explore Our Solutions <ArrowRight size={20} />
          </Link>
          <Link href="/constitution" className="inline-flex items-center justify-center gap-3 rounded-xl border border-blue-600 bg-white/70 px-7 py-4 font-semibold text-blue-700 backdrop-blur transition hover:-translate-y-1 hover:bg-blue-50">
            <BookOpen size={20} /> Read Our Constitution
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-3xl lg:translate-x-10"
      >
        <div aria-hidden className="absolute inset-10 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative aspect-[1.16/1] overflow-hidden [clip-path:polygon(24%_0,76%_0,100%_50%,76%_100%,24%_100%,0_50%)]">
          <Image
            src="/images/healthcare-technology.jpg"
            alt="Healthcare professional using connected digital technology"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 52vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-blue-400/10" />
        </div>

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-1/2 flex h-20 w-20 -translate-x-2 -translate-y-1/2 items-center justify-center bg-blue-700 text-white shadow-xl [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)] sm:h-24 sm:w-24"
        >
          <HeartPulse size={38} />
        </motion.div>
        <div className="absolute bottom-[4%] left-[10%] flex h-20 w-20 items-center justify-center border border-blue-400 bg-white/90 text-blue-700 backdrop-blur [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)] sm:h-24 sm:w-24">
          <Users size={36} />
        </div>
      </motion.div>
    </Container>
  );
}
