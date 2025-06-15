import { SharedAdminNav } from './SharedAdminNav';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { QuickActionCards } from './dashboard/QuickActionCards';
import { StatusWidgets } from './dashboard/StatusWidgets';
import { GOD_CONTENT } from '../utils/god-document-content';

export function AdminDashboard() {
  return (
    <div className="flex">
      <SharedAdminNav />
      
      <div className="flex-1">
        <header className="bg-white border-b border-[#e5e7eb] px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#00105A] mb-2 m-0">Dashboard</h1>
              <p className="text-[#6b7280] m-0">Welcome to the Banks o' Dee Content Management System</p>
            </div>
            <div className="text-sm text-[#6b7280]">
              <span className="font-medium">Implementation Progress:</span> Phase 1 - Foundation Complete
            </div>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {/* Executive Summary */}
          <AdminCard title="System Overview">
            <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
              <p className="text-[#6b7280] mb-4 m-0">{GOD_CONTENT.executiveSummary.purpose}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {GOD_CONTENT.executiveSummary.businessValue.map((value, index) => (
                  <div key={index} className="text-center">
                    <div className="font-medium text-[#00105A]">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold text-[#00105A] mb-4 m-0">Quick Actions</h2>
            <QuickActionCards />
          </div>

          {/* Status Overview */}
          <div>
            <h2 className="text-xl font-semibold text-[#00105A] mb-4 m-0">Status Overview</h2>
            <StatusWidgets />
          </div>

          {/* Implementation Roadmap */}
          <AdminCard title="Implementation Roadmap">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-red-600 mb-3 m-0">🔥 High Priority (Build First)</h4>
                <ul className="space-y-2">
                  {GOD_CONTENT.highFrequency.map((item, index) => (
                    <li key={index} className="text-sm text-[#6b7280]">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs">{item.frequency}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-600 mb-3 m-0">⚡ Medium Priority (Build Second)</h4>
                <ul className="space-y-2">
                  {GOD_CONTENT.mediumFrequency.map((item, index) => (
                    <li key={index} className="text-sm text-[#6b7280]">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs">{item.frequency}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-3 m-0">📅 Low Priority (Build Third)</h4>
                <ul className="space-y-2">
                  {GOD_CONTENT.lowFrequency.slice(0, 3).map((item, index) => (
                    <li key={index} className="text-sm text-[#6b7280]">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs">{item.frequency}</div>
                    </li>
                  ))}
                  <li className="text-xs text-[#9ca3af]">+ 2 more items...</li>
                </ul>
              </div>
            </div>
          </AdminCard>
        </main>
      </div>
    </div>
  );
}
