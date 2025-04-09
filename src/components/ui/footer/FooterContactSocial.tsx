
import React from "react";
import FooterContact from "./FooterContact";
import FooterSocial from "./FooterSocial";

const FooterContactSocial: React.FC = () => {
  return (
    <div className="lg:col-span-3 space-y-6">
      <FooterContact />
      <FooterSocial />
    </div>
  );
};

export default FooterContactSocial;
