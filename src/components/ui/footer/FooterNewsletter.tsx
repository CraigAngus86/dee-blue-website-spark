
import React from "react";
import Text from "../../ui/typography/Text";
import Heading from "../../ui/typography/Heading";
import { ButtonNew } from "../../ui/ButtonNew";
import { Input } from "../../ui/input";

const FooterNewsletter: React.FC = () => {
  return (
    <div className="space-y-4">
      <Heading level={4} color="white">
        Newsletter
      </Heading>
      <Text color="white" size="small">
        Subscribe to get the latest news and updates
      </Text>
      <div className="flex gap-2">
        <Input 
          placeholder="Your email" 
          type="email"
          className="bg-white/10 text-white border-white/20 placeholder:text-white/50 focus:border-[#FFD700]"
        />
        <ButtonNew variant="accent">
          Subscribe
        </ButtonNew>
      </div>
    </div>
  );
};

export default FooterNewsletter;
