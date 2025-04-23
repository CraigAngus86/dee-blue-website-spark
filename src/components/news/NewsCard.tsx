
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";
import { Badge } from "@/components/ui/badge";
import { CardNew } from "@/components/ui/CardNew";
import HoverEffect from "@/components/ui/animations/HoverEffect";

interface NewsCardProps {
  image: string;
  title: string;
  category: string;
  date: string;
  excerpt?: string;
  isFeatured?: boolean;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  image,
  title,
  category,
  date,
  excerpt,
  isFeatured = false,
  onClick,
}) => {
  return (
    <HoverEffect effect="lift" className="h-full">
      <CardNew
        className={cn(
          "group cursor-pointer h-full overflow-hidden",
          isFeatured && "md:col-span-2 md:row-span-2"
        )}
        elevation="flat"
        onClick={onClick}
      >
        <div className="relative">
          {/* Image with gradient overlay */}
          <div className="relative">
            <ResponsiveImage
              src={image}
              alt={title}
              aspectRatio="16/9"
              className="w-full transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00105A]/90 via-[#00105A]/50 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <Badge 
              variant="secondary" 
              className="w-fit mb-3 bg-[#C5E7FF] text-[#00105A] uppercase text-xs tracking-wider"
            >
              {category}
            </Badge>

            <h3 className={cn(
              "font-montserrat font-bold text-white mb-2 line-clamp-3",
              isFeatured ? "text-2xl md:text-3xl" : "text-lg"
            )}>
              {title}
            </h3>

            {isFeatured && excerpt && (
              <p className="text-white/80 mb-3 line-clamp-2 hidden md:block">
                {excerpt}
              </p>
            )}

            <span className="text-white/70 text-sm">
              {date}
            </span>
          </div>
        </div>
      </CardNew>
    </HoverEffect>
  );
};

export default NewsCard;
