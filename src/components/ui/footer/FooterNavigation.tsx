
import React from "react";
import FooterNavColumn from "./FooterNavColumn";

const FooterNavigation: React.FC = () => {
  // Simplified footer navigation to 3 columns
  const footerNavigation = [
    {
      title: "Club",
      links: [
        { label: "About Us", href: "/about" },
        { label: "First Team", href: "/team" },
        { label: "Stadium", href: "/stadium" },
        { label: "History", href: "/history" },
        { label: "Youth Academy", href: "/academy" },
      ],
    },
    {
      title: "Fans",
      links: [
        { label: "Tickets", href: "/tickets" },
        { label: "Membership", href: "/membership" },
        { label: "Online Store", href: "/store" },
        { label: "Fixtures", href: "/fixtures" },
        { label: "News", href: "/news" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
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
