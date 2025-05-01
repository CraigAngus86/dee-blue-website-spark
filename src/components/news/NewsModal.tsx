
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Twitter, Facebook, Linkedin, Mail, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NewsModalProps {
  article: {
    id: string;
    title: string;
    image: string;
    content?: string;
    excerpt?: string;
    category?: string;
    timestamp: string;
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
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  
  if (!article) return null;

  const formatDate = (dateString: string): string => {
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

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim();
  };

  const getArticleUrl = (): string => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/news?article=${article.id}`;
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(article.title);
    const url = encodeURIComponent(getArticleUrl());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(getArticleUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(getArticleUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(article.title);
    const body = encodeURIComponent(`Check out this article from Banks o' Dee: ${article.title}\n\n${getArticleUrl()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getArticleUrl())
      .then(() => {
        setIsCopied(true);
        toast({
          title: "Link Copied!",
          description: "Article link has been copied to clipboard.",
        });
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy link: ', err);
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Could not copy the link to clipboard.",
        });
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-[1000px] max-h-[90vh] overflow-y-auto p-0">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={shareOnTwitter}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-primary hover:text-primary-light hover:bg-gray-200"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on Twitter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={shareOnFacebook}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-primary hover:text-primary-light hover:bg-gray-200"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on Facebook</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={shareOnLinkedIn}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-primary hover:text-primary-light hover:bg-gray-200"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">Share on LinkedIn</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={shareViaEmail}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-primary hover:text-primary-light hover:bg-gray-200"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Share via Email</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share via Email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-primary hover:text-primary-light hover:bg-gray-200"
                  >
                    {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    <span className="sr-only">Copy Link</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isCopied ? "Link Copied!" : "Copy Link"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="relative">
          <div 
            className="absolute inset-0 bg-repeat z-0" 
            style={{ 
              backgroundImage: 'linear-gradient(135deg, rgba(0,16,90,0.95) 25%, rgba(197,231,255,0.3) 25%, rgba(197,231,255,0.3) 50%, rgba(0,16,90,0.95) 50%, rgba(0,16,90,0.95) 75%, rgba(197,231,255,0.3) 75%, rgba(197,231,255,0.3) 100%)',
              backgroundSize: '8px 8px',
              opacity: 0.15
            }}
          ></div>

          <div className="relative aspect-[2/1] w-full">
            <div className="relative w-full h-full">
              <Image
                src={article.image}
                alt={article.title}
                className="object-cover"
                fill
                sizes="100vw"
              />
            </div>
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[#00105A]/90 via-[#00105A]/70 to-[#00105A]/30"
            ></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 font-montserrat">
                {article.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-white/80">
                {article.category && (
                  <Badge variant="secondary" className="text-xs bg-[#C5E7FF] text-[#00105A]">
                    {article.category}
                  </Badge>
                )}
                <span className="text-sm">{formatDate(article.timestamp)}</span>
                {article.author && (
                  <span className="text-sm">By {article.author}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {article.excerpt && (
            <p className="text-lg font-medium text-gray-700 mb-6">
              {article.excerpt}
            </p>
          )}
          
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
