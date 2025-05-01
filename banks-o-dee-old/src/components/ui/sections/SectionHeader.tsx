
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  viewAllText?: string;
  className?: string;
  textColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  viewAllLink,
  viewAllText = "View All",
  className,
  textColor = "primary",
}) => {
  return (
    <div className={cn("flex flex-wrap justify-between items-center mb-8", className)}>
      <div className="flex flex-col relative">
        <h2 className={`text-2xl font-montserrat font-bold text-${textColor}`}>
          {title}
        </h2>
      </div>
      
      {viewAllLink && (
        <a
          href={viewAllLink}
          className={`text-${textColor} font-semibold hover:text-${textColor}-light flex items-center transition-colors group`}
        >
          {viewAllText}
          <ArrowRight
            size={16}
            className="ml-1 group-hover:translate-x-1 transition-transform"
          />
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
