
import React from "react";

type WaveSeparatorProps = {
  position?: "top" | "bottom";
  color?: "primary" | "secondary" | "accent" | "white";
  height?: "sm" | "md" | "lg";
  className?: string;
};

const WaveSeparator: React.FC<WaveSeparatorProps> = ({
  position = "bottom",
  color = "primary",
  height = "md",
  className = "",
}) => {
  // Map color props to actual hex values to avoid touching global styles
  const colorMap = {
    primary: "#00105A",
    secondary: "#C5E7FF",
    accent: "#FFD700",
    white: "#FFFFFF",
  };

  // Map height props to actual pixel values
  const heightMap = {
    sm: "40px",
    md: "60px",
    lg: "80px",
  };

  // Generate different wave paths for top and bottom positions
  const wavePath = position === "bottom" 
    ? "M0 0C0 0 563 95 720 95C877 95 1440 0 1440 0V100H0V0Z"
    : "M0 100C0 100 563 5 720 5C877 5 1440 100 1440 100V0H0V100Z";

  return (
    <div 
      className={`w-full overflow-hidden ${className}`} 
      style={{ height: heightMap[height] }}
    >
      <svg
        viewBox="0 0 1440 100"
        fill={colorMap[color]}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path d={wavePath} />
      </svg>
    </div>
  );
};

export default WaveSeparator;
