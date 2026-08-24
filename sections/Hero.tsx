import HeroContent from "@/components/HeroContent";
import ImageFrame from "@/components/ImageFrame";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Background decoration */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_45%)]" />
      <div className="absolute top-16 right-16 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-100/30 blur-3xl"></div>

      <HeroContent />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}