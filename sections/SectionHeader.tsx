type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: Props) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">

      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-5xl font-bold leading-tight text-slate-900">
        {title}
      </h2>

      <p className="mt-6 text-lg leading-9 text-slate-600">
        {subtitle}
      </p>

    </div>
  );
}