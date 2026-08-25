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
      rounded-[2rem]
      border
      border-slate-200
      bg-white
      p-8
      shadow-[0_12px_40px_rgba(15,48,105,0.07)]
      transition-all
      duration-500
      hover:-translate-y-1
      hover:border-blue-200
      hover:shadow-[0_22px_55px_rgba(15,48,105,0.13)]
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
