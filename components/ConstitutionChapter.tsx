import type { ReactNode } from "react";
import Container from "@/components/Container";

interface ConstitutionChapterProps {
  number: number;
  title: string;
  quote?: string;
  children: ReactNode;
  reflection?: string;
  variant?: "default" | "soft";
}

export default function ConstitutionChapter({
  number,
  title,
  quote,
  children,
  reflection,
  variant = "default",
}: ConstitutionChapterProps) {
  return (
    <section
      className={
        variant === "soft"
          ? "bg-slate-50 py-20 md:py-24"
          : "bg-white py-20 md:py-24"
      }
    >
      <Container>
        <article className="mx-auto max-w-4xl">
          {/* Chapter heading */}
          <header className="mb-12 md:mb-14">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-blue-700" />

              <p className="text-xs font-bold uppercase tracking-[0.4em] text-blue-700">
                Chapter {number}
              </p>
            </div>

            <div className="mt-6 max-w-4xl">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
                {title}
              </h2>
            </div>

            {quote && (
              <blockquote className="mt-8 max-w-3xl border-l-4 border-blue-200 pl-6 text-lg italic leading-8 text-slate-500 md:text-xl md:leading-9">
                &ldquo;{quote}&rdquo;
              </blockquote>
            )}
          </header>

          {/* Chapter content */}
          <div className="space-y-7 text-base leading-8 text-slate-700 md:text-lg md:leading-9">
            {children}
          </div>

          {/* Reflection */}
          {reflection && (
            <aside className="mt-14 rounded-2xl border border-blue-100 bg-blue-50/70 p-7 md:mt-16 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-700">
                Reflection
              </p>

              <p className="mt-4 text-base font-medium leading-7 text-slate-800 md:text-lg md:leading-8">
                {reflection}
              </p>
            </aside>
          )}
        </article>
      </Container>
    </section>
  );
}