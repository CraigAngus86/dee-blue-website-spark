"use client";
import React, { useState, useEffect } from 'react';
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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  // Form validation - 20-60 word range
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fanName.trim()) newErrors.fanName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.story.trim()) newErrors.story = 'Your story is required';
    
    // 20-60 word range validation
    const wordCount = countWords(formData.story);
    if (wordCount < 20) {
      newErrors.story = 'Please write at least 20 words';
    } else if (wordCount > 60) {
      newErrors.story = 'Please keep your story under 60 words';
    }

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
      
    } catch (error: any) {
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
        {/* Header bar - Baynounah branded with WARM GRAY */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-[#F8F6F2] z-40 flex justify-between items-center px-4">
          <div className="flex items-center">
            <h2 className="text-sm font-medium text-text-strong">Become Fan of the Month</h2>
          </div>
          
          <button 
            className="text-text-strong hover:text-brand-gold transition-colors"
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
              <label className="block text-sm font-medium text-text-strong mb-3">
                Category <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                {categories.map(category => (
                  <label key={category.value} className="flex items-start space-x-3 p-3 border border-separator rounded-lg hover:bg-[#F8F6F2] cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={handleInputChange}
                      className="mt-1 text-brand-gold focus:ring-brand-gold accent-brand-gold"
                    />
                    <div>
                      <div className="font-medium text-text-strong">{category.label}</div>
                      <div className="text-sm text-text-muted">{category.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.category && <p className="text-error text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-strong mb-2">
                  Your Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="fanName"
                  value={formData.fanName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 ${
                    errors.fanName 
                      ? 'border-error focus:border-error focus:ring-error' 
                      : 'border-separator focus:border-brand-gold focus:ring-brand-gold'
                  }`}
                  placeholder="Enter your name"
                />
                {errors.fanName && <p className="text-error text-sm mt-1">{errors.fanName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-strong mb-2">
                  Email <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 ${
                    errors.email 
                      ? 'border-error focus:border-error focus:ring-error' 
                      : 'border-separator focus:border-brand-gold focus:ring-brand-gold'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-strong mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-separator rounded focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-strong mb-2">
                  Supporter Since (Optional)
                </label>
                <input
                  type="number"
                  name="supporterSince"
                  value={formData.supporterSince}
                  onChange={handleInputChange}
                  min="1902"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-separator rounded focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  placeholder="e.g. 1995"
                />
              </div>
            </div>

            {/* Story - Updated branding */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-strong mb-2">
                Your Baynounah Story <span className="text-error">*</span>
              </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 resize-none ${
                  errors.story 
                    ? 'border-error focus:border-error focus:ring-error' 
                    : 'border-separator focus:border-brand-gold focus:ring-brand-gold'
                }`}
                placeholder="Tell us your Baynounah story... (20-60 words)"
              />
              <div className="flex justify-between text-sm mt-1">
                {errors.story ? (
                  <p className="text-error">{errors.story}</p>
                ) : (
                  <p className="text-text-muted">20-60 words</p>
                )}
                <p className={`${
                  wordCount < 20 ? 'text-error' : 
                  wordCount > 60 ? 'text-error' : 
                  'text-text-muted'
                }`}>
                  {wordCount} words
                </p>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-strong mb-2">
                Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-separator rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-text-muted mb-4" />
                <div className="text-sm text-text-muted mb-2">
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
                  className="inline-block bg-brand-gold text-brand-black px-4 py-2 rounded cursor-pointer hover:bg-brand-black hover:text-brand-gold border-2 border-brand-gold hover:border-brand-black transition-all duration-200"
                >
                  Choose Photos
                </label>
                <div className="text-xs text-text-muted mt-2">
                  Maximum 5 photos, 5MB each. JPG or PNG format.
                </div>
              </div>

              {/* Selected photos preview */}
              {selectedPhotos.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-text-strong mb-2">
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
                          className="absolute -top-2 -right-2 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Permissions - Updated branding */}
            <div className="mb-6">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="socialPermissions"
                  checked={formData.socialPermissions}
                  onChange={handleInputChange}
                  className="mt-1 text-brand-gold focus:ring-brand-gold accent-brand-gold"
                />
                <div className="text-sm">
                  <div className="font-medium text-text-strong">Allow Baynounah SC to share this content on social media</div>
                  <div className="text-text-muted">
                    Permission for the club to use this story and photos on official social media channels
                  </div>
                </div>
              </label>
            </div>

            {/* Submit Button - Baynounah branded */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-separator text-text-muted rounded hover:bg-[#F8F6F2] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-brand-gold text-brand-black border-2 border-brand-gold rounded font-semibold hover:bg-brand-black hover:text-brand-gold hover:border-brand-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-black border-t-transparent"></div>
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