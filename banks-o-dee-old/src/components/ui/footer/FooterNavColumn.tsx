
import React from "react";
import Heading from "../../ui/typography/Heading";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterNavColumnProps {
  title: string;
  links: FooterLink[];
}

const FooterNavColumn: React.FC<FooterNavColumnProps> = ({ title, links }) => {
  return (
    <div className="space-y-4">
      <Heading level={4} color="white">
        {title}
      </Heading>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a 
              href={link.href}
              className="text-white/80 hover:text-[#C5E7FF] transition-colors text-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNavColumn;
