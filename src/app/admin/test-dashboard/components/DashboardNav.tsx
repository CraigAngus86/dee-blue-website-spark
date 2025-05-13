"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  DatabaseIcon, 
  CloudIcon, 
  BrushIcon, 
  WebhookIcon, 
  RefreshCwIcon, 
  ZapIcon, 
  HomeIcon, 
  ArrowLeftIcon 
} from 'lucide-react';

// Define the navigation items
const navItems = [
  { 
    href: '/admin/test-dashboard', 
    label: 'Dashboard Overview',
    icon: HomeIcon, 
    exact: true 
  },
  { 
    href: '/admin/test-dashboard/sanity', 
    label: 'Sanity CMS',
    icon: BrushIcon 
  },
  { 
    href: '/admin/test-dashboard/cloudinary', 
    label: 'Cloudinary',
    icon: CloudIcon 
  },
  { 
    href: '/admin/test-dashboard/supabase', 
    label: 'Supabase',
    icon: DatabaseIcon 
  },
  { 
    href: '/admin/test-dashboard/webhooks', 
    label: 'Webhooks',
    icon: WebhookIcon 
  },
  { 
    href: '/admin/test-dashboard/cross-system', 
    label: 'Cross-System',
    icon: RefreshCwIcon 
  },
  { 
    href: '/admin/test-dashboard/performance', 
    label: 'Performance',
    icon: ZapIcon 
  },
];

export default function DashboardNav() {
  const pathname = usePathname();
  
  // Check if the path is active
  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };
  
  return (
    <div className="flex flex-col space-y-1">
      <Link 
        href="/"
        className="flex items-center text-sm py-1.5 px-3 mb-4 rounded text-gray-500 hover:text-black"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to Site
      </Link>
      
      <div className="bg-gray-100 rounded-lg p-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link 
            key={href} 
            href={href}
            className={`flex items-center text-sm py-3 px-3 rounded-md transition-colors ${
              isActive(href, exact) 
                ? 'bg-primary text-white font-medium'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
