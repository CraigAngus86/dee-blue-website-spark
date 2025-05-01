
import React from "react";

type DiagonalSeparatorProps = {
  position?: "top" | "bottom";
  color?: "primary" | "secondary" | "accent" | "white";
  height?: "sm" | "md" | "lg";
  angle?: "gentle" | "medium" | "steep";
  className?: string;
};

const DiagonalSeparator: React.FC<DiagonalSeparatorProps> = ({
  position = "bottom",
  color = "primary",
  height = "md",
  angle = "medium",
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

  // Generate different paths based on angle and position
  const getPath = () => {
    // Different coordinates based on angle steepness
    const points = {
      gentle: position === "bottom" ? "0,0 0,100 100,100" : "0,0 100,0 100,100",
      medium: position === "bottom" ? "0,0 0,100 100,100" : "0,0 100,0 0,100",
      steep: position === "bottom" ? "0,30 0,100 100,100" : "0,0 100,0 0,70",
    };
    
    return points[angle];
  };

  return (
    <div 
      className={`w-full overflow-hidden ${className}`} 
      style={{ height: heightMap[height] }}
    >
      <svg
        viewBox="0 0 100 100"
        fill={colorMap[color]}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <polygon points={getPath()} />
      </svg>
    </div>
  );
};

export default DiagonalSeparator;
