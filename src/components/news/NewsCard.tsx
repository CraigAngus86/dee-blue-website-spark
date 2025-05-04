"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCloudinaryImage } from "@/hooks/useCloudinaryImage";

export interface NewsCardProps {
  id?: string;
  title: string;
  date: string;
  imageUrl?: string;
  category?: string;
  excerpt?: string;
  slug?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  date,
  imageUrl,
  category = "News",
  excerpt,
  slug,
}) => {
  // Format date for display
  const formattedDate = React.useMemo(() => {
    try {
      return format(new Date(date), 'MMMM d, yyyy');
    } catch (error) {
      return date;
    }
  }, [date]);

  const { imageUrl: optimizedImageUrl } = useCloudinaryImage(
    imageUrl || null,
    {
      width: 600,
      height: 400,
      crop: "fill",
    }
  );

  const newsUrl = slug ? `/news/${slug}` : (id ? `/news/${id}` : "#");

  return (
    <Link href={newsUrl} passHref>
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
          {imageUrl ? (
            <Image
              src={optimizedImageUrl || imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="bg-slate-200 h-full w-full flex items-center justify-center">
              <span className="text-slate-400">No image</span>
            </div>
          )}
          
          {category && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                {category}
              </span>
            </div>
          )}
        </div>
        
        <CardContent className="flex-grow flex flex-col pt-4">
          <h3 className="font-bold text-lg line-clamp-2 mb-2">{title}</h3>
          
          {excerpt && (
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
              {excerpt}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="pt-0 pb-4 text-sm text-gray-500">
          {formattedDate}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default NewsCard;
