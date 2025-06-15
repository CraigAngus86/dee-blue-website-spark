import { AdminCard } from '@/components/ui/admin/AdminCard';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function StatusWidgets() {
  const statusItems = [
    {
      title: "Pending Review",
      count: 11,
      items: [
        "8 fan photos awaiting approval",
        "2 commercial enquiries (time sensitive)",
        "1 match result needs updating"
      ],
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Recently Completed",
      count: 6,
      items: [
        "News article: Match preview published",
        "Fan photo from @BanksODeeFan87 approved",
        "League table updated (BBC scraper)",
        "Commercial enquiry responded to"
      ],
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "This Week's Schedule",
      count: 4,
      items: [
        "Monday: Weekly news article due",
        "Wednesday: Away vs Fraserburgh (7:45pm)",
        "Friday: Fan of the Month selection",
        "Saturday: Home vs Inverurie Loco"
      ],
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
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
              <h4 className="font-semibold text-[#00105A] m-0">{status.title}</h4>
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
            
            {/* Action button for pending items */}
            {index === 0 && (
              <div className="mt-4">
                <button className="w-full px-3 py-2 bg-amber-100 text-amber-700 rounded text-sm font-medium hover:bg-amber-200">
                  Review All Pending →
                </button>
              </div>
            )}
            
            {/* View more button for completed items */}
            {index === 1 && (
              <div className="mt-4">
                <button className="w-full px-3 py-2 bg-green-100 text-green-700 rounded text-sm font-medium hover:bg-green-200">
                  View Activity Log →
                </button>
              </div>
            )}
            
            {/* Calendar view for schedule */}
            {index === 2 && (
              <div className="mt-4">
                <button className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">
                  View Full Calendar →
                </button>
              </div>
            )}
          </AdminCard>
        );
      })}
    </div>
  );
}
