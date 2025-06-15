import { AdminCard } from '@/components/ui/admin/AdminCard';
import { FileText, Camera, Users, Trophy } from 'lucide-react';

export function QuickActionCards() {
  const quickActions = [
    {
      title: "Create News Article",
      description: "Twice weekly minimum",
      icon: FileText,
      priority: "🔥",
      color: "bg-red-50 border-red-200",
      disabled: true
    },
    {
      title: "Update Match Result", 
      description: "Every Saturday + midweek",
      icon: Trophy,
      priority: "🔥",
      color: "bg-red-50 border-red-200",
      disabled: true
    },
    {
      title: "Review Fan Photos",
      description: "Ongoing submissions",
      icon: Users,
      priority: "🔥", 
      color: "bg-red-50 border-red-200",
      disabled: true
    },
    {
      title: "Upload Match Gallery",
      description: "After every home match",
      icon: Camera,
      priority: "⚡",
      color: "bg-amber-50 border-amber-200",
      disabled: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickActions.map((action, index) => {
        const Icon = action.icon;
        return (
          <AdminCard key={index} className={`${action.color} cursor-pointer hover:shadow-md transition-shadow ${action.disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-white rounded-lg">
                <Icon size={24} className="text-[#00105A]" />
              </div>
              <span className="text-lg">{action.priority}</span>
            </div>
            <h4 className="font-semibold text-[#00105A] mb-2">{action.title}</h4>
            <p className="text-sm text-[#6b7280] mb-3">{action.description}</p>
            {action.disabled && (
              <div>
                <span className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</span>
              </div>
            )}
          </AdminCard>
        );
      })}
    </div>
  );
}
