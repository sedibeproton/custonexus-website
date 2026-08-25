import HeroContent from "@/components/HeroContent";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f8fbff] pb-24 pt-32 sm:pb-32 sm:pt-40 lg:min-h-[760px] lg:pb-40 lg:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_35%,rgba(59,130,246,0.16),transparent_38%),linear-gradient(110deg,#ffffff_12%,#f7faff_56%,#edf5ff_100%)]" />
      <div aria-hidden className="absolute -bottom-64 left-[-8%] -z-10 h-80 w-[116%] rotate-[-3deg] rounded-[50%] border-t border-blue-200/70 bg-blue-950" />
      <HeroContent />
    </section>
  );
}
