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
      rounded-[1.75rem]
      border
      border-slate-200
      bg-white
      p-6 sm:p-8
      shadow-[0_12px_40px_rgba(15,48,105,0.07)]
      transition-all
      duration-500
      hover:-translate-y-1.5
      hover:border-blue-200
      hover:shadow-[0_22px_55px_rgba(15,48,105,0.13)]
    ">

      <div className="mb-5 origin-left transition-transform duration-500 group-hover:scale-105">
        <IconCircle>{icon}</IconCircle>
      </div>

      <h3 className="text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600 sm:leading-8">
        {description}
      </p>

    </div>
  );
}
