
import React from "react";
import { cn } from "@/lib/utils";

interface MainHeroProps {
  backgroundSrc: string;
  backgroundAlt?: string;
  overlayColor?: "primary" | "dark" | "gradient";
  overlayOpacity?: "light" | "medium" | "heavy";
  contentPosition?: "center" | "left" | "right";
  children: React.ReactNode;
  className?: string;
}

const MainHero: React.FC<MainHeroProps> = ({
  backgroundSrc,
  backgroundAlt = "",
  overlayColor = "primary",
  overlayOpacity = "medium",
  contentPosition = "center",
  children,
  className,
}) => {
  // Define overlay color styles
  const overlayColors = {
    primary: "from-primary",
    dark: "from-black",
    gradient: "from-primary to-primary-light",
  };

  // Define overlay opacity styles
  const overlayOpacities = {
    light: "bg-opacity-30",
    medium: "bg-opacity-50",
    heavy: "bg-opacity-70",
  };

  // Define content positioning styles
  const contentPositions = {
    center: "items-center text-center",
    left: "items-start text-left",
    right: "items-end text-right",
  };

  // Calculate gradient direction based on content position
  const gradientDirection = 
    contentPosition === "right" ? "to-r" : 
    contentPosition === "left" ? "to-l" : 
    "to-t";

  return (
    <div className={cn("relative h-screen max-h-[800px] min-h-[500px] w-full overflow-hidden", className)}>
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backgroundSrc}
          alt={backgroundAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to",
          gradientDirection,
          overlayColors[overlayColor],
          overlayOpacities[overlayOpacity]
        )}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-4 sm:px-8 lg:px-12">
        <div className={cn("flex flex-col max-w-3xl mx-auto gap-6", contentPositions[contentPosition])}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainHero;
