
import React from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";
import { CardNew } from "@/components/ui/CardNew";
import HoverEffect from "@/components/ui/animations/HoverEffect";

interface Article {
  id: number;
  title: string;
  image: string;
  date?: string;
  excerpt?: string;
}

interface NewsCardProps {
  article: Article;
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

          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h3 className={cn(
              "font-montserrat font-bold text-white mb-2 line-clamp-3",
              isFeatured ? "text-2xl md:text-3xl" : "text-lg"
            )}>
              {article.title}
            </h3>

            {article.date && (
              <span className="text-white/70 text-sm">
                {article.date}
              </span>
            )}
          </div>
        </div>
      </CardNew>
    </HoverEffect>
  );
};

export default NewsCard;
