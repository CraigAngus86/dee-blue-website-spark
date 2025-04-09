
import React from "react";
import Text from "../../ui/typography/Text";
import FooterLogo from "./FooterLogo";
import FooterNewsletter from "./FooterNewsletter";

const FooterInfo: React.FC = () => {
  return (
    <div className="space-y-4">
      <FooterLogo />
      
      <Text color="white" size="small" className="max-w-md">
        Scotland's premier football club based in Aberdeen, established for excellence in football and community involvement.
      </Text>
    </div>
  );
};

export default FooterInfo;
