"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import ImageFrame from "@/components/ImageFrame";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroContent() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <Container className="grid items-center gap-20 lg:grid-cols-2">
        <motion.div variants={item}>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">
            CustoNexus Technologies
          </p>

          <h1 className="max-w-3xl text-6xl font-bold leading-tight text-slate-900 lg:text-7xl">
            <span className="block">Building</span>
            <span className="block text-blue-700">The Future</span>
            <span className="block">of Healthcare</span>
          </h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-9 text-slate-600">
            CustoNexus Technologies partners with healthcare professionals, organisations and innovators to create meaningful solutions that improve healthcare experiences and strengthen communities.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-5">
            <PrimaryButton href="/solutions">Explore Our Solutions</PrimaryButton>
            <SecondaryButton href="/constitution">Read Our Constitution</SecondaryButton>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-6 border-t border-slate-200 pt-8 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-2"><span className="text-blue-700">✓</span> Healthcare Partnerships</span>
            <span className="flex items-center gap-2"><span className="text-blue-700">✓</span> Constitution Driven</span>
            <span className="flex items-center gap-2"><span className="text-blue-700">✓</span> South African Innovation</span>
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="relative flex justify-center">
          <div className="absolute h-[420px] w-[420px] rounded-full bg-blue-600/5 blur-3xl animate-pulse" />

          <div className="group relative">
            <ImageFrame
              src="/images/hero-healthcare.jpg"
              alt="Healthcare Technology"
              width={620}
              height={620}
              priority
              loading="eager"
              className="w-full rounded-[40px] object-cover"
            />

            <div className="absolute -bottom-8 -left-8 max-w-[240px] rounded-[24px] border border-slate-200 bg-white px-6 py-5 shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">Healthcare First</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Meaningful Connections</p>
              <p className="mt-1 text-sm text-slate-600">Trusted Partnerships</p>
            </div>
          </div>
        </motion.div>
      </Container>

      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
        <div className="text-slate-500 text-sm animate-bounce">↓ Scroll</div>
      </div>
    </motion.div>
  );
}
