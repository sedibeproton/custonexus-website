import { Code2, HeartPulse, PackageCheck, UsersRound } from "lucide-react";
import Container from "@/components/Container";
import Link from "next/link";

const items = [
  { icon: Code2, number: "01", title: "Digital Technology", description: "Custom websites, apps and connected systems.", href: "/services/healthcare-technology" },
  { icon: PackageCheck, number: "02", title: "Medical Solutions", description: "Equipment, servicing and consumables.", href: "/services/medical-equipment-consumables" },
  { icon: UsersRound, number: "03", title: "Professional Services", description: "Consulting, projects and support.", href: "/services/professional-services" },
  { icon: HeartPulse, number: "04", title: "Partnerships", description: "Meaningful healthcare collaboration.", href: "/services/strategic-partnerships" },
];

export default function TrustSection() {
  return <section aria-label="Core service categories" className="relative z-30 -mt-24 pb-12"><Container><div className="cn-glass grid overflow-hidden rounded-[2rem] md:grid-cols-2 xl:grid-cols-4">{items.map(({ icon: Icon, number, title, description, href }, index) => <Link href={href} key={title} className={`group relative flex gap-4 p-6 transition hover:bg-white/80 focus-visible:bg-white sm:p-7 ${index ? "border-t border-slate-200/70 md:border-l md:border-t-0" : ""} ${index === 2 ? "md:border-l-0 xl:border-l" : ""}`}><span className="absolute right-5 top-4 text-xs font-bold tracking-widest text-slate-300">{number}</span><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:scale-105 group-hover:bg-blue-700 group-hover:text-white"><Icon size={23} aria-hidden /></div><div><h2 className="font-bold text-blue-950">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p><span className="mt-2 inline-block text-xs font-bold text-blue-700 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">Explore service →</span></div></Link>)}</div></Container></section>;
}
