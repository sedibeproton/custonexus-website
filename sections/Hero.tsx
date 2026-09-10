import HeroContent from "@/components/HeroContent";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(145deg,#fbfdff_0%,#f3f7ff_52%,#eef5ff_100%)] pb-20 pt-32 sm:pb-24 sm:pt-40 lg:flex lg:min-h-[780px] lg:items-center lg:pb-28 lg:pt-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(37,99,235,0.18),transparent_32%),radial-gradient(circle_at_65%_65%,rgba(16,185,129,0.08),transparent_24%)]" />
        <div className="cn-decor-drift absolute -right-32 top-24 h-[34rem] w-[34rem] rounded-full border border-blue-300/25" />
        <div className="cn-decor-drift-reverse absolute -right-10 top-52 h-80 w-80 rounded-full border border-blue-300/20" />
        <div className="absolute right-0 top-0 h-full w-[55%] opacity-[0.12] [background-image:linear-gradient(rgba(37,99,235,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,.2)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:linear-gradient(to_left,black,transparent)]" />
      </div>
      <HeroContent />
    </section>
  );
}
