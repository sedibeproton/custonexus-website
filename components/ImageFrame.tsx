import Image, { ImageProps } from "next/image";

interface ImageFrameProps extends ImageProps {
  variant?: "default" | "floating" | "plain";
  rounded?: "lg" | "xl" | "2xl";
}

export default function ImageFrame({
  variant = "default",
  rounded = "2xl",
  className = "",
  loading = "lazy",
  alt,
  priority = false,
  ...props
}: ImageFrameProps) {
  const radius = {
    lg: "rounded-2xl",
    xl: "rounded-3xl",
    "2xl": "rounded-[36px]",
  }[rounded];

  if (variant === "plain") {
    const imageProps = priority ? { priority } : { loading };

    return (
      <Image
        {...props}
        {...imageProps}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <div className="group relative">

      {variant === "floating" && (
        <div className="absolute -right-6 -bottom-6 h-full w-full rounded-[36px] bg-blue-100" />
      )}

      <div
        className={`
          relative
          overflow-hidden
          ${radius}
          shadow-2xl
        `}
      >
        <Image
          {...props}
          {...(priority ? { priority } : { loading })}
          alt={alt}
          className={`
            h-full
            w-full
            object-cover
            transition-all
            duration-700
            group-hover:scale-105
            ${className}
          `}
        />

        <div className="pointer-events-none absolute inset-0 ring-1 ring-white/20" />

      </div>

    </div>
  );
}