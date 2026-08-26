import HeroContent from "@/components/HeroContent";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[790px] overflow-hidden bg-[#f7f9fc] pb-32 pt-36 sm:pt-44 lg:flex lg:items-center lg:pb-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(37,99,235,0.18),transparent_32%),radial-gradient(circle_at_65%_65%,rgba(16,185,129,0.08),transparent_24%)]" />
        <div className="absolute right-0 top-0 h-full w-[55%] opacity-[0.12] [background-image:linear-gradient(rgba(37,99,235,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,.2)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="absolute -bottom-52 -left-[10%] h-72 w-[120%] -rotate-3 rounded-[50%] bg-[#071a3d]" />
      </div>
      <HeroContent />
    </section>
  );
}
