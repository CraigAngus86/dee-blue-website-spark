import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";
import { CardNew } from "@/components/ui/CardNew";
import HoverEffect from "@/components/ui/animations/HoverEffect";

interface NewsCardProps {
  article: {
    image: string;
    title: string;
    category: string;
    timestamp: string;
    excerpt?: string;
    url?: string;
    hasLogo?: boolean;
    logoOverlayText?: string;
  };
  isFeatured?: boolean;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  isFeatured = false,
  onClick,
}) => {
  return (
    <HoverEffect effect="lift" className="h-full">
      <CardNew
        className="group cursor-pointer h-full flex flex-col overflow-hidden"
        elevation="flat"
        onClick={onClick}
      >
        <div className="relative flex-grow flex flex-col">
          <div className={cn(
            "relative flex-grow",
            isFeatured ? "aspect-[2/1]" : "aspect-square"
          )}>
            <ResponsiveImage
              src={article.image}
              alt={article.title}
              className="w-full h-full transform transition-transform duration-500 group-hover:scale-105"
              aspectRatio={isFeatured ? "2/1" : "1/1"}
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/90 via-[#00105A]/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-col p-4 md:p-5 flex-grow">
            {/* Title */}
            <h3 className="font-montserrat font-bold text-xl leading-tight text-primary mb-2.5 line-clamp-2">
              {article.title}
            </h3>

            {/* Excerpt - only show if provided */}
            {article.excerpt && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                {article.excerpt}
              </p>
            )}

            {/* Footer - Date and Read More */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
              <span className="text-gray-500 text-xs">
                {article.timestamp}
              </span>
              <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:text-primary-light transition-colors">
                Read More
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </CardNew>
    </HoverEffect>
  );
};

export default NewsCard;
