import { ReactNode } from "react";
import IconCircle from "@/components/IconCircle";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="
      group
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-sm
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-blue-200
      hover:shadow-xl
    ">

      <div className="mb-6 transition-transform duration-500 group-hover:scale-110">
        <IconCircle>{icon}</IconCircle>
      </div>

      <h3 className="text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-8 text-slate-600">
        {description}
      </p>

    </div>
  );
}