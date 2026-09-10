import { Bell, CalendarDays, Check, Database, FileText, LayoutDashboard, MessageCircle, MonitorSmartphone, Search, Wrench } from "lucide-react";

type ShowcaseVariant = "website" | "systems" | "support" | "overview";

export default function TechnologyShowcase({ variant = "overview" }: { variant?: ShowcaseVariant }) {
  if (variant === "systems") return <SystemsShowcase />;
  if (variant === "support") return <SupportShowcase />;
  return <WebsiteShowcase overview={variant === "overview"} />;
}

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="relative min-w-0 w-full max-w-full overflow-hidden rounded-[1.7rem] border border-slate-200/80 bg-white shadow-[0_28px_80px_rgba(7,26,61,.16)] sm:rounded-[2rem]">
      <div className="flex h-12 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <div className="ml-2 flex h-7 min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-400 sm:text-xs"><Search size={12} aria-hidden /> yourbusiness.co.za</div>
      </div>
      {children}
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

function WebsiteShowcase({ overview = false }: { overview?: boolean }) {
  return (
    <div className="relative mx-auto min-w-0 w-full max-w-full px-1 pb-7 sm:max-w-3xl sm:px-5 sm:pb-10">
      <div aria-hidden className="absolute inset-8 rounded-full bg-blue-400/20 blur-3xl" />
      <Frame label="Conceptual responsive business website interface">
        <div className="relative min-h-[390px] overflow-hidden bg-[#f6f9ff] p-5 sm:min-h-[470px] sm:p-8">
          <div aria-hidden className="absolute right-[-15%] top-[-20%] h-72 w-72 rounded-full bg-blue-200/55 blur-3xl" />
          <div className="relative flex items-center justify-between border-b border-blue-950/10 pb-4">
            <div className="flex items-center gap-2 text-sm font-black tracking-tight text-blue-950"><span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-700 text-white">C</span> Your Business</div>
            <div className="hidden gap-5 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:flex"><span>Services</span><span>About</span><span>Contact</span></div>
            <span className="rounded-lg bg-blue-700 px-3 py-2 text-[10px] font-bold text-white">Get a quote</span>
          </div>
          <div className="relative grid gap-6 py-8 sm:grid-cols-[1.05fr_.95fr] sm:items-center sm:py-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-blue-700">Clear customer journey</p>
              <div className="mt-4 h-4 w-4/5 rounded-full bg-blue-950" /><div className="mt-3 h-4 w-2/3 rounded-full bg-blue-950" />
              <div className="mt-6 h-2 w-full rounded-full bg-slate-300" /><div className="mt-2 h-2 w-4/5 rounded-full bg-slate-200" />
              <div className="mt-7 flex gap-2"><span className="rounded-lg bg-blue-700 px-4 py-2 text-[10px] font-bold text-white">Start here</span><span className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-[10px] font-bold text-blue-950">Our work</span></div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-blue-950 p-5 text-white shadow-xl">
              <div className="flex items-center justify-between"><LayoutDashboard size={20} /><span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider">Responsive</span></div>
              <div className="mt-10 grid grid-cols-2 gap-2"><span className="h-16 rounded-xl bg-white/10" /><span className="h-16 rounded-xl bg-emerald-400/25" /></div>
              <div className="mt-2 h-16 rounded-xl bg-white/10" />
            </div>
          </div>
          <div className="relative grid grid-cols-4 gap-1 border-t border-slate-200 pt-4 text-center text-[8px] font-bold uppercase tracking-wider text-slate-500 sm:text-[9px]"><span>Design</span><span>Frontend</span><span>Backend</span><span>Deploy</span></div>
        </div>
      </Frame>
      <div className="absolute bottom-0 right-0 w-[31%] min-w-28 rounded-[1.4rem] border-[5px] border-slate-950 bg-slate-950 p-1 shadow-2xl sm:right-[-1%] sm:w-[27%]">
        <div className="min-h-48 rounded-[.9rem] bg-white p-3 sm:min-h-56"><div className="mx-auto h-1 w-8 rounded-full bg-slate-200" /><div className="mt-6 h-3 w-3/4 rounded bg-blue-950" /><div className="mt-2 h-2 w-full rounded bg-slate-200" /><div className="mt-1 h-2 w-4/5 rounded bg-slate-200" /><div className="mt-5 h-20 rounded-xl bg-blue-50 p-3"><MonitorSmartphone size={18} className="text-blue-700" /><div className="mt-3 h-2 w-full rounded bg-blue-200" /></div><div className="mt-3 rounded-lg bg-blue-700 py-2 text-center text-[8px] font-bold text-white">CONTACT US</div></div>
      </div>
      {overview && <div className="absolute -left-1 bottom-2 hidden items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs font-bold text-emerald-700 shadow-lg sm:flex"><MessageCircle size={16} aria-hidden /> Enquiry ready</div>}
    </div>
  );
}

function SystemsShowcase() {
  return (
    <Frame label="Conceptual business dashboard and workflow interface">
      <div className="grid min-h-[430px] min-w-0 grid-cols-[3.5rem_minmax(0,1fr)] bg-slate-50 sm:min-h-[500px] sm:grid-cols-[9rem_minmax(0,1fr)]">
        <div className="bg-blue-950 p-3 text-white sm:p-5"><div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 font-black">C</div><div className="mt-10 space-y-3">{[LayoutDashboard, CalendarDays, FileText, Database].map((Icon, index) => <div key={index} className={`flex items-center gap-2 rounded-lg p-2 ${index === 0 ? "bg-white/12 text-white" : "text-blue-300"}`}><Icon size={16} /><span className="hidden text-[10px] font-semibold sm:inline">{["Overview","Bookings","Requests","Records"][index]}</span></div>)}</div></div>
        <div className="min-w-0 p-4 sm:p-6"><div className="flex items-center justify-between"><div><p className="text-[9px] font-bold uppercase tracking-wider text-blue-600">Operations workspace</p><p className="mt-1 text-lg font-bold text-blue-950 sm:text-2xl">Good morning</p></div><Bell size={18} className="text-slate-400" /></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{[["Open requests","12"],["Today’s bookings","08"],["Completed","94%"]].map(([label,value]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-2 text-xl font-black text-blue-950">{value}</p></div>)}</div><div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-center justify-between"><p className="text-xs font-bold text-blue-950">Current workflow</p><span className="text-[9px] font-bold text-emerald-600">LIVE</span></div><div className="mt-5 grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">{["Form received","Team review","Record updated"].map((item,index) => <div key={item} className="contents"><div className="rounded-xl bg-blue-50 p-3 text-center text-[9px] font-bold text-blue-900"><Check size={14} className="mx-auto mb-2 text-emerald-600" />{item}</div>{index < 2 && <span className="hidden text-blue-300 sm:block">→</span>}</div>)}</div></div><div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="grid grid-cols-3 bg-slate-100 px-3 py-2 text-[8px] font-bold uppercase tracking-wider text-slate-500"><span>Request</span><span>Status</span><span>Owner</span></div>{["Website enquiry","Booking request","Document review"].map((item,index) => <div key={item} className="grid grid-cols-3 border-t border-slate-100 px-3 py-3 text-[9px] text-slate-600"><span>{item}</span><span className="font-bold text-emerald-600">{index === 1 ? "New" : "In progress"}</span><span>Team</span></div>)}</div></div>
      </div>
    </Frame>
  );
}

function SupportShowcase() {
  return (
    <Frame label="Conceptual website health and support interface">
      <div className="min-h-[430px] bg-slate-50 p-5 sm:min-h-[500px] sm:p-8"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-blue-600">Website care</p><h3 className="mt-2 text-2xl font-bold text-blue-950 sm:text-3xl">Health overview</h3></div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-700 text-white"><Wrench size={22} /></span></div><div className="mt-8 grid gap-3 sm:grid-cols-3">{[["Mobile layout","Checked"],["Contact forms","Working"],["Content updates","Ready"]].map(([label,state]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><Check size={18} className="text-emerald-600" /><p className="mt-5 text-xs font-bold text-blue-950">{label}</p><p className="mt-1 text-[10px] text-slate-500">{state}</p></div>)}</div><div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><p className="text-sm font-bold text-blue-950">Improvement plan</p><span className="rounded-full bg-blue-50 px-3 py-1 text-[9px] font-bold text-blue-700">PRIORITISED</span></div><div className="mt-5 space-y-4">{[["Responsive fixes","100%"],["Performance review","72%"],["Content improvements","45%"]].map(([label,width]) => <div key={label}><div className="flex justify-between text-[10px] font-semibold text-slate-500"><span>{label}</span><span>{width}</span></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-700 to-emerald-500" style={{ width }} /></div></div>)}</div></div></div>
    </Frame>
  );
}
