"use client";

import { usePathname } from "next/navigation";

export default function BackgroundDecor() {
  const pathname = usePathname();

  if (pathname.startsWith("/secure")) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      <div className="absolute -left-24 top-[12%] hidden h-72 w-72 rounded-full bg-blue-400/[0.07] blur-3xl md:block" />
      <div className="absolute -right-24 top-[46%] hidden h-80 w-80 rounded-full bg-emerald-400/[0.06] blur-3xl md:block" />

      <div className="cn-decor-drift absolute -left-12 top-[18%] hidden h-52 w-52 opacity-[0.13] lg:block">
        <svg viewBox="0 0 220 220" className="h-full w-full text-blue-700" fill="none">
          <path d="M22 148 67 104l38 22 46-67 45 21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M67 104 55 48m50 78 18 51m28-118 20 87" stroke="currentColor" strokeWidth="1" strokeDasharray="4 7" />
          {["22,148,7", "67,104,10", "55,48,5", "105,126,6", "123,177,5", "151,59,9", "171,146,6", "196,80,5"].map((item) => {
            const [cx, cy, r] = item.split(",");
            return <circle key={item} cx={cx} cy={cy} r={r} fill="white" stroke="currentColor" strokeWidth="1.5" />;
          })}
        </svg>
      </div>

      <div className="cn-decor-drift-reverse absolute -right-14 top-[39%] hidden h-64 w-64 text-blue-700 opacity-[0.12] lg:block">
        <svg viewBox="0 0 260 260" className="h-full w-full" fill="none">
          <path d="m129 22 34 20v40l-34 20-35-20V42l35-20Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="m194 91 24 14v28l-24 14-25-14v-28l25-14Zm-116 48 30 18v35l-30 18-30-18v-35l30-18Z" stroke="currentColor" />
          <path d="m129 102 40 21m-61 45 61-35M94 62 44 91" stroke="currentColor" strokeDasharray="3 7" />
          <circle cx="44" cy="91" r="5" fill="currentColor" />
          <circle cx="228" cy="174" r="4" fill="currentColor" />
          <path d="m194 147 34 27" stroke="currentColor" strokeDasharray="3 7" />
        </svg>
      </div>

      <div className="absolute -left-3 bottom-[17%] hidden h-32 w-20 opacity-[0.12] md:block [background-image:radial-gradient(circle,#2563eb_1.2px,transparent_1.3px)] [background-size:14px_14px]" />
      <div className="absolute -right-3 top-[15%] hidden h-28 w-20 opacity-[0.1] md:block [background-image:radial-gradient(circle,#059669_1.2px,transparent_1.3px)] [background-size:14px_14px]" />

      <svg
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 hidden h-24 w-full opacity-[0.08] md:block"
        fill="none"
      >
        <path d="M-40 112C219 15 383 144 650 72s469-47 830 27" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M-30 132C240 37 402 158 672 91s479-43 828 25" stroke="#16a34a" />
        <path d="M-70 92C185-4 373 124 625 51s481-48 852 24" stroke="#60a5fa" strokeDasharray="5 10" />
      </svg>
    </div>
  );
}
