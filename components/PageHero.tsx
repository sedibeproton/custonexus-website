import FadeIn from "./FadeIn";
import Container from "./Container";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-950 via-[#07327c] to-blue-700 pb-20 pt-36 text-white sm:pb-28 sm:pt-44">
      <Container className="relative z-10">
        <FadeIn>
        {/* Eyebrow */}
        <p className="font-semibold uppercase tracking-[0.35em] text-blue-300">
          {eyebrow}
        </p>

        {/* Heading */}
        <h1 className="mt-5 max-w-5xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-7xl">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:mt-8 sm:text-xl sm:leading-9">
          {subtitle}
        </p>

        </FadeIn>
      </Container>

      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -right-20 top-24 h-72 w-72 rotate-12 border border-white/10 [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]" />
        <div className="absolute right-48 top-52 h-24 w-24 border border-blue-300/30 [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]" />
      </div>
    </section>
  );
}
