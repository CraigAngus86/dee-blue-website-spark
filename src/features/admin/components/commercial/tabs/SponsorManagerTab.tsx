"use client";

import React, { useState, useEffect } from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';
import { AdminModal } from '../../shared/AdminModal';

interface Sponsor {
  _id: string;
  name: string;
  primaryTier: 'principal' | 'main' | 'partner';
  isActive: boolean;
  website?: string;
  endDate?: string;
  logo: {
    public_id: string;
  };
  additionalTypes: {
    isMatchSponsor: boolean;
    isPlayerSponsor: boolean;
  };
}

interface TierCounts {
  principal: number;
  main: number;
  partner: number;
}

interface SponsorManagerTabProps {
  initialSponsors?: Sponsor[];
  initialTierCounts?: TierCounts;
}

export function SponsorManagerTab({ initialSponsors = [], initialTierCounts }: SponsorManagerTabProps) {
  // State management
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors);
  const [tierCounts, setTierCounts] = useState<TierCounts>(initialTierCounts || { principal: 0, main: 0, partner: 0 });
  const [loading, setLoading] = useState(!initialSponsors.length);
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedSponsorId, setSelectedSponsorId] = useState<string>('');

  // Fetch sponsors data
  const fetchSponsors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (tierFilter !== 'all') params.append('tier', tierFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      
      const response = await fetch(`/api/admin/sponsors?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setSponsors(data.sponsors);
        setTierCounts(data.tierCounts);
      }
    } catch (error) {
      console.error('Failed to fetch sponsors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const handleAddSponsor = () => {
    setModalMode('add');
    setSelectedSponsorId('');
    setIsModalOpen(true);
  };

  const handleEditSponsor = (sponsorId: string) => {
    setModalMode('edit');
    setSelectedSponsorId(sponsorId);
    setIsModalOpen(true);
  };

  const handleDeleteSponsor = (sponsorId: string) => {
    setModalMode('delete');
    setSelectedSponsorId(sponsorId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSponsorId('');
  };

  const handleModalSuccess = () => {
    fetchSponsors(); // Refresh data after successful operation
  };

  // Load data on component mount and filter changes
  useEffect(() => {
    if (!initialSponsors.length) {
      fetchSponsors();
    }
  }, []);

  useEffect(() => {
    fetchSponsors();
  }, [tierFilter, statusFilter]);

  // Get tier badge styling
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'principal':
        return 'px-2 py-1 rounded text-xs bg-[#FFD700] text-[#00105A] font-medium';
      case 'main':
        return 'px-2 py-1 rounded text-xs bg-[#C5E7FF] text-[#00105A] font-medium';
      case 'partner':
        return 'px-2 py-1 rounded text-xs bg-[#f3f4f6] text-[#6b7280] font-medium';
      default:
        return 'px-2 py-1 rounded text-xs bg-gray-100 text-gray-600 font-medium';
    }
  };

  // Get tier display name
  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case 'principal': return 'Principal';
      case 'main': return 'Main';
      case 'partner': return 'Partner';
      default: return tier;
    }
  };

  // Format contract end date
  const formatContractEnd = (endDate?: string) => {
    if (!endDate) return 'Ongoing';
    const date = new Date(endDate);
    return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  };

  // Check if contract is expiring soon (within 3 months)
  const isContractExpiringSoon = (endDate?: string) => {
    if (!endDate) return false;
    const end = new Date(endDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return end <= threeMonthsFromNow;
  };

  // Sort sponsors by tier hierarchy, then alphabetically
  const getSortedSponsors = () => {
    const tierOrder = { principal: 0, main: 1, partner: 2 };
    return [...sponsors].sort((a, b) => {
      const tierComparison = tierOrder[a.primaryTier] - tierOrder[b.primaryTier];
      if (tierComparison !== 0) return tierComparison;
      return a.name.localeCompare(b.name);
    });
  };

  const sortedSponsors = getSortedSponsors();

  return (
    <>
      <AdminCard title="Sponsor Management">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Sponsor Tier Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0"></h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">Principal Partners</div>
                  <div className="text-2xl font-bold text-[#FFD700] mt-2">{tierCounts.principal}/1</div>
                  <div className="text-sm text-[#6b7280]">Premium tier sponsors</div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">Main Sponsors</div>
                  <div className="text-2xl font-bold text-[#C5E7FF] mt-2">{tierCounts.main}/2</div>
                  <div className="text-sm text-[#6b7280]">Key partnership level</div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">Official Partners</div>
                  <div className="text-2xl font-bold text-[#9ca3af] mt-2">{tierCounts.partner}</div>
                  <div className="text-sm text-[#6b7280]">Supporting partners</div>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Tier:</label>
                <div className="relative">
                  <select 
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    <option value="all">All Tiers</option>
                    <option value="principal">Principal Partner</option>
                    <option value="main">Main Sponsor</option>
                    <option value="partner">Official Partner</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Status:</label>
                <div className="relative">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-end">
                <button 
                  onClick={handleAddSponsor}
                  className="px-4 py-3 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors w-full"
                >
                  + Add New Sponsor
                </button>
              </div>
            </div>

            {/* Sponsor Database Table */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white">
              <div className="overflow-auto">
                {loading ? (
                  <div className="text-center py-8 text-[#6b7280]">Loading sponsors...</div>
                ) : sortedSponsors.length === 0 ? (
                  <div className="text-center py-8 text-[#6b7280]">No sponsors found for current filters</div>
                ) : (
                  <table className="w-full caption-bottom text-sm">
                    <thead className="border-b border-[#e5e7eb]">
                      <tr>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[#374151] w-1/4">Sponsor Name</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151] w-1/8">Tier</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151] w-1/12">Status</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151] w-1/8">Types</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[#374151] w-1/4">Website</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-[#374151] w-1/8">Contract End</th>
                        <th className="h-12 px-4 text-center align-middle font-medium text-[#374151] w-1/8">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedSponsors.map((sponsor) => (
                        <tr key={sponsor._id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                          <td className="p-4 align-middle text-[#374151] font-medium">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-[#f3f4f6] rounded flex items-center justify-center">
                                {sponsor.logo?.public_id ? (
                                  <img 
                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_32,h_32,c_fit,q_auto:good,f_auto/${sponsor.logo.public_id}`}
                                    alt={`${sponsor.name} logo`}
                                    className="w-8 h-8 object-contain"
                                  />
                                ) : (
                                  <span className="text-xs text-[#6b7280]">No Logo</span>
                                )}
                              </div>
                              <span>{sponsor.name}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <span className={getTierBadge(sponsor.primaryTier)}>
                              {getTierDisplayName(sponsor.primaryTier)}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <span className={sponsor.isActive ? "text-green-600 text-lg" : "text-red-500 text-lg"}>
                              {sponsor.isActive ? "✓" : "✗"}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex flex-col space-y-1">
                              {sponsor.additionalTypes.isMatchSponsor && (
                                <span className="text-xs bg-[#e0f2fe] text-[#0277bd] px-2 py-1 rounded">Match</span>
                              )}
                              {sponsor.additionalTypes.isPlayerSponsor && (
                                <span className="text-xs bg-[#f3e5f5] text-[#7b1fa2] px-2 py-1 rounded">Player</span>
                              )}
                              {!sponsor.additionalTypes.isMatchSponsor && !sponsor.additionalTypes.isPlayerSponsor && (
                                <span className="text-xs text-[#9ca3af]">-</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 align-middle text-[#374151]">
                            {sponsor.website ? (
                              <a 
                                href={sponsor.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#00105A] hover:text-[#FFD700] underline"
                              >
                                {sponsor.website.replace(/^https?:\/\//, '')}
                              </a>
                            ) : (
                              <span className="text-[#9ca3af]">-</span>
                            )}
                          </td>
                          <td className="p-4 align-middle text-[#6b7280]">
                            <span className={isContractExpiringSoon(sponsor.endDate) ? "text-[#f59e0b] font-medium" : ""}>
                              {formatContractEnd(sponsor.endDate)}
                              {isContractExpiringSoon(sponsor.endDate) && (
                                <span className="ml-1">⚠️</span>
                              )}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center space-x-2">
                              <button 
                                onClick={() => handleEditSponsor(sponsor._id)}
                                className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteSponsor(sponsor._id)}
                                className="text-[#ef4444] hover:text-[#dc2626] text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Sanity CMS Management:</strong> Sponsors completely managed in Sanity (not Supabase)</li>
              <li>• <strong>Tier Categories:</strong> Principal Partner (1 max), Main Sponsor (2 max), Official Partner (unlimited)</li>
              <li>• <strong>Cross-linking:</strong> Match sponsors update Supabase match.sponsor_logo_url</li>
              <li>• <strong>Cross-linking:</strong> Player sponsors update Sanity playerProfile.sponsorLogoUrl</li>
              <li>• <strong>Cloudinary Integration:</strong> Logo upload to banksofdeefc/sponsors/ folder</li>
              <li>• <strong>Additional Types:</strong> Match sponsor and Player sponsor capabilities with dropdown linking</li>
            </ul>
          </div>
        </div>
      </AdminCard>

      {/* Admin Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        entityType="sponsor"
        mode={modalMode}
        recordId={selectedSponsorId}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}
