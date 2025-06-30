import { SharedAdminNav } from '../SharedAdminNav';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EnquiryManagerTab } from './tabs/EnquiryManagerTab';
import { SponsorManagerTab } from './tabs/SponsorManagerTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';

export function CommercialManagement() {
  return (
    <div className="flex">
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
        <main className="p-8">
          {/* Tab System */}
          <Tabs defaultValue="enquiry-manager" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#f9fafb] border border-[#e5e7eb]">
              <TabsTrigger
                value="enquiry-manager"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                ✅ Business Enquiry Manager
              </TabsTrigger>
              <TabsTrigger
                value="sponsor-manager"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                ✅ Sponsor Management
              </TabsTrigger>
              <TabsTrigger
                value="testimonials"
                className="data-[state=active]:bg-[#C5E7FF] data-[state=active]:text-[#00105A] font-medium"
              >
                📅 Testimonials & Packages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="enquiry-manager" className="mt-6">
              <EnquiryManagerTab />
            </TabsContent>
            <TabsContent value="sponsor-manager" className="mt-6">
              <SponsorManagerTab />
            </TabsContent>
            <TabsContent value="testimonials" className="mt-6">
              <TestimonialsTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}