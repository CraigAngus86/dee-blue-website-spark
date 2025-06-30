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

interface NewsManagementTabProps {
  initialData?: {
    articles: any[];
    pagination: any;
  };
}

export function NewsManagementTab({ initialData }: NewsManagementTabProps) {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: 'add',
    recordId: null
  });

  const [articles, setArticles] = useState(initialData?.articles || []);
  const [pagination, setPagination] = useState(initialData?.pagination || { page: 1, pageSize: 25, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    dateRange: 'all'
  });

  // Categories from our API (NEWS ONLY - NO MATCH REPORTS)
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'clubNews', label: 'Club News' },
    { value: 'teamNews', label: 'Team News' },
    { value: 'communityNews', label: 'Community News' },
    { value: 'commercialNews', label: 'Commercial News' }
  ];

  // Status options
  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'scheduled', label: 'Scheduled' }
  ];

  // Date ranges
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'lastyear', label: 'Last Year' }
  ];

  // Fetch articles data
  const fetchArticles = async (page = 1, newFilters = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: '25',
        ...(newFilters.category !== 'all' && { category: newFilters.category }),
        ...(newFilters.status !== 'all' && { status: newFilters.status }),
        ...(newFilters.dateRange !== 'all' && { dateRange: newFilters.dateRange })
      });

      const response = await fetch(`/api/admin/news?${params}`);
      const data = await response.json();

      if (data.success) {
        setArticles(data.articles);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    if (!initialData) {
      fetchArticles(1, filters);
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
    console.log('Article operation successful - refreshing table...');
    fetchArticles(pagination.page); // Refresh current page
    closeModal();
  };

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    fetchArticles(1, newFilters); // Reset to page 1 with new filters
  };

  const handlePageChange = (newPage: number) => {
    fetchArticles(newPage);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  // Get visual indicator for status
  const getStatusIndicator = (article: any) => {
    if (!article.publishedAt) {
      return <span className="text-orange-500 text-lg">📝</span>; // Draft
    }
    
    const publishDate = new Date(article.publishedAt);
    const now = new Date();
    
    if (publishDate <= now) {
      return <span className="text-green-600 text-lg">✓</span>; // Published
    } else {
      return <span className="text-blue-500 text-lg">⏰</span>; // Scheduled
    }
  };

  // Get visual indicator for optional fields
  const getOptionalIndicator = (value: any) => {
    return value 
      ? <span className="text-green-600 text-lg">✓</span>
      : <span className="text-red-500 text-lg">✗</span>;
  };

  // Format category for display
  const formatCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'clubNews': 'Club News',
      'teamNews': 'Team News',
      'communityNews': 'Community News',
      'commercialNews': 'Commercial News'
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="space-y-6">
      {/* News Management */}
      <AdminCard title="News Management">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Filter Controls + Add Button - SAME ROW */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Category:</label>
                <div className="relative">
                  <select 
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
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
                <label className="block text-sm font-medium text-[#374151] mb-2">Date Range:</label>
                <div className="relative">
                  <select 
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  >
                    {dateRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
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

              {/* Add New Article Button - SAME ROW */}
              <div className="flex items-end">
                <button 
                  onClick={() => openModal('add')}
                  className="w-full px-4 py-3 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] font-medium transition-colors"
                >
                  + Add New Article
                </button>
              </div>
            </div>
              
            {/* Articles Table - DYNAMIC */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white">
              <div className="overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b border-[#e5e7eb]">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Title</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Category</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Author</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-[#374151]">Published</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Status</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Image</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">SEO</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-[#374151]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-[#6b7280]">
                          Loading articles...
                        </td>
                      </tr>
                    ) : articles.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-[#6b7280]">
                          No articles found for current filters
                        </td>
                      </tr>
                    ) : (
                      articles.map((article: any) => (
                        <tr key={article._id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                          <td className="p-4 align-middle">
                            <div className="text-[#374151] font-medium max-w-xs leading-5">
                              {article.title}
                            </div>
                          </td>
                          <td className="p-4 align-middle text-[#374151]">{formatCategory(article.category)}</td>
                          <td className="p-4 align-middle text-[#374151]">{article.author}</td>
                          <td className="p-4 align-middle text-[#374151]">{formatDate(article.publishedAt)}</td>
                          <td className="p-4 align-middle text-center">
                            {getStatusIndicator(article)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            {getOptionalIndicator(article.mainImage)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            {getOptionalIndicator(article.seo?.metaTitle || article.seo?.metaDescription)}
                          </td>
                          <td className="p-4 align-middle text-center">
                            <div className="flex justify-center space-x-2">
                              <button 
                                onClick={() => openModal('edit', article._id)}
                                className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => openModal('delete', article._id)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
              
            {/* Pagination Controls - DYNAMIC */}
            <div className="flex items-center justify-between px-2 mt-4">
              <div className="text-sm text-[#6b7280]">
                Showing {pagination.pageSize * (pagination.page - 1) + 1}-{Math.min(pagination.pageSize * pagination.page, pagination.total)} of {pagination.total} articles
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
          </div>
          
          {/* User Instructions */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-3 m-0">📰 News Management System - Live CMS</h4>
            
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-3 mb-4">
              <p className="text-[#dc2626] text-sm font-medium m-0">
                🔴 IMPORTANT: All changes save instantly to Sanity CMS and cannot be reversed.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-[#00105A] text-sm mb-2 m-0">📋 HOW TO USE:</h5>
                <ul className="text-sm text-[#6b7280] space-y-1 pl-4">
                  <li>• <strong>Filter Articles:</strong> Use Category, Status, and Date Range dropdowns to find specific articles</li>
                  <li>• <strong>Add New Article:</strong> Click "+ Add New Article" button to create news content</li>
                  <li>• <strong>Edit Article:</strong> Click "Edit" to update title, content, images, and publication settings</li>
                  <li>• <strong>Delete Article:</strong> Click "Delete" to permanently remove an article (use with caution)</li>
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-[#00105A] text-sm mb-2 m-0">✅ CURRENT DATA:</h5>
                <ul className="text-sm text-[#6b7280] space-y-1 pl-4">
                  <li>• <strong>{pagination.total} articles</strong> loaded from Sanity CMS (news only)</li>
                  <li>• <strong>Showing newest first</strong> with descending publication date order</li>
                  <li>• <strong>Real-time content</strong> across 4 news categories with SEO optimization</li>
                  <li>• <strong>Server-side pagination</strong> active (25 articles per page)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* AdminModal Integration */}
      <AdminModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        entityType="news"
        mode={modalState.mode}
        recordId={modalState.recordId}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
