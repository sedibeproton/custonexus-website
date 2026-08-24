import ImageFrame from "@/components/ImageFrame";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { ArrowDown } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">

      {/* Background Image */}

      <ImageFrame
        src="/images/about-hero.jpg"
        alt="Healthcare professionals collaborating"
        fill
        priority
        variant="plain"
        className="object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-slate-950/70" />

      {/* Decorative Gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-slate-950/50 to-transparent" />

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-7xl px-8">

        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">
            About CustoNexus
          </p>

          <div className="mt-5 mb-8 h-1 w-24 rounded-full bg-blue-500" />

          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">

            Building Better Healthcare

            <span className="block text-blue-300">
              Through Meaningful Connections.
            </span>

          </h1>

          <p className="mt-10 max-w-2xl text-xl leading-9 text-slate-200">

            CustoNexus Technologies exists to strengthen healthcare through
            trusted partnerships, innovative solutions, and technology that
            puts people first.

          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <PrimaryButton href="#our-story">Read Our Story</PrimaryButton>

            <SecondaryButton href="/constitution">Read Our Constitution</SecondaryButton>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">

        <ArrowDown className="mx-auto h-6 w-6 animate-bounce text-white/70" />

        <p className="mt-2 text-xs uppercase tracking-[0.35em] text-white/60">
          Scroll
        </p>

      </div>

    </section>
  );
}