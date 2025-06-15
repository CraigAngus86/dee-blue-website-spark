import { AdminCard } from '@/components/ui/admin/AdminCard';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function StatusWidgets() {
  const statusItems = [
    {
      title: "Pending Actions",
      count: 6,
      items: ["3 fan photos awaiting review", "2 commercial enquiries (last 7 days)", "1 match result needs updating"],
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      title: "This Week",
      count: 4,
      items: ["2 news articles published", "1 match gallery uploaded", "1 poll created"],
      icon: CheckCircle,
      color: "text-green-500", 
      bgColor: "bg-green-50"
    },
    {
      title: "Upcoming",
      count: 3,
      items: ["Sat: vs Huntly (Home)", "Wed: at Fraserburgh (Away)", "Sponsor renewal due"],
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {statusItems.map((status, index) => {
        const Icon = status.icon;
        return (
          <AdminCard key={index} className={status.bgColor}>
            <div className="flex items-center space-x-3 mb-4">
              <Icon size={20} className={status.color} />
              <h4 className="font-semibold text-[#00105A]">{status.title}</h4>
              <span className={`text-sm font-bold px-2 py-1 rounded-full bg-white ${status.color}`}>
                {status.count}
              </span>
            </div>
            <ul className="space-y-2">
              {status.items.map((item, idx) => (
                <li key={idx} className="text-sm text-[#6b7280] flex items-start">
                  <span className="w-1 h-1 bg-[#6b7280] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </AdminCard>
        );
      })}
    </div>
  );
}
