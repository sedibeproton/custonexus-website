interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  variant?: "default" | "inverted";
  showUnderline?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "default",
  showUnderline = true,
}: Props) {
  const alignment = align === "left" ? "text-left" : "text-center";
  const eyebrowColor = variant === "default" ? "text-blue-700" : "text-blue-200";
  const titleColor = variant === "default" ? "text-slate-900" : "text-white";
  const subtitleColor = variant === "default" ? "text-slate-600" : "text-slate-200";
  const underlineClass = variant === "default" ? "bg-blue-700" : "bg-blue-200";
  return (
    <div
      className={`
        mb-16
        ${alignment}
        transition-all
        duration-700
      `}
    >
      <p className={`text-sm font-semibold uppercase tracking-[0.35em] ${eyebrowColor}`}>
        {eyebrow}
      </p>

      {showUnderline && (
        <div className={`mt-4 mb-8 h-1 w-16 md:w-20 rounded-full ${underlineClass} ${align === "left" ? "" : "mx-auto"}`} />
      )}

      <h2
        className={`
          text-4xl md:text-5xl lg:text-6xl
          font-bold
          leading-tight
          tracking-tight
          ${titleColor}
          ${align === "left" ? "max-w-3xl" : "mx-auto max-w-4xl"}
        `}
      >
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-6 text-lg md:text-xl leading-9 ${subtitleColor} ${align === "left" ? "max-w-3xl" : "mx-auto max-w-3xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}