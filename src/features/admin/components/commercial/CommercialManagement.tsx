import { SharedAdminNav } from '../SharedAdminNav';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { Mail, Building2, MessageSquare } from 'lucide-react';

export function CommercialManagement() {
  return (
    <div className="flex bg-[#f9fafb] min-h-screen">
      <SharedAdminNav />
      
      <div className="flex-1">
        <header className="bg-white border-b border-[#e5e7eb] px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#00105A] mb-2 m-0">Commercial Management</h1>
              <p className="text-[#6b7280] m-0">Manage business enquiries, sponsors, and commercial opportunities</p>
            </div>
            <div className="text-sm text-[#6b7280]">
              <span className="font-medium">Priority:</span> ⚡ Revenue-Critical Functions
            </div>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminCard className="bg-amber-50 border-amber-200">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="text-amber-600" size={24} />
                <span className="text-lg">⚡</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Business Enquiries</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Sporadic but time-sensitive</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>

            <AdminCard className="bg-green-50 border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="text-green-600" size={24} />
                <span className="text-lg">📅</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Sponsor Management</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Contract renewals, new partnerships</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>

            <AdminCard className="bg-green-50 border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="text-green-600" size={24} />
                <span className="text-lg">📅</span>
              </div>
              <h3 className="font-semibold text-[#00105A] mb-2 m-0">Testimonials</h3>
              <p className="text-sm text-[#6b7280] mb-3 m-0">Partner testimonials & success stories</p>
              <div className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-1 rounded">Coming Soon</div>
            </AdminCard>
          </div>

          {/* Enquiry Manager Wireframe */}
          <AdminCard title="📧 Business Enquiry Manager (⚡ Medium Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">Enquiry Workflow Management:</h4>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• <strong>Status tracking:</strong> pending → in_progress → proposal_sent → closed</li>
                  <li>• <strong>Sources:</strong> Spain Park and Commercial page submissions</li>
                  <li>• <strong>Priority levels:</strong> High Priority, Medium Priority, Standard</li>
                  <li>• <strong>Team assignment:</strong> Commercial team member handling enquiry</li>
                  <li>• <strong>Email integration:</strong> Automated notifications for new enquiries</li>
                </ul>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">Pending (2)</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">In Progress (5)</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">Proposal Sent (3)</div>
                    <div className="p-2 bg-white border border-[#e5e7eb] rounded text-xs">Closed (28)</div>
                  </div>
                  <div className="p-4 bg-white border border-[#e5e7eb] rounded">
                    <div className="text-xs text-[#6b7280] mb-2">ENQUIRY TRACKING TABLE:</div>
                    <div className="grid grid-cols-6 gap-2 text-xs">
                      <div className="font-medium">Company</div>
                      <div className="font-medium">Type</div>
                      <div className="font-medium">Priority</div>
                      <div className="font-medium">Status</div>
                      <div className="font-medium">Assigned To</div>
                      <div className="font-medium">Actions</div>
                    </div>
                    <div className="mt-2 text-[#9ca3af]">... enquiry rows here ...</div>
                  </div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Enquiry Details Modal</div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Sponsor Manager */}
          <AdminCard title="🤝 Sponsor Management (📅 Low Priority)">
            <div className="space-y-4">
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">Sponsor Data Management:</h4>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• <strong>Completely managed in Sanity CMS</strong> (not Supabase)</li>
                  <li>• <strong>Tier management:</strong> Principal Partner, Main Sponsor, Official Partner</li>
                  <li>• <strong>Header display:</strong> Max 3 sponsors for header, primary mobile sponsor</li>
                  <li>• <strong>Additional types:</strong> Match sponsor, Player sponsor capabilities</li>
                  <li>• <strong>Cross-linking:</strong> match_sponsor_id links to Sanity document IDs</li>
                </ul>
              </div>
              
              <div className="bg-[#fff7ed] p-4 rounded-lg border border-[#fed7aa]">
                <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Wireframe Interface (To Build):</h4>
                <div className="space-y-2 text-sm text-[#6b7280]">
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Sponsor Database Table</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Tier Management Interface</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Header Sponsor Selection (Max 3)</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Mobile Main Sponsor Selector</div>
                  <div className="p-2 bg-white border border-[#e5e7eb] rounded">Testimonial Management</div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Commercial Packages */}
          <AdminCard title="💼 Commercial Packages & Pricing">
            <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
              <h4 className="font-medium text-[#00105A] mb-2 m-0">Package Management:</h4>
              <ul className="text-sm text-[#6b7280] space-y-1">
                <li>• <strong>Sponsorship packages:</strong> Perimeter boards (£1,750-£3,000), player sponsorship (£250-£500)</li>
                <li>• <strong>Hospitality options:</strong> Match day sponsorship (£1,000), matchball sponsorship (£800)</li>
                <li>• <strong>Standard packages:</strong> £90/head hospitality rates</li>
                <li>• <strong>Clear pricing transparency:</strong> Professional B2B presentation</li>
              </ul>
            </div>
          </AdminCard>
        </main>
      </div>
    </div>
  );
}