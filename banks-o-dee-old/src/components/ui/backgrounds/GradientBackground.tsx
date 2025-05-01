
import React from "react";

type GradientBackgroundProps = {
  variant?: "primary" | "secondary" | "accent" | "subtle";
  children: React.ReactNode;
  className?: string;
  withPattern?: boolean;
  patternOpacity?: number;
};

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = "primary",
  children,
  className = "",
  withPattern = false,
  patternOpacity = 0.05,
}) => {
  // Define gradients using the established color palette directly
  const gradientMap = {
    primary: "bg-gradient-to-br from-[#00105A] to-[#000D42]",
    secondary: "bg-gradient-to-br from-[#C5E7FF] to-[#FFFFFF]",
    accent: "bg-gradient-to-br from-[#FFD700] to-[#FFE866]",
    subtle: "bg-gradient-to-br from-[#F8FBFF] to-[#E8F4FF]",
  };

  // Text colors for different backgrounds to ensure readability
  const textColorMap = {
    primary: "text-white",
    secondary: "text-[#00105A]",
    accent: "text-[#00105A]",
    subtle: "text-[#00105A]",
  };

  return (
    <div className={`relative overflow-hidden ${className} ${gradientMap[variant]} ${textColorMap[variant]}`}>
      {withPattern && (
        <div 
          className="absolute inset-0"
          style={{ 
            opacity: patternOpacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientBackground;
