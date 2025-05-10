"use client";

import React from "react";

type HoverEffectProps = {
  effect: "scale" | "glow" | "lift" | "underline";
  children: React.ReactNode;
  className?: string;
  duration?: "fast" | "normal" | "slow";
};

const HoverEffect: React.FC<HoverEffectProps> = ({
  effect,
  children,
  className = "",
  duration = "normal",
}) => {
  // Duration values in milliseconds
  const durationMap = {
    fast: "duration-200",
    normal: "duration-300",
    slow: "duration-500",
  };

  // Effect classes based on the effect type
  const effectClasses = {
    scale: `transform transition-transform ${durationMap[duration]} hover:scale-[1.02]`,
    glow: `transition-shadow ${durationMap[duration]} hover:shadow-lg`,
    lift: `transform transition-all ${durationMap[duration]} hover:-translate-y-1 hover:shadow-md`,
    underline: `relative transition-colors ${durationMap[duration]} after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-current hover:after:w-full after:transition-all after:${durationMap[duration]}`,
  };

  return (
    <div className={`${effectClasses[effect]} ${className}`}>
      {children}
    </div>
  );
};

export default HoverEffect;
