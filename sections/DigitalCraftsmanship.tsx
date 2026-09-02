import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Code2, LayoutDashboard, MessageSquareText, ShieldCheck, Sparkles } from "lucide-react";

import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

const features = [
  { icon: CalendarDays, label: "Booking & availability" },
  { icon: MessageSquareText, label: "Guided contact journeys" },
  { icon: LayoutDashboard, label: "Dashboards & workflows" },
  { icon: ShieldCheck, label: "Secure, maintainable systems" },
] as const;

export default function DigitalCraftsmanship() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-20 text-white sm:py-28 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,.32),transparent_30%),radial-gradient(circle_at_88%_78%,rgba(16,185,129,.14),transparent_26%)]" />
        <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      </div>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="Digital Craftsmanship"
              title="Your website should work as impressively as it looks."
              subtitle="We design every digital experience around the organisation, its users and the work it needs to accomplish. No WordPress. No purchased themes. No generic page-builder templates."
              align="left"
              variant="inverted"
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold text-blue-50 backdrop-blur">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-200"><Icon size={19} aria-hidden /></span>
                  {label}
                </div>
              ))}
            </div>
            <Link href="/services/healthcare-technology" className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-bold text-blue-950 transition hover:-translate-y-0.5 hover:bg-blue-50">
              Explore custom websites and apps <ArrowRight size={18} aria-hidden className="transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-3xl">
            <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-blue-500/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#071a3d]/90 shadow-[0_35px_100px_rgba(0,0,0,.45)] backdrop-blur-xl sm:rounded-[2.25rem]">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.06] px-5 py-4 sm:px-7">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <div className="ml-3 flex min-w-0 flex-1 items-center justify-center rounded-lg border border-white/10 bg-slate-950/40 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-slate-400 sm:text-xs">custonexus.com / digital-experience</div>
              </div>
              <div className="relative grid min-h-[420px] gap-6 p-5 sm:min-h-[500px] sm:p-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div aria-hidden className="cn-home-scan absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-70" />
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200"><Sparkles size={13} /> Designed around you</div>
                  <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">From first impression to business process.</h3>
                  <p className="mt-5 leading-7 text-slate-300">Responsive interfaces, meaningful interaction and the operational logic behind them—planned as one connected experience.</p>
                  <div className="mt-7 flex items-center gap-3 text-sm font-bold text-emerald-300"><CheckCircle2 size={18} /> Built from the ground up</div>
                </div>
                <div className="relative rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl sm:p-5">
                  <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-5 shadow-xl sm:p-6">
                    <div className="flex items-center justify-between"><Code2 size={25} /><span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Live workflow</span></div>
                    <div className="mt-12 h-3 w-3/4 rounded-full bg-white/90" />
                    <div className="mt-3 h-2 w-full rounded-full bg-white/30" />
                    <div className="mt-2 h-2 w-4/5 rounded-full bg-white/20" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white p-4 text-blue-950"><p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Experience</p><p className="mt-2 text-lg font-bold">Responsive</p></div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Approach</p><p className="mt-2 text-lg font-bold">Purpose-built</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
