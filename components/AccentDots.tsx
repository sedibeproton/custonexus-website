interface AccentDotsProps {
  className?: string;
}

export default function AccentDots({ className = "" }: AccentDotsProps) {
  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {Array.from({ length: 6 }).map((_, index) => (
        <span
          key={index}
          className="h-2 w-2 rounded-full bg-blue-100/90"
        />
      ))}
    </div>
  );
}
