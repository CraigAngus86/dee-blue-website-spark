
import React from "react";
import { cn } from "@/lib/utils";
import ClubLogo from "../image/ClubLogo";

interface GradientSeparatorProps {
  className?: string;
}

const GradientSeparator: React.FC<GradientSeparatorProps> = ({ className }) => {
  return (
    <div className={cn("py-10 relative flex justify-center items-center", className)}>
      {/* Gradient bar */}
      <div className="w-full h-2 md:h-[8px] bg-gradient-to-r from-primary to-secondary"></div>
      
      {/* Centered club badge */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-center w-[60px] h-[60px] bg-white rounded-full shadow-md">
          <ClubLogo 
            variant="circle" 
            background="dark" 
            size="md" 
            className="w-[40px] h-[40px]" 
          />
        </div>
      </div>
    </div>
  );
};

export default GradientSeparator;
