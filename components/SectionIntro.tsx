interface SectionIntroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  centered?: boolean;
}

export default function SectionIntro({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: SectionIntroProps) {
  return (
    <div
      className={
        centered
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      <p className="font-semibold uppercase tracking-[0.35em] text-blue-700">
        {eyebrow}
      </p>

      <h2 className="mt-6 text-5xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-8 text-xl leading-9 text-slate-600">
        {subtitle}
      </p>
    </div>
  );
}