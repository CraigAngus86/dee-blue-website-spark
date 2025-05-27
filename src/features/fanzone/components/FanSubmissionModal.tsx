"use client";
import React, { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';

interface FanSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FanSubmissionModal({ isOpen, onClose }: FanSubmissionModalProps) {
  const [formData, setFormData] = useState({
    fanName: '',
    email: '',
    phone: '',
    category: '',
    story: '',
    supporterSince: '',
    socialPermissions: false
  });
  
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Category options matching our Sanity schema
  const categories = [
    { value: 'loyal_legend', label: 'Loyal Legend', description: 'Multi-decade supporters' },
    { value: 'rising_together', label: 'Rising Together', description: 'Fans celebrating club ambition' },
    { value: 'community_champion', label: 'Community Champion', description: 'Fans promoting the club' },
    { value: 'match_day_magic', label: 'Match Day Magic', description: 'Great atmosphere/moment captures' },
    { value: 'next_generation', label: 'Next Generation', description: 'Young/new fans' }
  ];

  if (!isOpen) return null;

  // Function to count words properly
  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle photo selection
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate files
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum 5MB per photo.`);
        return false;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert(`${file.name} is not a supported format. Please use JPG or PNG.`);
        return false;
      }
      return true;
    });

    // Limit to 5 photos total
    const newPhotos = [...selectedPhotos, ...validFiles].slice(0, 5);
    setSelectedPhotos(newPhotos);
  };

  // Remove selected photo
  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fanName.trim()) newErrors.fanName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.story.trim()) newErrors.story = 'Your story is required';
    if (countWords(formData.story) < 100) newErrors.story = 'Please write at least 100 words';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for API submission
      const apiFormData = new FormData();
      
      // Add text fields
      apiFormData.append('fanName', formData.fanName);
      apiFormData.append('email', formData.email);
      apiFormData.append('phone', formData.phone);
      apiFormData.append('category', formData.category);
      apiFormData.append('story', formData.story);
      apiFormData.append('supporterSince', formData.supporterSince);
      apiFormData.append('socialPermissions', formData.socialPermissions.toString());
      
      // Add photos
      selectedPhotos.forEach((photo, index) => {
        apiFormData.append(`photo_${index}`, photo);
      });
      
      // Submit to API
      const response = await fetch('/api/fan-submission', {
        method: 'POST',
        body: apiFormData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }
      
      // Success - show success message and close modal
      alert(result.message || 'Thank you! Your submission has been received.');
      
      // Reset form and close
      setFormData({
        fanName: '',
        email: '',
        phone: '',
        category: '',
        story: '',
        supporterSince: '',
        socialPermissions: false
      });
      setSelectedPhotos([]);
      setErrors({});
      onClose();
      
    } catch (error) {
      console.error('Submission error:', error);
      alert(error.message || 'Sorry, there was an error submitting your story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = countWords(formData.story);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center">
      <div className="relative max-w-4xl w-full max-h-[95vh] bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-[#f5f7fb] z-40 flex justify-between items-center px-4">
          <div className="flex items-center">
            <h2 className="text-sm font-medium text-[#00105A]">Become Fan of the Month</h2>
          </div>
          
          <button 
            className="text-[#00105A] hover:text-[#FFD700] transition-colors"
            onClick={onClose}
          >
            <X size={22} />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Form content */}
        <div className="overflow-y-auto max-h-[95vh] pt-12">
          <form onSubmit={handleSubmit} className="p-6">
            
            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#00105A] mb-3">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                {categories.map(category => (
                  <label key={category.value} className="flex items-start space-x-3 p-3 border border-[#e5e7eb] rounded-lg hover:bg-[#f9fafb] cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={handleInputChange}
                      className="mt-1 text-[#00105A] focus:ring-[#00105A]"
                    />
                    <div>
                      <div className="font-medium text-[#00105A]">{category.label}</div>
                      <div className="text-sm text-[#6b7280]">{category.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#00105A] mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fanName"
                  value={formData.fanName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 ${
                    errors.fanName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-[#e5e7eb] focus:border-[#00105A] focus:ring-[#00105A]'
                  }`}
                  placeholder="Enter your name"
                />
                {errors.fanName && <p className="text-red-500 text-sm mt-1">{errors.fanName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#00105A] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-[#e5e7eb] focus:border-[#00105A] focus:ring-[#00105A]'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#00105A] mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#00105A] focus:ring-1 focus:ring-[#00105A]"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#00105A] mb-2">
                  Supporter Since (Optional)
                </label>
                <input
                  type="number"
                  name="supporterSince"
                  value={formData.supporterSince}
                  onChange={handleInputChange}
                  min="1902"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#00105A] focus:ring-1 focus:ring-[#00105A]"
                  placeholder="e.g. 1995"
                />
              </div>
            </div>

            {/* Story */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#00105A] mb-2">
                Your Banks o' Dee Story <span className="text-red-500">*</span>
              </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 resize-none ${
                  errors.story 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-[#e5e7eb] focus:border-[#00105A] focus:ring-[#00105A]'
                }`}
                placeholder="Tell us your Banks o' Dee story... (minimum 100 words)"
              />
              <div className="flex justify-between text-sm mt-1">
                {errors.story ? (
                  <p className="text-red-500">{errors.story}</p>
                ) : (
                  <p className="text-[#6b7280]">Minimum 100 words</p>
                )}
                <p className="text-[#6b7280]">{wordCount} words</p>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#00105A] mb-2">
                Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-[#e5e7eb] rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-[#6b7280] mb-4" />
                <div className="text-sm text-[#6b7280] mb-2">
                  Drag and drop photos here, or click to browse
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handlePhotoSelect}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="inline-block bg-[#C5E7FF] text-[#00105A] px-4 py-2 rounded cursor-pointer hover:bg-[#b3deff] transition-colors"
                >
                  Choose Photos
                </label>
                <div className="text-xs text-[#6b7280] mt-2">
                  Maximum 5 photos, 5MB each. JPG or PNG format.
                </div>
              </div>

              {/* Selected photos preview */}
              {selectedPhotos.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-[#00105A] mb-2">
                    Selected Photos ({selectedPhotos.length}/5)
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedPhotos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Selected photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Permissions */}
            <div className="mb-6">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="socialPermissions"
                  checked={formData.socialPermissions}
                  onChange={handleInputChange}
                  className="mt-1 text-[#00105A] focus:ring-[#00105A]"
                />
                <div className="text-sm">
                  <div className="font-medium text-[#00105A]">Social Media Permissions</div>
                  <div className="text-[#6b7280]">
                    I give permission for Banks o' Dee FC to feature my story and photos on social media and the club website.
                  </div>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-[#e5e7eb] text-[#6b7280] rounded hover:bg-[#f9fafb] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#FFD700] text-[#00105A] rounded font-semibold hover:bg-[#f3d54a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#00105A] border-t-transparent"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Submit Story</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FanSubmissionModal;
