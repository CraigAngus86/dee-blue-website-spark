import { AdminCard } from '@/components/ui/admin/AdminCard';
import { FileText, Camera, Users, Trophy } from 'lucide-react';
import Link from 'next/link';

export function QuickActionCards() {
  const quickActions = [
    {
      title: "Update Match Result",
      description: "Today vs Huntly FC",
      icon: Trophy,
      priority: "🔥",
      color: "bg-red-50 border-red-200 hover:bg-red-100",
      href: "/admin/matches",
      status: "URGENT - Match finished",
      statusColor: "bg-red-100 text-red-700",
      urgent: true
    },
    {
      title: "Review Fan Photos", 
      description: "8 photos pending approval",
      icon: Users,
      priority: "🔥",
      color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
      href: "/admin/community",
      status: "8 pending",
      statusColor: "bg-amber-100 text-amber-700",
      urgent: false
    },
    {
      title: "Create News Article",
      description: "Weekly content deadline Monday",
      icon: FileText,
      priority: "⚡",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      href: "/admin/content",
      status: "Due Monday",
      statusColor: "bg-blue-100 text-blue-700",
      urgent: false
    },
    {
      title: "Upload Match Gallery",
      description: "Keith FC away photos ready",
      icon: Camera,
      priority: "⚡",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      href: "/admin/content",
      status: "15 photos",
      statusColor: "bg-green-100 text-green-700",
      urgent: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickActions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Link key={index} href={action.href}>
            <AdminCard className={`${action.color} cursor-pointer hover:shadow-md transition-all duration-200 h-full ${action.urgent ? 'ring-2 ring-red-300' : ''}`}>
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg shadow-sm ${action.urgent ? 'bg-red-100' : 'bg-white'}`}>
                  <Icon size={24} className={action.urgent ? "text-red-600" : "text-[#00105A]"} />
                </div>
                <span className="text-lg">{action.priority}</span>
                {action.urgent && <span className="text-red-600 text-lg animate-pulse">🚨</span>}
              </div>
              <h4 className="font-semibold text-[#00105A] mb-2 m-0">{action.title}</h4>
              <p className="text-sm text-[#6b7280] mb-3 m-0">{action.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded font-medium ${action.statusColor}`}>
                  {action.status}
                </span>
                <div className="text-xs text-[#00105A] font-medium">
                  {action.urgent ? 'Action Required →' : 'Open →'}
                </div>
              </div>
            </AdminCard>
          </Link>
        );
      })}
    </div>
  );
}
