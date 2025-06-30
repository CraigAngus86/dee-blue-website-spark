"use client";
import React, { useState, useEffect } from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { AdminModal } from '../../shared/AdminModal';

type AdminMode = 'add' | 'edit' | 'delete';

interface ModalState {
 isOpen: boolean;
 mode: AdminMode;
 recordId: string | null;
}

interface EnquiryManagerTabProps {
 initialData?: {
   enquiries: any[];
   pagination: any;
 };
}

export function EnquiryManagerTab({ initialData }: EnquiryManagerTabProps) {
 const [modalState, setModalState] = useState<ModalState>({
   isOpen: false,
   mode: 'edit',
   recordId: null
 });

 const [enquiries, setEnquiries] = useState(initialData?.enquiries || []);
 const [pagination, setPagination] = useState(initialData?.pagination || { page: 1, pageSize: 25, total: 0, totalPages: 0 });
 const [loading, setLoading] = useState(false);
 
 // Filter states
 const [filters, setFilters] = useState({
   status: 'all',
   source: 'all'
 });

 // Status options from schema
 const statuses = [
   { value: 'all', label: 'All Status' },
   { value: 'pending', label: 'Pending Review' },
   { value: 'in_progress', label: 'In Progress' },
   { value: 'proposal_sent', label: 'Proposal Sent' },
   { value: 'closed_successful', label: 'Closed - Successful' },
   { value: 'closed_unsuccessful', label: 'Closed - Unsuccessful' },
   { value: 'follow_up', label: 'Follow Up Required' }
 ];

 // Source options
 const sources = [
   { value: 'all', label: 'All Sources' },
   { value: 'spain_park_page', label: 'Spain Park Page' },
   { value: 'commercial_page', label: 'Commercial Page' },
   { value: 'direct_contact', label: 'Direct Contact' }
 ];

 // Fetch enquiries data
 const fetchEnquiries = async (page = 1, newFilters = filters) => {
   setLoading(true);
   try {
     const params = new URLSearchParams({
       page: page.toString(),
       pageSize: '25',
       ...(newFilters.status !== 'all' && { status: newFilters.status }),
       ...(newFilters.source !== 'all' && { source: newFilters.source })
     });

     const response = await fetch(`/api/admin/business-enquiries?${params}`);
     const data = await response.json();

     if (data.success) {
       setEnquiries(data.enquiries);
       setPagination(data.pagination);
     }
   } catch (error) {
     console.error('Failed to fetch enquiries:', error);
   } finally {
     setLoading(false);
   }
 };

 // Load data on mount
 useEffect(() => {
   if (!initialData) {
     fetchEnquiries(1, filters);
   }
 }, []);

 const openModal = (mode: AdminMode, recordId?: string) => {
   setModalState({
     isOpen: true,
     mode,
     recordId: recordId || null
   });
 };

 const closeModal = () => {
   setModalState({
     ...modalState,
     isOpen: false
   });
 };

 const handleModalSuccess = () => {
   console.log('Enquiry operation successful - refreshing table...');
   fetchEnquiries(pagination.page); // Refresh current page
   closeModal();
 };

 const handleFilterChange = (filterName: string, value: string) => {
   const newFilters = { ...filters, [filterName]: value };
   setFilters(newFilters);
   fetchEnquiries(1, newFilters); // Reset to page 1 with new filters
 };

 const handlePageChange = (newPage: number) => {
   fetchEnquiries(newPage);
 };

 // Format date for display
 const formatDate = (dateString: string) => {
   if (!dateString) return 'Not set';
   return new Date(dateString).toLocaleDateString('en-GB');
 };

 // Get visual indicator for status
 const getStatusIndicator = (status: string) => {
   switch (status) {
     case 'pending':
       return <span className="text-orange-500 text-lg">⏰</span>;
     case 'in_progress':
       return <span className="text-blue-500 text-lg">🔄</span>;
     case 'proposal_sent':
       return <span className="text-purple-500 text-lg">📄</span>;
     case 'closed_successful':
       return <span className="text-green-600 text-lg">✅</span>;
     case 'closed_unsuccessful':
       return <span className="text-red-500 text-lg">❌</span>;
     case 'follow_up':
       return <span className="text-yellow-500 text-lg">🔔</span>;
     default:
       return <span className="text-gray-500 text-lg">❓</span>;
   }
 };

 // Format budget range for display
 const formatBudget = (budgetRange: string) => {
   const budgetMap: { [key: string]: string } = {
     'under1000': 'Under £1,000',
     '1000-3000': '£1,000-£3,000',
     'over3000': '£3,000+',
     'discuss': 'To Discuss'
   };
   return budgetMap[budgetRange] || budgetRange || 'Not specified';
 };

 // Format interest type for display
 const formatInterestType = (interestType: string) => {
   const typeMap: { [key: string]: string } = {
     'sponsorship': 'Sponsorship',
     'hospitality': 'Hospitality',
     'both': 'Both',
     'other': 'Other'
   };
   return typeMap[interestType] || interestType;
 };

 // Calculate status overview from current data
 const getStatusOverview = () => {
   const statusCounts = {
     pending: enquiries.filter(e => e.status === 'pending').length,
     in_progress: enquiries.filter(e => e.status === 'in_progress').length,
     proposal_sent: enquiries.filter(e => e.status === 'proposal_sent').length,
     closed: enquiries.filter(e => e.status === 'closed_successful' || e.status === 'closed_unsuccessful').length
   };
   return statusCounts;
 };

 const statusOverview = getStatusOverview();

 return (
   <div className="space-y-6">
     {/* Business Enquiry Manager */}
     <AdminCard title="📩 Business Enquiry Manager (✅ Complete)">
       <div className="space-y-4">
         <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
           
           {/* Enquiry Status Overview */}
           <div className="mb-6">
             <h4 className="font-medium text-[#00105A] mb-4 m-0"></h4>
             <div className="grid grid-cols-4 gap-4">
               <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                 <div className="text-2xl font-bold text-[#00105A]">{statusOverview.pending}</div>
                 <div className="text-sm text-[#6b7280]">Pending</div>
                 <div className="w-full bg-[#fef3c7] h-1 rounded mt-2"></div>
               </div>
               <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                 <div className="text-2xl font-bold text-[#00105A]">{statusOverview.in_progress}</div>
                 <div className="text-sm text-[#6b7280]">In Progress</div>
                 <div className="w-full bg-[#C5E7FF] h-1 rounded mt-2"></div>
               </div>
               <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                 <div className="text-2xl font-bold text-[#00105A]">{statusOverview.proposal_sent}</div>
                 <div className="text-sm text-[#6b7280]">Proposal Sent</div>
                 <div className="w-full bg-[#FFD700] h-1 rounded mt-2"></div>
               </div>
               <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                 <div className="text-2xl font-bold text-[#00105A]">{statusOverview.closed}</div>
                 <div className="text-sm text-[#6b7280]">Closed</div>
                 <div className="w-full bg-[#dcfce7] h-1 rounded mt-2"></div>
               </div>
             </div>
           </div>

           {/* Filter Controls */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
             <div>
               <label className="block text-sm font-medium text-[#374151] mb-2">Status:</label>
               <div className="relative">
                 <select 
                   value={filters.status}
                   onChange={(e) => handleFilterChange('status', e.target.value)}
                   className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                 >
                   {statuses.map(status => (
                     <option key={status.value} value={status.value}>
                       {status.label}
                     </option>
                   ))}
                 </select>
                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                   <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                   </svg>
                 </div>
               </div>
             </div>
             
             <div>
               <label className="block text-sm font-medium text-[#374151] mb-2">Source:</label>
               <div className="relative">
                 <select 
                   value={filters.source}
                   onChange={(e) => handleFilterChange('source', e.target.value)}
                   className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                 >
                   {sources.map(source => (
                     <option key={source.value} value={source.value}>
                       {source.label}
                     </option>
                   ))}
                 </select>
                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                   <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                   </svg>
                 </div>
               </div>
             </div>
           </div>

           {/* Enquiry Tracking Table - BALANCED COLUMNS */}
           <div className="rounded-lg border border-[#e5e7eb] bg-white">
             <div className="overflow-auto">
               <table className="w-full caption-bottom text-sm">
                 <thead className="border-b border-[#e5e7eb]">
                   <tr>
                     <th className="h-12 px-4 text-left align-middle font-medium text-[#374151] w-1/6">Company</th>
                     <th className="h-12 px-4 text-left align-middle font-medium text-[#374151] w-1/6">Contact</th>
                     <th className="h-12 px-4 text-left align-middle font-medium text-[#374151] w-1/6">Interest Type</th>
                     <th className="h-12 px-4 text-left align-middle font-medium text-[#374151] w-1/6">Budget</th>
                     <th className="h-12 px-4 text-center align-middle font-medium text-[#374151] w-1/12">Status</th>
                     <th className="h-12 px-4 text-left align-middle font-medium text-[#374151] w-1/8">Submitted</th>
                     <th className="h-12 px-4 text-center align-middle font-medium text-[#374151] w-1/12">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {loading ? (
                     <tr>
                       <td colSpan={7} className="p-8 text-center text-[#6b7280]">
                         Loading enquiries...
                       </td>
                     </tr>
                   ) : enquiries.length === 0 ? (
                     <tr>
                       <td colSpan={7} className="p-8 text-center text-[#6b7280]">
                         No enquiries found for current filters
                       </td>
                     </tr>
                   ) : (
                     enquiries.map((enquiry: any) => (
                       <tr key={enquiry._id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                         <td className="p-4 align-middle text-[#374151] font-medium">{enquiry.company}</td>
                         <td className="p-4 align-middle text-[#374151]">{enquiry.name}</td>
                         <td className="p-4 align-middle text-[#374151]">{formatInterestType(enquiry.interestType)}</td>
                         <td className="p-4 align-middle text-[#374151]">{formatBudget(enquiry.budgetRange)}</td>
                         <td className="p-4 align-middle text-center">
                           {getStatusIndicator(enquiry.status)}
                         </td>
                         <td className="p-4 align-middle text-[#6b7280]">{formatDate(enquiry.submittedAt)}</td>
                         <td className="p-4 align-middle text-center">
                           <button 
                             onClick={() => openModal('edit', enquiry._id)}
                             className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                           >
                             View Details
                           </button>
                         </td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
             </div>
           </div>
             
           {/* Pagination Controls */}
           {enquiries.length > 0 && (
             <div className="flex items-center justify-between px-2 mt-4">
               <div className="text-sm text-[#6b7280]">
                 Showing {pagination.pageSize * (pagination.page - 1) + 1}-{Math.min(pagination.pageSize * pagination.page, pagination.total)} of {pagination.total} enquiries
               </div>
               <div className="flex items-center space-x-2">
                 <button 
                   onClick={() => handlePageChange(pagination.page - 1)}
                   disabled={pagination.page <= 1}
                   className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb] disabled:opacity-50"
                 >
                   Previous
                 </button>
                 <div className="flex space-x-1">
                   {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                     const pageNum = i + 1;
                     return (
                       <button
                         key={pageNum}
                         onClick={() => handlePageChange(pageNum)}
                         className={`px-3 py-1 rounded text-sm ${
                           pagination.page === pageNum
                             ? 'bg-[#00105A] text-white'
                             : 'border border-[#e5e7eb] text-[#6b7280] hover:bg-[#f9fafb]'
                         }`}
                       >
                         {pageNum}
                       </button>
                     );
                   })}
                   {pagination.totalPages > 5 && (
                     <>
                       <span className="px-2 py-1 text-sm text-[#6b7280]">...</span>
                       <button 
                         onClick={() => handlePageChange(pagination.totalPages)}
                         className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb]"
                       >
                         {pagination.totalPages}
                       </button>
                     </>
                   )}
                 </div>
                 <button 
                   onClick={() => handlePageChange(pagination.page + 1)}
                   disabled={!pagination.hasMore}
                   className="px-3 py-1 rounded border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f9fafb] disabled:opacity-50"
                 >
                   Next
                 </button>
               </div>
             </div>
           )}
         </div>
         
         {/* Technical Requirements */}
         <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
           <h4 className="font-medium text-[#00105A] mb-2 m-0">📋 Business Enquiry Management System:</h4>
           <ul className="text-sm text-[#6b7280] space-y-1">
             <li>• <strong>Status Workflow:</strong> pending → in_progress → proposal_sent → closed_successful/unsuccessful</li>
             <li>• <strong>Data Source:</strong> Sanity CMS commercialEnquiry documents from website forms</li>
             <li>• <strong>Live Dashboard:</strong> Status overview calculated from current enquiry data</li>
             <li>• <strong>Revenue Focus:</strong> Budget visibility for prioritization and pipeline management</li>
             <li>• <strong>Source Tracking:</strong> Spain Park page, Commercial page, and direct contact submissions</li>
             <li>• <strong>Modal Integration:</strong> Click "View Details" to see full enquiry and update status</li>
           </ul>
         </div>
       </div>
     </AdminCard>

     {/* AdminModal Integration */}
     <AdminModal
       isOpen={modalState.isOpen}
       onClose={closeModal}
       entityType="businessEnquiry"
       mode={modalState.mode}
       recordId={modalState.recordId}
       onSuccess={handleModalSuccess}
     />
   </div>
 );
}
