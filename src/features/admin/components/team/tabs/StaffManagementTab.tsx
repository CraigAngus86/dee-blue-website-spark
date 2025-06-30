'use client';

import React, { useState, useEffect } from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { AdminModal } from '../../shared/AdminModal';

interface Staff {
  _id: string;
  firstName: string;
  lastName: string;
  staffType: 'manager' | 'coach' | 'staff';
  staffRole: string;
  profileImage?: {
    public_id: string;
    secure_url: string;
    version?: number;
  };
}

export function StaffManagementTab() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [staffCounts, setStaffCounts] = useState({
    manager: 0,
    coach: 0,
    staff: 0
  });
  const [selectedStaffType, setSelectedStaffType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  type AdminMode = 'add' | 'edit' | 'delete';

  interface ModalState {
    isOpen: boolean;
    mode: AdminMode;
    recordId: string | null;
  }

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: 'add',
    recordId: null
  });

  // Fetch staff data on component mount
  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/admin/staff?pageSize=50');
      const data = await response.json();
      
      if (data.success) {
        console.log('Staff data:', data.staff);
        setStaff(data.staff || []);
        setStaffCounts(data.staffCounts || {
          manager: 0,
          coach: 0,
          staff: 0
        });
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Transform function that we know works
  const getTransformedUrl = (image: any) => {
    if (!image?.secure_url) return '';
    
    return image.secure_url.replace(
      '/upload/',
      '/upload/c_fill,g_auto:face,ar_1:1,w_200/'
    );
  };

  // Universal modal functions
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
    console.log('Staff operation successful - refreshing grid...');
    fetchStaff(); // Actually refresh the grid
    closeModal();
  };

  // Group staff by type
  const staffByType = {
    manager: staff.filter(s => s.staffType === 'manager'),
    coach: staff.filter(s => s.staffType === 'coach'),
    staff: staff.filter(s => s.staffType === 'staff')
  };

  // Get filtered staff for display
  const getStaffToShow = () => {
    if (selectedStaffType === 'all') {
      return staffByType; // Show all sections
    } else {
      // Show only selected type section
      return {
        manager: selectedStaffType === 'manager' ? staffByType.manager : [],
        coach: selectedStaffType === 'coach' ? staffByType.coach : [],
        staff: selectedStaffType === 'staff' ? staffByType.staff : []
      };
    }
  };

  const displayStaff = getStaffToShow();

  // Render staff card
  const renderStaffCard = (staffMember: Staff) => {
    return (
      <div 
        key={staffMember._id} 
        onClick={() => openModal('edit', staffMember._id)}
        className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-200">
        {/* Square aspect ratio container */}
        <div className="aspect-square rounded-lg overflow-hidden relative">
          {staffMember.profileImage ? (
            <img 
              src={getTransformedUrl(staffMember.profileImage)}
              alt={`${staffMember.firstName} ${staffMember.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#00105A] flex items-center justify-center">
              <div className="text-white text-2xl font-bold">
                {staffMember.firstName.charAt(0)}{staffMember.lastName.charAt(0)}
              </div>
            </div>
          )}
        </div>
        
        {/* Staff Info */}
        <div className="mt-2 text-center">
          <div className="text-sm font-medium text-[#374151] truncate">
            {staffMember.firstName} {staffMember.lastName}
          </div>
          <div className="text-xs text-[#6b7280] capitalize">
            {staffMember.staffRole}
          </div>
        </div>
      </div>
    );
  };

  // Render staff type section
  const renderStaffTypeSection = (type: keyof typeof staffByType, title: string, emoji: string) => {
    const typeStaff = displayStaff[type];
    
    if (typeStaff.length === 0 && selectedStaffType !== 'all') {
      return null; // Don't show empty sections when filtering
    }

    return (
      <div key={type} className="mb-8">
        <h5 className="text-lg font-semibold text-[#00105A] mb-4 flex items-center">
          <span className="mr-2">{emoji}</span>
          {title} ({typeStaff.length})
        </h5>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
          {typeStaff.map(renderStaffCard)}
          
          {/* Add new staff card */}
          {(selectedStaffType === 'all' || selectedStaffType === type) && (
            <div 
              onClick={() => openModal('add')}
              className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-200"
            >
              <div className="aspect-square bg-[#f9fafb] border-2 border-dashed border-[#C5E7FF] rounded-lg flex items-center justify-center hover:bg-[#C5E7FF] hover:bg-opacity-10 transition-colors">
                <div className="text-center text-[#00105A]">
                  <div className="text-xl mb-1">+</div>
                  <div className="text-xs font-medium">Add New</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminCard title="Staff Management">
          <div className="flex items-center justify-center h-64">
            <div className="text-[#6b7280]">Loading staff...</div>
          </div>
        </AdminCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminCard title="Staff Management">
        <div className="space-y-6">
          
          {/* Staff Overview Statistics */}
          <div className="mb-6">
            <h4 className="font-medium text-[#00105A] mb-4 m-0">Staff Overview:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                <div className="text-xl font-bold text-[#00105A]">{staff.length}</div>
                <div className="text-sm text-[#6b7280]">Total Staff</div>
                <div className="text-xs text-[#6b7280] mt-1">All Categories</div>
              </div>
              <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                <div className="text-xl font-bold text-[#00105A]">{staffCounts.manager}</div>
                <div className="text-sm text-[#6b7280]">Management</div>
                <div className="text-xs text-[#6b7280] mt-1">Leadership team</div>
              </div>
              <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                <div className="text-xl font-bold text-[#00105A]">{staffCounts.coach}</div>
                <div className="text-sm text-[#6b7280]">Coaching</div>
                <div className="text-xs text-[#6b7280] mt-1">Training staff</div>
              </div>
              <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                <div className="text-xl font-bold text-[#00105A]">{staffCounts.staff}</div>
                <div className="text-sm text-[#6b7280]">Support</div>
                <div className="text-xs text-[#6b7280] mt-1">Operations team</div>
              </div>
            </div>
          </div>

          {/* Staff Type Filter & Add Button */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h4 className="font-medium text-[#00105A] m-0">Filter by Category:</h4>
              <div className="relative">
                <select 
                  value={selectedStaffType}
                  onChange={(e) => setSelectedStaffType(e.target.value)}
                  className="px-4 py-2 bg-white border-2 border-[#00105A] rounded text-[#00105A] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] font-medium min-w-[150px]"
                >
                  <option value="all">All Categories</option>
                  <option value="manager">Management ({staffCounts.manager})</option>
                  <option value="coach">Coaching ({staffCounts.coach})</option>
                  <option value="staff">Support ({staffCounts.staff})</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-[#00105A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => openModal('add')}
              className="px-4 py-2 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors"
            >
              + Add New Staff
            </button>
          </div>
          
          {/* Staff Grid by Type Sections */}
          <div className="bg-white p-4 rounded-lg border border-[#e5e7eb]">
            {renderStaffTypeSection('manager', 'Management Team')}
            {renderStaffTypeSection('coach', 'Coaching Staff')}
            {renderStaffTypeSection('staff', 'Support Staff')}
          </div>
        </div>
      </AdminCard>

      {/* AdminModal Integration */}
      <AdminModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        entityType="staff"
        mode={modalState.mode}
        recordId={modalState.recordId}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
