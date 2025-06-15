import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function TestimonialsTab() {
  return (
    <div className="space-y-6">
      {/* Testimonials Management */}
      <AdminCard title="💬 Testimonials & Success Stories (📅 Low Priority) - Partner testimonials, package content">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Testimonials Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📝 Testimonials Management:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                  <h5 className="font-medium text-[#374151] mb-2">Published Testimonials</h5>
                  <div className="text-2xl font-bold text-[#00105A]">4</div>
                  <div className="text-sm text-[#6b7280]">Active on commercial page</div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                  <h5 className="font-medium text-[#374151] mb-2">Pending Approval</h5>
                  <div className="text-2xl font-bold text-[#FFD700]">2</div>
                  <div className="text-sm text-[#6b7280]">Awaiting review</div>
                </div>
              </div>
            </div>

            {/* Add New Testimonial */}
            <div className="mb-6">
              <button className="px-4 py-2 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors">
                + Add New Testimonial
              </button>
            </div>

            {/* Testimonials Table */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white mb-6">
              <div className="overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b border-[#e5e7eb]">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Partner Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Testimonial</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Date Added</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">Aberdeen Oil Services</td>
                      <td className="p-4 align-middle text-[#374151] max-w-md">
                        <div className="truncate">"Excellent partnership opportunity with professional presentation..."</div>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-green-600 text-lg">✓</span>
                      </td>
                      <td className="p-4 align-middle text-[#6b7280]">10/06/2025</td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                          <button className="text-red-500 hover:text-red-700 text-sm font-medium">Hide</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                      <td className="p-4 align-middle text-[#374151] font-medium">North East Construction</td>
                      <td className="p-4 align-middle text-[#374151] max-w-md">
                        <div className="truncate">"Banks o' Dee FC provides fantastic exposure for our business..."</div>
                      </td>
                      <td className="p-4 align-middle text-center">
                        <span className="text-blue-500 text-lg">⏰</span>
                      </td>
                      <td className="p-4 align-middle text-[#6b7280]">08/06/2025</td>
                      <td className="p-4 align-middle text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Approve</button>
                          <button className="text-red-500 hover:text-red-700 text-sm font-medium">Reject</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Commercial Packages & Pricing */}
      <AdminCard title="💼 Commercial Packages & Pricing (📅 Low Priority) - Package management and pricing">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Package Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">📦 Package Categories:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Sponsorship Packages */}
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                  <h5 className="font-medium text-[#374151] mb-3">Sponsorship Packages</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Perimeter Boards</span>
                      <span className="font-medium">£1,750-£3,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Player Sponsorship</span>
                      <span className="font-medium">£250-£500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kit Branding</span>
                      <span className="font-medium">Contact Us</span>
                    </div>
                  </div>
                </div>

                {/* Hospitality Options */}
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                  <h5 className="font-medium text-[#374151] mb-3">Hospitality Options</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Match Day Sponsorship</span>
                      <span className="font-medium">£1,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Matchball Sponsorship</span>
                      <span className="font-medium">£800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Standard Package</span>
                      <span className="font-medium">£90/head</span>
                    </div>
                  </div>
                </div>

                {/* Additional Services */}
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                  <h5 className="font-medium text-[#374151] mb-3">Additional Services</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Spain Park Venue Hire</span>
                      <span className="font-medium">POA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Digital Advertising</span>
                      <span className="font-medium">Contact Us</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Programme Advertising</span>
                      <span className="font-medium">Contact Us</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Content Management */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">✏️ Package Content Editor:</h4>
              <div className="space-y-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                  <h5 className="font-medium text-[#374151] mb-2">Package Descriptions</h5>
                  <div className="text-sm text-[#6b7280] mb-3">Update sponsorship package descriptions and benefits</div>
                  <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit Descriptions</button>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                  <h5 className="font-medium text-[#374151] mb-2">Pricing Updates</h5>
                  <div className="text-sm text-[#6b7280] mb-3">Modify package pricing and availability</div>
                  <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Update Pricing</button>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                  <h5 className="font-medium text-[#374151] mb-2">Benefits & Features</h5>
                  <div className="text-sm text-[#6b7280] mb-3">Add or modify package benefits and features</div>
                  <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit Benefits</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Testimonials:</strong> Sanity CMS managed with approval workflow</li>
              <li>• <strong>Package Pricing:</strong> Static content updates for commercial page</li>
              <li>• <strong>Professional B2B Presentation:</strong> Clear pricing transparency</li>
              <li>• <strong>Revenue Focus:</strong> Direct lead generation and conversion optimization</li>
              <li>• <strong>Success Stories:</strong> Update partnership showcase content</li>
              <li>• <strong>Content Updates:</strong> Regular package description and pricing maintenance</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}