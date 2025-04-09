
import React from "react";
import Text from "../../ui/typography/Text";
import FooterLogo from "./FooterLogo";
import FooterNewsletter from "./FooterNewsletter";

const FooterInfo: React.FC = () => {
  return (
    <div className="lg:col-span-5 space-y-6">
      <FooterLogo />
      
      <Text color="white" size="small" className="max-w-md">
        Scotland's premier football club based in Aberdeen. Established for excellence in football and community involvement since our foundation.
      </Text>
      
      <FooterNewsletter />
    </div>
  );
};

export default FooterInfo;
