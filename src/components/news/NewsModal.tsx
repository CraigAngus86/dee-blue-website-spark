
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";

interface NewsModalProps {
  article: {
    id: number;
    title: string;
    image: string;
    content?: string;
    excerpt?: string;
    category?: string;
    date?: string;
    author?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const NewsModal: React.FC<NewsModalProps> = ({
  article,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) => {
  if (!article) return null;

  // Format date to more readable format
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', options);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-[1000px] max-h-[90vh] overflow-y-auto p-0">
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Header with Image and Title */}
        <div className="relative">
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 bg-repeat z-0" 
            style={{ 
              backgroundImage: 'linear-gradient(135deg, rgba(0,16,90,0.95) 25%, rgba(197,231,255,0.3) 25%, rgba(197,231,255,0.3) 50%, rgba(0,16,90,0.95) 50%, rgba(0,16,90,0.95) 75%, rgba(197,231,255,0.3) 75%, rgba(197,231,255,0.3) 100%)',
              backgroundSize: '8px 8px',
              opacity: 0.15
            }}
          ></div>

          {/* Featured Image */}
          <div className="relative aspect-[2/1] w-full">
            <ResponsiveImage
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              aspectRatio="2/1"
              objectFit="cover"
            />
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[#00105A]/90 via-[#00105A]/70 to-[#00105A]/30"
            ></div>

            {/* Title and Metadata Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 font-montserrat">
                {article.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-white/80">
                {article.category && (
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                )}
                <span className="text-sm">{formatDate(article.date)}</span>
                {article.author && (
                  <span className="text-sm">By {article.author}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-6 md:p-8">
          {/* Article excerpt as intro paragraph */}
          {article.excerpt && (
            <p className="text-lg font-medium text-gray-700 mb-6">
              {article.excerpt}
            </p>
          )}
          
          {/* Full article content */}
          {article.content ? (
            <div 
              className="prose prose-lg max-w-none prose-headings:font-montserrat prose-headings:text-primary prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></div>
          ) : (
            <p className="text-gray-500 italic">
              Full article content not available.
            </p>
          )}

          {/* Navigation Between Articles */}
          <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
            <Button
              onClick={onPrevious}
              disabled={!hasPrevious}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Article
            </Button>
            <Button
              onClick={onNext}
              disabled={!hasNext}
              variant="outline"
              className="flex items-center gap-2"
            >
              Next Article
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;
