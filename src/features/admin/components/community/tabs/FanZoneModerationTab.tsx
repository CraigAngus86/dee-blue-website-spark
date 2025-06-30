"use client";

import React, { useState, useEffect } from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

interface FanPhoto {
  _id: string;
  fanName: string;
  email: string;
  photo: {
    public_id: string;
    secure_url: string;
  };
  context?: string;
  approvalStatus: 'pending' | 'approved' | 'featured' | 'declined';
  submittedAt: string;
  socialPermissions: boolean;
}

interface FanOfMonth {
  _id: string;
  fanName: string;
  email: string;
  category: string;
  story: string;
  photos: Array<{
    public_id: string;
    secure_url: string;
  }>;
  status: 'pending' | 'approved' | 'featured' | 'declined';
  submittedAt: string;
  socialPermissions: boolean;
}

interface StatusCounts {
  pending: number;
  approved: number;
  featured: number;
  declined: number;
}

interface CategoryCounts {
  loyalLegend: number;
  risingTogether: number;
  communityChampion: number;
  matchDayMagic: number;
  nextGeneration: number;
}

export function FanZoneModerationTab() {
  // Fan Photos State
  const [fanPhotos, setFanPhotos] = useState<FanPhoto[]>([]);
  const [photoStatusCounts, setPhotoStatusCounts] = useState<StatusCounts>({
    pending: 0, approved: 0, featured: 0, declined: 0
  });
  const [photoStatus, setPhotoStatus] = useState('pending');
  const [photoDateRange, setPhotoDateRange] = useState('all');
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  // Fan of Month State
  const [fanOfMonth, setFanOfMonth] = useState<FanOfMonth[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({
    loyalLegend: 0, risingTogether: 0, communityChampion: 0, matchDayMagic: 0, nextGeneration: 0
  });
  const [fomCategory, setFomCategory] = useState('all');
  const [fomStatus, setFomStatus] = useState('pending');
  const [loadingFanOfMonth, setLoadingFanOfMonth] = useState(true);

  // Fetch fan photos
  const fetchFanPhotos = async () => {
    try {
      setLoadingPhotos(true);
      const params = new URLSearchParams({
        status: photoStatus,
        dateRange: photoDateRange
      });
      
      const response = await fetch(`/api/admin/fan-photos?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setFanPhotos(data.fanPhotos);
        setPhotoStatusCounts(data.statusCounts);
      }
    } catch (error) {
      console.error('Failed to fetch fan photos:', error);
    } finally {
      setLoadingPhotos(false);
    }
  };

  // Fetch fan of month submissions
  const fetchFanOfMonth = async () => {
    try {
      setLoadingFanOfMonth(true);
      const params = new URLSearchParams({
        category: fomCategory,
        status: fomStatus
      });
      
      const response = await fetch(`/api/admin/fan-of-month?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setFanOfMonth(data.fanOfMonth);
        setCategoryCounts(data.categoryCounts);
      }
    } catch (error) {
      console.error('Failed to fetch fan of month:', error);
    } finally {
      setLoadingFanOfMonth(false);
    }
  };

  // Update photo status
  const updatePhotoStatus = async (photoId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/fan-photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: photoId, approvalStatus: newStatus })
      });
      
      const data = await response.json();
      if (data.success) {
        fetchFanPhotos(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update photo status:', error);
    }
  };

  // Update fan of month status
  const updateFanOfMonthStatus = async (fomId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/fan-of-month', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: fomId, status: newStatus })
      });
      
      const data = await response.json();
      if (data.success) {
        fetchFanOfMonth(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update fan of month status:', error);
    }
  };

  // Get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  // Count words in story
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Get category display name
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'loyal_legend': 'Loyal Legend',
      'rising_together': 'Rising Together',
      'community_champion': 'Community Champion',
      'match_day_magic': 'Match Day Magic',
      'next_generation': 'Next Generation'
    };
    return categoryMap[category] || category;
  };

  // Load data on component mount and filter changes
  useEffect(() => {
    fetchFanPhotos();
  }, [photoStatus, photoDateRange]);

  useEffect(() => {
    fetchFanOfMonth();
  }, [fomCategory, fomStatus]);

  return (
    <div className="space-y-6">
      {/* Fan Photo Moderation */}
      <AdminCard title="Fan Photo Moderation">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Moderation Status Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">Moderation Status Overview:</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">{photoStatusCounts.pending}</div>
                  <div className="text-sm text-[#6b7280]">Pending</div>
                  <div className="w-full bg-[#fef3c7] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">{photoStatusCounts.approved}</div>
                  <div className="text-sm text-[#6b7280]">Approved</div>
                  <div className="w-full bg-[#dcfce7] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">{photoStatusCounts.featured}</div>
                  <div className="text-sm text-[#6b7280]">Featured</div>
                  <div className="w-full bg-[#FFD700] h-1 rounded mt-2"></div>
                </div>
                <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-2xl font-bold text-[#00105A]">{photoStatusCounts.declined}</div>
                  <div className="text-sm text-[#6b7280]">Declined</div>
                  <div className="w-full bg-[#fecaca] h-1 rounded mt-2"></div>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Status:</label>
                <div className="relative">
                  <select 
                    value={photoStatus}
                    onChange={(e) => setPhotoStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="featured">Featured</option>
                    <option value="declined">Declined</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Submission Date:</label>
                <div className="relative">
                  <select 
                    value={photoDateRange}
                    onChange={(e) => setPhotoDateRange(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="thisweek">This Week</option>
                    <option value="thismonth">This Month</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-end">
                <div className="text-sm text-[#6b7280] w-full text-center">
                  {loadingPhotos ? 'Loading...' : `${fanPhotos.length} photos`}
                </div>
              </div>
            </div>

            {/* Photo Review Grid */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">Photo Review Grid:</h4>
              {loadingPhotos ? (
                <div className="text-center py-8 text-[#6b7280]">Loading fan photos...</div>
              ) : fanPhotos.length === 0 ? (
                <div className="text-center py-8 text-[#6b7280]">No fan photos found for current filters</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {fanPhotos.map((photo) => (
                    <div key={photo._id} className="bg-white border border-[#e5e7eb] rounded-lg p-4">
                      <div className="aspect-square bg-[#f3f4f6] rounded mb-3 overflow-hidden">
                        <img 
                          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_300,h_300,c_fill,g_auto:faces,q_auto:good,f_auto/${photo.photo.public_id}`}
                          alt={`Photo by ${photo.fanName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm text-[#374151] mb-2">Submitted by: {photo.fanName}</div>
                      <div className="text-xs text-[#6b7280] mb-3">{getRelativeTime(photo.submittedAt)}</div>
                      {photo.context && (
                        <div className="text-xs text-[#6b7280] mb-3">"{photo.context}"</div>
                      )}
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => updatePhotoStatus(photo._id, 'approved')}
                          className="flex-1 px-3 py-2 bg-green-100 text-green-800 rounded text-xs font-medium hover:bg-green-200"
                        >
                          ✅ Approve
                        </button>
                        <button 
                          onClick={() => updatePhotoStatus(photo._id, 'featured')}
                          className="flex-1 px-3 py-2 bg-[#FFD700] text-[#00105A] rounded text-xs font-medium hover:bg-yellow-300"
                        >
                          ⭐ Feature
                        </button>
                        <button 
                          onClick={() => updatePhotoStatus(photo._id, 'declined')}
                          className="flex-1 px-3 py-2 bg-red-100 text-red-800 rounded text-xs font-medium hover:bg-red-200"
                        >
                          ❌ Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Status Workflow:</strong> pending → approved → featured → declined</li>
              <li>• <strong>Batch Operations:</strong> Efficient processing capabilities for multiple photos</li>
              <li>• <strong>Social Permissions:</strong> Track user consent for social media usage</li>
              <li>• <strong>File Validation:</strong> Follow Fan Zone patterns (5MB limit, JPG/PNG only)</li>
              <li>• <strong>Cloudinary Integration:</strong> Auto-folder organization /fans/gallery/ and /fans/featured/</li>
              <li>• <strong>Moderation Tools:</strong> Three-tier approval process with internal review notes</li>
            </ul>
          </div>
        </div>
      </AdminCard>

      {/* Fan of the Month Manager */}
      <AdminCard title="Fan of the Month Manager">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Category Overview */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">Category Overview:</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">{categoryCounts.loyalLegend}</div>
                  <div className="text-xs text-[#6b7280]">Loyal Legend</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">{categoryCounts.risingTogether}</div>
                  <div className="text-xs text-[#6b7280]">Rising Together</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">{categoryCounts.communityChampion}</div>
                  <div className="text-xs text-[#6b7280]">Community Champion</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">{categoryCounts.matchDayMagic}</div>
                  <div className="text-xs text-[#6b7280]">Match Day Magic</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e7eb] rounded-lg text-center">
                  <div className="text-lg font-bold text-[#00105A]">{categoryCounts.nextGeneration}</div>
                  <div className="text-xs text-[#6b7280]">Next Generation</div>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Category:</label>
                <div className="relative">
                  <select 
                    value={fomCategory}
                    onChange={(e) => setFomCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    <option value="all">All Categories</option>
                    <option value="loyal_legend">Loyal Legend</option>
                    <option value="rising_together">Rising Together</option>
                    <option value="community_champion">Community Champion</option>
                    <option value="match_day_magic">Match Day Magic</option>
                    <option value="next_generation">Next Generation</option>
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
                    value={fomStatus}
                    onChange={(e) => setFomStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending Review</option>
                    <option value="featured">Featured This Month</option>
                    <option value="archive">Archive</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Fan Submission Review Cards */}
            <div className="space-y-4">
              <h4 className="font-medium text-[#00105A] m-0">Submission Review:</h4>
              {loadingFanOfMonth ? (
                <div className="text-center py-8 text-[#6b7280]">Loading fan of the month submissions...</div>
              ) : fanOfMonth.length === 0 ? (
                <div className="text-center py-8 text-[#6b7280]">No fan of the month submissions found for current filters</div>
              ) : (
                <div className="space-y-3">
                  {fanOfMonth.map((fan) => (
                    <div key={fan._id} className="bg-white border border-[#e5e7eb] rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium text-[#374151]">{fan.fanName}</div>
                          <div className="text-sm text-[#6b7280]">Category: {getCategoryDisplayName(fan.category)}</div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          fan.status === 'pending' ? 'bg-[#fef3c7] text-[#92400e]' :
                          fan.status === 'featured' ? 'bg-[#FFD700] text-[#00105A]' :
                          fan.status === 'approved' ? 'bg-[#dcfce7] text-[#15803d]' :
                          'bg-[#fecaca] text-[#dc2626]'
                        }`}>
                          {fan.status === 'pending' ? 'Pending' :
                           fan.status === 'featured' ? 'Featured' :
                           fan.status === 'approved' ? 'Approved' : 'Declined'}
                        </span>
                      </div>
                      <div className="text-sm text-[#374151] mb-3">
                        "{fan.story}"
                      </div>
                      <div className="text-xs text-[#6b7280] mb-3">
                        Word count: {countWords(fan.story)}/100 ✓ | {fan.photos?.length || 0} photos attached
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => updateFanOfMonthStatus(fan._id, 'featured')}
                          className="px-4 py-2 bg-[#FFD700] text-[#00105A] rounded text-sm font-medium hover:bg-yellow-300"
                        >
                          ⭐ Feature This Month
                        </button>
                        <button 
                          onClick={() => updateFanOfMonthStatus(fan._id, 'approved')}
                          className="px-4 py-2 bg-green-100 text-green-800 rounded text-sm font-medium hover:bg-green-200"
                        >
                          Archive
                        </button>
                        <button 
                          onClick={() => updateFanOfMonthStatus(fan._id, 'declined')}
                          className="px-4 py-2 bg-red-100 text-red-800 rounded text-sm font-medium hover:bg-red-200"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>5 Categories:</strong> Loyal Legend, Rising Together, Community Champion, Match Day Magic, Next Generation</li>
              <li>• <strong>Story Validation:</strong> 20-100 word requirement with real-time word count</li>
              <li>• <strong>Photo Management:</strong> Multiple images with featured selection capabilities</li>
              <li>• <strong>Monthly Cycle:</strong> Featured selection workflow with archive management</li>
              <li>• <strong>Cloudinary Integration:</strong> /fans/featured/ folder for Fan of the Month photos</li>
              <li>• <strong>Social Permissions:</strong> Explicit consent tracking for promotional use</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}