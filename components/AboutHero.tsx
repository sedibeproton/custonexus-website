import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-transparent opacity-80" />
      </div>

      <div className="relative">
        <div className="w-full">
          <Image
            src="/images/healthcare-technology.jpg"
            alt="About CustoNexus"
            width={2000}
            height={700}
            className="w-full h-[420px] object-cover lg:h-[560px]"
            priority
          />
        </div>

        <div className="-mt-40 px-6 lg:-mt-56">
          <div className="mx-auto max-w-5xl rounded-2xl bg-white/95 p-12 shadow-2xl backdrop-blur">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">About</p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">Building Meaningful Connections in Healthcare.</h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">CustoNexus Technologies exists to strengthen healthcare through trusted partnerships, innovative solutions and technology that puts people first.</p>

            <div className="mt-8 flex gap-4">
              <PrimaryButton href="/contact">Let&apos;s Talk</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
