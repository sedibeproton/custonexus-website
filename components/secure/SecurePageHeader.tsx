import Link from "next/link";

type Props = { eyebrow: string; title: string; description: string; actionHref?: string; actionLabel?: string };

export default function SecurePageHeader({ eyebrow, title, description, actionHref, actionLabel }: Props) {
  return <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:flex-row lg:items-center lg:justify-between">
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-800">{eyebrow}</p>
      <h1 className="mt-2 break-words text-2xl font-bold text-slate-950 sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
    </div>
    {actionHref && actionLabel && <Link href={actionHref} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-800 px-4 py-2 text-sm font-bold text-white hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-blue-600 lg:shrink-0">{actionLabel}</Link>}
  </header>;
}
