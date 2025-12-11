import { cn } from "@/lib/utils";
import React from "react";

export interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  avatar?: string;
}

interface FeaturesSectionProps {
  features: FeatureItem[];
  className?: string;
}

export function FeaturesSectionWithHoverEffects({ features, className }: FeaturesSectionProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10 py-10 max-w-6xl mx-auto", className)}>
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "relative group/feature rounded-2xl p-6 md:p-8",
        "bg-[rgba(15,25,30,0.55)] backdrop-blur-xl backdrop-saturate-[160%]",
        "border border-white/[0.08]",
        "shadow-[0_4px_15px_rgba(0,0,0,0.25)]",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(0,255,200,0.12)] hover:border-[rgba(0,255,200,0.25)]"
      )}
    >
      {/* Subtle glow overlay on hover */}
      <div className="opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300 absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Icon */}
      <div className="mb-5 relative z-10 text-muted-foreground group-hover/feature:text-primary transition-colors duration-300">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-semibold mb-3 relative z-10 text-foreground">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
        {description}
      </p>
    </div>
  );
};
