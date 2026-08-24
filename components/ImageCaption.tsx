interface ImageCaptionProps {
  title: string;
  caption: string;
}

export default function ImageCaption({
  title,
  caption,
}: ImageCaptionProps) {
  return (
    <div className="mt-4">
      <h4 className="font-semibold text-slate-900">
        {title}
      </h4>

      <p className="mt-1 text-sm text-slate-500">
        {caption}
      </p>
    </div>
  );
}