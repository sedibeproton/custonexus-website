import ImageFrame from "@/components/ImageFrame";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { ArrowDown } from "lucide-react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-[44rem] items-center overflow-hidden pb-16 pt-32 sm:min-h-[48rem] sm:pt-36 lg:min-h-[50rem]">

      {/* Background Image */}

      <ImageFrame
        src="/images/about-hero-identity-v2.png"
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

      <Container className="relative z-10">

        <FadeIn>
        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">
            About CustoNexus
          </p>

          <div className="mb-7 mt-5 h-1 w-20 rounded-full bg-blue-500" />

          <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-7xl">

            Building Better Healthcare

            <span className="block text-blue-300">
              Through Meaningful Connections.
            </span>

          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl sm:leading-9">

            CustoNexus Technologies exists to strengthen healthcare through
            trusted partnerships, innovative solutions, and technology that
            puts people first.

          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">

            <PrimaryButton href="#our-story">Read Our Story</PrimaryButton>

            <SecondaryButton href="/constitution" className="border-white text-white hover:bg-white hover:text-blue-800">Read Our Constitution</SecondaryButton>

          </div>

        </div>
        </FadeIn>
      </Container>

      {/* Scroll Indicator */}

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-center sm:block">

        <ArrowDown className="mx-auto h-6 w-6 animate-bounce text-white/70" />

        <p className="mt-2 text-xs uppercase tracking-[0.35em] text-white/60">
          Scroll
        </p>

      </div>

    </section>
  );
}
