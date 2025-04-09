
import React from "react";
import { Twitter, Facebook, Instagram, Heart, MessageSquare, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Mock data for social posts
const socialPosts = [
  {
    id: 1,
    platform: "twitter",
    content: "What a victory for Banks o' Dee FC today! The team showed incredible spirit and determination. Thanks to all the fans who came out to support us! #BanksODeeFC #Victory",
    date: new Date(2025, 3, 5), // April 5, 2025
    likes: 48,
    comments: 12,
    shares: 8,
    image: "/assets/images/matchday/MatchDay1.jpg"
  },
  {
    id: 2,
    platform: "facebook",
    content: "New merchandise has arrived at the club shop! Come check out the latest gear and show your support for Banks o' Dee FC. Open Monday-Friday 10am-4pm and match days.",
    date: new Date(2025, 3, 6), // April 6, 2025
    likes: 86,
    comments: 24,
    shares: 15,
    image: null
  },
  {
    id: 3,
    platform: "instagram",
    content: "Match day preparations! Getting everything ready for tomorrow's big game. #GameDay #BanksODeeFC",
    date: new Date(2025, 3, 7), // April 7, 2025
    likes: 132,
    comments: 18,
    shares: 5,
    image: "/assets/images/team/Training1_Square.jpg"
  },
  {
    id: 4,
    platform: "twitter",
    content: "Congratulations to Jamie Smith on being named Player of the Month! His outstanding performances have been key to our recent successes. #POTM #BanksODeeFC",
    date: new Date(2025, 3, 8), // April 8, 2025
    likes: 64,
    comments: 9,
    shares: 11,
    image: "/assets/images/team/Training2_Square.jpg"
  },
  {
    id: 5,
    platform: "facebook",
    content: "Youth team trials taking place next Saturday at 10am. Looking for talented players aged 14-16 who want to develop their skills with Banks o' Dee FC! Contact coach Mike for details.",
    date: new Date(2025, 3, 8), // April 8, 2025
    likes: 52,
    comments: 28,
    shares: 38,
    image: null
  },
  {
    id: 6,
    platform: "instagram",
    content: "Beautiful day at Spain Park! Weather looking perfect for this weekend's fixture. #SpainPark #BanksODeeFC #MatchDay",
    date: new Date(2025, 3, 9), // April 9, 2025
    likes: 95,
    comments: 7,
    shares: 3,
    image: "/assets/images/stadium/Spain Park.jpg"
  }
];

interface SocialPostCardProps {
  platform: "twitter" | "facebook" | "instagram";
  content: string;
  date: Date;
  likes: number;
  comments: number;
  shares: number;
  image: string | null;
}

const SocialPostCard: React.FC<SocialPostCardProps> = ({
  platform,
  content,
  date,
  likes,
  comments,
  shares,
  image
}) => {
  // Map platform to icon and color
  const platformConfig = {
    twitter: {
      icon: <Twitter size={16} />,
      color: "bg-blue-400",
      hoverBorder: "hover:border-blue-400"
    },
    facebook: {
      icon: <Facebook size={16} />,
      color: "bg-blue-600",
      hoverBorder: "hover:border-blue-600"
    },
    instagram: {
      icon: <Instagram size={16} />,
      color: "bg-pink-500",
      hoverBorder: "hover:border-pink-500"
    }
  };
  
  const config = platformConfig[platform];
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 ${config.hoverBorder} transition-all hover:shadow-lg`}>
      <div className="p-4">
        {/* Platform and date */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className={`w-6 h-6 rounded-full ${config.color} flex items-center justify-center text-white mr-2`}>
              {config.icon}
            </span>
            <span className="text-sm font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
          </div>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(date, { addSuffix: true })}
          </span>
        </div>
        
        {/* Content */}
        <p className="text-sm line-clamp-3 mb-3 text-near-black">
          {content}
        </p>
        
        {/* Image if present */}
        {image && (
          <div className="aspect-square mb-3 overflow-hidden rounded">
            <img 
              src={image} 
              alt="Social media post" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        {/* Engagement metrics */}
        <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <Heart size={14} className="mr-1" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={14} className="mr-1" />
            <span>{comments}</span>
          </div>
          <div className="flex items-center">
            <Share2 size={14} className="mr-1" />
            <span>{shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialFeedGrid: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialPosts.map(post => (
          <SocialPostCard 
            key={post.id}
            platform={post.platform as "twitter" | "facebook" | "instagram"}
            content={post.content}
            date={post.date}
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialFeedGrid;
