
import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";

const SocialCTA: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center mb-8">
      <h3 className="text-xl md:text-2xl font-montserrat font-bold text-primary mb-2">
        Join the conversation with #BanksODeeFC
      </h3>
      <p className="text-dark-gray mb-6">
        Follow us <span className="font-medium text-primary">@BanksODeeFC</span> on social media
      </p>
      <div className="flex space-x-4">
        <SocialButton 
          platform="Twitter"
          icon={<Twitter size={20} />}
          href="https://twitter.com/BanksODeeFC"
        />
        <SocialButton 
          platform="Facebook"
          icon={<Facebook size={20} />}
          href="https://facebook.com/BanksODeeFC"
        />
        <SocialButton 
          platform="Instagram"
          icon={<Instagram size={20} />}
          href="https://instagram.com/BanksODeeFC"
        />
      </div>
    </div>
  );
};

interface SocialButtonProps {
  platform: string;
  icon: React.ReactNode;
  href: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ platform, icon, href }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-light-gray text-primary hover:bg-primary hover:text-white transition-colors duration-300 transform hover:scale-110"
      aria-label={`Follow on ${platform}`}
    >
      {icon}
    </a>
  );
};

export default SocialCTA;
