
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, Upload } from "lucide-react";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";
import { ButtonNew } from "@/components/ui/ButtonNew";
import Text from "@/components/ui/typography/Text";
import Heading from "@/components/ui/typography/Heading";
import { userGeneratedContent } from "@/mock-data/fanContentData";

interface UserContentShowcaseProps {
  className?: string;
  maxItems?: number;
}

const UserContentShowcase: React.FC<UserContentShowcaseProps> = ({ 
  className,
  maxItems = 5 // Display 5 items by default
}) => {
  const [isUploading, setIsUploading] = useState(false);
  
  // Limit the number of items to display
  const displayedContent = userGeneratedContent.slice(0, maxItems);
  
  const handleUploadClick = () => {
    // In a real implementation, this would open a file picker
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };
  
  return (
    <div className={cn("", className)}>
      <Heading level={3} className="mb-4">Fan Gallery</Heading>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {displayedContent.map((item) => (
          <div 
            key={item.id}
            className="relative aspect-square rounded-lg overflow-hidden group"
          >
            <ResponsiveImage
              src={item.image}
              alt={`Photo by ${item.user}`}
              aspectRatio="1/1"
              className="w-full h-full"
              objectFit="cover"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <Text size="small" weight="semibold" color="white">{item.user}</Text>
              <Text size="xs" color="white">{item.date}</Text>
            </div>
          </div>
        ))}
        
        {/* Upload CTA Card */}
        <div className="aspect-square rounded-lg overflow-hidden bg-light-gray/70 border-2 border-dashed border-medium-gray flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-secondary/50 p-3 rounded-full mb-3">
            <Camera size={24} className="text-primary" />
          </div>
          <Heading level={5} className="mb-1">Share Your Matchday</Heading>
          <Text size="small" color="muted" className="mb-4">
            Upload your photos and be featured on our website
          </Text>
          <ButtonNew 
            variant="secondary" 
            size="sm"
            onClick={handleUploadClick}
            iconLeft={<Upload size={16} />}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Photo"}
          </ButtonNew>
        </div>
      </div>
    </div>
  );
};

export default UserContentShowcase;
