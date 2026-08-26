import Container from "./Container";
import FadeIn from "./FadeIn";

interface PageHeroProps { eyebrow: string; title: string; subtitle: string; }

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#071a3d] pb-24 pt-40 text-white sm:pb-32 sm:pt-48">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(46,118,255,0.35),transparent_34%),radial-gradient(circle_at_15%_95%,rgba(16,185,129,0.13),transparent_25%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_right,black,transparent_80%)]" />
        <div className="absolute -right-20 top-28 h-80 w-80 rotate-[24deg] rounded-[4rem] border border-white/10" />
      </div>
      <Container><FadeIn><div className="max-w-5xl">
        <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-blue-200 sm:text-sm"><span className="h-px w-9 bg-emerald-400" />{eyebrow}</p>
        <h1 className="mt-7 text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-7 max-w-3xl border-l border-blue-400/50 pl-6 text-lg leading-8 text-blue-100 sm:text-xl sm:leading-9">{subtitle}</p>
      </div></FadeIn></Container>
    </section>
  );
}
