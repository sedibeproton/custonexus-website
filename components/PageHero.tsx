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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-blue-700 py-32 text-white">

      <div className="relative mx-auto max-w-7xl px-8">
        {/* Eyebrow */}
        <p className="font-semibold uppercase tracking-[0.35em] text-blue-300">
          {eyebrow}
        </p>

        {/* Heading */}
        <h1 className="mt-6 max-w-5xl text-5xl font-extrabold leading-tight lg:text-7xl">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
          {subtitle}
        </p>

      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>
    </section>
  );
}