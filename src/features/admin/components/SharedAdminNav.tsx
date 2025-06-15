"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  FileText, 
  Trophy, 
  Users2, 
  Building2, 
  UserCheck, 
  Image,
  Settings
} from 'lucide-react';

interface NavItem {
  id: string;
  name: string;
  icon: any;
  href: string;
  enabled: boolean;
  priority?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, href: '/admin', enabled: true },
  { id: 'content', name: 'Content Management', icon: FileText, href: '/admin/content', enabled: true, priority: '🔥' },
  { id: 'matches', name: 'Match Operations', icon: Trophy, href: '/admin/matches', enabled: true, priority: '🔥' },
  { id: 'community', name: 'Community Management', icon: Users2, href: '/admin/community', enabled: true, priority: '🔥' },
  { id: 'commercial', name: 'Commercial Management', icon: Building2, href: '/admin/commercial', enabled: true, priority: '⚡' },
  { id: 'team', name: 'Team Management', icon: UserCheck, href: '/admin/team', enabled: true, priority: '📅' },
  { id: 'media', name: 'Media Management', icon: Image, href: '/admin/media', enabled: true, priority: '📅' },
  { id: 'technical', name: 'Technical Implementation', icon: Settings, href: '/admin/technical', enabled: true }
];

export function SharedAdminNav() {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <nav className="w-64 bg-white border-r border-[#e5e7eb]">
      <div className="px-4 py-4 border-b border-[#e5e7eb]">
        <h2 className="text-xl font-bold text-[#00105A] m-0">Banks o' Dee Admin</h2>
        <p className="text-sm text-[#6b7280] m-0">Content Management System</p>
      </div>
      
      <div className="py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <div key={item.id} className="px-4 py-1">
              {item.enabled ? (
                <Link
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#C5E7FF] text-[#00105A]' 
                      : 'text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#00105A]'
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1">{item.name}</span>
                  {item.priority && (
                    <span className="text-xs">{item.priority}</span>
                  )}
                </Link>
              ) : (
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-[#9ca3af] cursor-not-allowed">
                  <Icon size={18} />
                  <span className="flex-1">{item.name}</span>
                  <span className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-0.5 rounded">Soon</span>
                  {item.priority && (
                    <span className="text-xs">{item.priority}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
