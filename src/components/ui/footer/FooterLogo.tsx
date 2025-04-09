
import React from "react";
import Text from "../../ui/typography/Text";

const FooterLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
        <span className="text-[#00105A] font-bold text-xl">BD</span>
      </div>
      <span className="font-montserrat font-bold text-2xl text-white">
        Banks o' Dee FC
      </span>
    </div>
  );
};

export default FooterLogo;
