import React from 'react';
import { AdminCard } from '@/components/ui/admin/AdminCard';

export function NewsManagementTab() {
  return (
    <div className="space-y-6">
      {/* News Article Creation */}
      <AdminCard title="📰 News Article Creation (🔥 High Priority) - Twice weekly minimum">
        <div className="space-y-4">
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            
            {/* Article Creation Form */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">✏️ Create New Article:</h4>
              <div className="space-y-4">
                
                {/* Article Title */}
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Article Title:</label>
                  <input 
                    type="text" 
                    placeholder="Enter article headline..."
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  />
                </div>

                {/* Category Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Category:</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                        <option>Select Category</option>
                        <option>Match Reports</option>
                        <option>Club News</option>
                        <option>Team News</option>
                        <option>Community News</option>
                        <option>Commercial News</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Publication Status:</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] appearance-none focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]">
                        <option>Draft</option>
                        <option>Published</option>
                        <option>Scheduled</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Featured Image:</label>
                  <div className="border-2 border-dashed border-[#e5e7eb] rounded-lg p-6 text-center hover:border-[#C5E7FF] transition-colors">
                    <div className="text-[#6b7280] mb-2">
                      <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#6b7280]">
                      <span className="font-medium text-[#00105A]">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-[#6b7280]">PNG, JPG up to 5MB</p>
                  </div>
                </div>

                {/* Rich Text Editor Placeholder */}
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Article Content:</label>
                  <div className="border border-[#e5e7eb] rounded-lg">
                    <div className="border-b border-[#e5e7eb] p-3 bg-[#f9fafb]">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6]">B</button>
                        <button className="px-3 py-1 text-sm bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6]">I</button>
                        <button className="px-3 py-1 text-sm bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6]">U</button>
                        <button className="px-3 py-1 text-sm bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6]">Link</button>
                        <button className="px-3 py-1 text-sm bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6]">Image</button>
                      </div>
                    </div>
                    <textarea 
                      rows={8}
                      placeholder="Start writing your article content here..."
                      className="w-full p-4 border-0 resize-none focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="mb-6">
              <h4 className="font-medium text-[#00105A] mb-4 m-0">🔍 SEO Settings:</h4>
              <div className="space-y-4 bg-white p-4 rounded-lg border border-[#e5e7eb]">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Meta Title:</label>
                  <input 
                    type="text" 
                    placeholder="SEO optimized title (60 characters max)"
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Meta Description:</label>
                  <textarea 
                    rows={3}
                    placeholder="Brief description for search engines (160 characters max)"
                    className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Social Sharing Image:</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-[#f3f4f6] rounded border border-[#e5e7eb] flex items-center justify-center">
                      <span className="text-xs text-[#6b7280]">1200x630</span>
                    </div>
                    <button className="px-4 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded text-sm text-[#374151] hover:bg-[#f3f4f6]">
                      Choose Image
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-[#f9fafb] border border-[#e5e7eb] rounded text-sm text-[#374151] hover:bg-[#f3f4f6]">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-[#C5E7FF] text-[#00105A] rounded text-sm font-medium hover:bg-opacity-80">
                  Preview
                </button>
              </div>
              <button className="px-6 py-2 bg-[#00105A] text-white rounded font-medium hover:bg-[#FFD700] hover:text-[#00105A] transition-colors">
                Publish Article
              </button>
            </div>
          </div>
          
          {/* Recent Articles */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-4 m-0">📚 Recent Articles:</h4>
            <div className="space-y-3">
              <div className="bg-white border border-[#e5e7eb] rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium text-[#374151]">Victory Against Forres Mechanics Extends Winning Streak</div>
                  <div className="text-sm text-[#6b7280]">Match Reports • Published 2 hours ago</div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                  <button className="text-[#6b7280] hover:text-[#374151] text-sm font-medium">View</button>
                </div>
              </div>
              <div className="bg-white border border-[#e5e7eb] rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium text-[#374151]">New Signing Announcement: Welcome Jamie Thomson</div>
                  <div className="text-sm text-[#6b7280]">Team News • Published 1 day ago</div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                  <button className="text-[#6b7280] hover:text-[#374151] text-sm font-medium">View</button>
                </div>
              </div>
              <div className="bg-white border border-[#e5e7eb] rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium text-[#374151]">Community Day at Spain Park - Huge Success</div>
                  <div className="text-sm text-[#6b7280]">Community News • Published 3 days ago</div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-[#00105A] hover:text-[#FFD700] text-sm font-medium">Edit</button>
                  <button className="text-[#6b7280] hover:text-[#374151] text-sm font-medium">View</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Requirements */}
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e5e7eb]">
            <h4 className="font-medium text-[#00105A] mb-2 m-0">Technical Requirements:</h4>
            <ul className="text-sm text-[#6b7280] space-y-1">
              <li>• <strong>Frequency:</strong> Twice weekly minimum content creation</li>
              <li>• <strong>Sanity CMS Integration:</strong> Direct article creation with auto-optimization</li>
              <li>• <strong>Categories:</strong> Match Reports, Club News, Team News, Community News, Commercial News</li>
              <li>• <strong>SEO Optimization:</strong> Meta titles, descriptions, social sharing images</li>
              <li>• <strong>Cloudinary Integration:</strong> Automatic image optimization and CDN delivery</li>
              <li>• <strong>Rich Text Editor:</strong> WYSIWYG editor with image embedding capabilities</li>
              <li>• <strong>Publication Workflow:</strong> Draft → Preview → Publish with scheduling options</li>
            </ul>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
