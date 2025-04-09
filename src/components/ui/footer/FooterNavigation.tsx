
import React from "react";
import FooterNavColumn from "./FooterNavColumn";

const FooterNavigation: React.FC = () => {
  // Simplified footer navigation to 3 columns
  const footerNavigation = [
    {
      title: "Club Information",
      links: [
        { label: "About Us", href: "/about" },
        { label: "History", href: "/history" },
        { label: "Stadium", href: "/stadium" },
        { label: "First Team", href: "/team" },
        { label: "Youth Academy", href: "/academy" },
      ],
    },
    {
      title: "Fans & Tickets",
      links: [
        { label: "Tickets", href: "/tickets" },
        { label: "Membership", href: "/membership" },
        { label: "Online Store", href: "/store" },
        { label: "Community", href: "/community" },
        { label: "Photo Gallery", href: "/gallery" },
      ],
    },
    {
      title: "Contact & Social",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Partners", href: "/partners" },
        { label: "Media Enquiries", href: "/media" },
        { label: "Join Our Team", href: "/careers" },
        { label: "Directions", href: "/visit" },
      ],
    },
  ];

  return (
    <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
      {footerNavigation.map((section) => (
        <FooterNavColumn 
          key={section.title} 
          title={section.title} 
          links={section.links} 
        />
      ))}
    </div>
  );
};

export default FooterNavigation;
