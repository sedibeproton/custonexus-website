interface StatItem {
  value: string;
  label: string;
}

interface StatsProps {
  items: StatItem[];
  className?: string;
}

export default function Stats({ items, className = "" }: StatsProps) {
  return (
    <div className={`grid gap-6 sm:grid-cols-3 ${className}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
        >
          <p className="text-3xl font-bold text-blue-700">{item.value}</p>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-600">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
