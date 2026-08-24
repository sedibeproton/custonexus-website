interface QuoteBlockProps {
  quote: string;
  author: string;
  role?: string;
}

export default function QuoteBlock({
  quote,
  author,
  role,
}: QuoteBlockProps) {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-4xl px-8 text-center">

        <p className="text-4xl leading-relaxed font-light italic text-slate-700">
          “{quote}”
        </p>

        <div className="mt-10">

          <h3 className="text-xl font-bold text-slate-900">
            {author}
          </h3>

          {role && (
            <p className="mt-2 text-slate-500">
              {role}
            </p>
          )}

        </div>

      </div>

    </section>
  );
}