import type { ReactNode } from "react";
import { ArrowDownRight } from "lucide-react";
import Container from "./Container";

interface ConstitutionChapterProps {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  statement: string;
  children: ReactNode;
  principles: string[];
  reflection: string;
  inverted?: boolean;
}

export default function ConstitutionChapter({ id, number, eyebrow, title, statement, children, principles, reflection, inverted = false }: ConstitutionChapterProps) {
  return (
    <section id={id} className={`scroll-mt-32 py-20 sm:py-28 ${inverted ? "bg-[#071a3d] text-white" : "bg-[#f7f9fc] text-slate-950"}`}>
      <Container>
        <article className="grid gap-12 lg:grid-cols-[0.58fr_1.42fr] lg:gap-20">
          <header className="lg:sticky lg:top-36 lg:self-start">
            <div className={`text-7xl font-semibold tracking-[-0.07em] ${inverted ? "text-white/10" : "text-blue-950/[0.08]"}`}>{number}</div>
            <p className={`mt-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] ${inverted ? "text-blue-200" : "text-blue-700"}`}><span className="h-px w-8 bg-emerald-500" />{eyebrow}</p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">{title}</h2>
          </header>

          <div>
            <blockquote className={`border-l-2 pl-6 text-2xl font-medium leading-10 sm:text-3xl sm:leading-[1.45] ${inverted ? "border-blue-400 text-blue-50" : "border-blue-600 text-blue-950"}`}>&ldquo;{statement}&rdquo;</blockquote>
            <div className={`mt-10 space-y-6 text-lg leading-9 ${inverted ? "text-slate-300" : "text-slate-600"}`}>{children}</div>

            <div className={`mt-12 rounded-[1.75rem] border p-6 sm:p-8 ${inverted ? "border-white/10 bg-white/[0.06]" : "border-blue-100 bg-white shadow-[0_18px_55px_rgba(15,48,105,.07)]"}`}>
              <p className={`text-xs font-bold uppercase tracking-[0.24em] ${inverted ? "text-blue-200" : "text-blue-700"}`}>We therefore commit to</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {principles.map((principle) => <li key={principle} className="flex items-start gap-3 leading-7"><span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />{principle}</li>)}
              </ul>
            </div>

            <aside className={`mt-8 flex items-start gap-4 rounded-2xl px-5 py-5 ${inverted ? "bg-blue-500/10 text-blue-100" : "bg-blue-50 text-blue-950"}`}>
              <ArrowDownRight className="mt-1 shrink-0 text-emerald-500" size={22} aria-hidden />
              <div><p className="text-xs font-bold uppercase tracking-[0.22em]">Question for reflection</p><p className="mt-2 font-medium leading-7">{reflection}</p></div>
            </aside>
          </div>
        </article>
      </Container>
    </section>
  );
}
