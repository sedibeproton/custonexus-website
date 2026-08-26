import { Code2, HeartPulse, PackageCheck, UsersRound } from "lucide-react";
import Container from "@/components/Container";

const items = [
  { icon: Code2, number: "01", title: "Digital Health", description: "Websites, apps and connected systems." },
  { icon: PackageCheck, number: "02", title: "Medical Supply", description: "Equipment and essential consumables." },
  { icon: UsersRound, number: "03", title: "Expert Services", description: "Strategy, delivery and support." },
  { icon: HeartPulse, number: "04", title: "Partnerships", description: "Meaningful healthcare collaboration." },
];

export default function TrustSection() {
  return <section className="relative z-30 -mt-24 pb-12"><Container><div className="cn-glass grid overflow-hidden rounded-[2rem] md:grid-cols-2 xl:grid-cols-4">{items.map(({ icon: Icon, number, title, description }, index) => <div key={title} className={`group relative flex gap-4 p-6 sm:p-7 ${index ? "border-t border-slate-200/70 md:border-l md:border-t-0" : ""} ${index === 2 ? "md:border-l-0 xl:border-l" : ""}`}><span className="absolute right-5 top-4 text-xs font-bold tracking-widest text-slate-300">{number}</span><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white"><Icon size={23} /></div><div><h2 className="font-bold text-blue-950">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div></div>)}</div></Container></section>;
}
