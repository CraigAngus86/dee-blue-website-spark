
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  viewAllText?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  viewAllLink,
  viewAllText = "View All",
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap justify-between items-center mb-8", className)}>
      <div className="flex flex-col">
        <h2 className="text-2xl font-montserrat font-bold text-primary">
          {title}
        </h2>
        <div className="h-0.5 w-10 bg-accent mt-2"></div>
      </div>
      
      {viewAllLink && (
        <a
          href={viewAllLink}
          className="text-primary font-semibold hover:text-primary-light flex items-center transition-colors group"
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
