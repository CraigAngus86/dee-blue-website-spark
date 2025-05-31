"use client";
import React, { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoUploadModal({ isOpen, onClose }: PhotoUploadModalProps) {
  const [formData, setFormData] = useState({
    fanName: '',
    email: '',
    context: '',
    socialPermissions: {
      clubSocials: true,
      fanSharing: true
    }
  });
  
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      if (name === 'clubSocials' || name === 'fanSharing') {
        setFormData(prev => ({ 
          ...prev, 
          socialPermissions: {
            ...prev.socialPermissions,
            [name]: checked
          }
        }));
      }
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
    const file = e.target.files?.[0];
    
    if (file) {
      // Validate file
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum 5MB per photo.`);
        return;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert(`${file.name} is not a supported format. Please use JPG or PNG.`);
        return;
      }
      
      setSelectedPhoto(file);
      // Clear photo error if exists
      if (errors.photo) {
        setErrors(prev => ({ ...prev, photo: '' }));
      }
    }
  };

  // Remove selected photo
  const removePhoto = () => {
    setSelectedPhoto(null);
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fanName.trim()) newErrors.fanName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!selectedPhoto) newErrors.photo = 'Please select a photo to upload';
    if (!formData.context.trim()) newErrors.context = 'Photo context is required';
    if (countWords(formData.context) < 10) newErrors.context = 'Please provide at least 10 words describing the photo';

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
      apiFormData.append('context', formData.context);
      apiFormData.append('clubSocials', formData.socialPermissions.clubSocials.toString());
      apiFormData.append('fanSharing', formData.socialPermissions.fanSharing.toString());
      
      // Add photo
      if (selectedPhoto) {
        apiFormData.append('photo', selectedPhoto);
      }
      
      // Submit to API
      const response = await fetch('/api/fan-photo', {
        method: 'POST',
        body: apiFormData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Photo upload failed');
      }
      
      // Success - show success message and close modal
      alert(result.message || 'Thank you! Your photo has been submitted for review.');
      
      // Reset form and close
      setFormData({
        fanName: '',
        email: '',
        context: '',
        socialPermissions: {
          clubSocials: true,
          fanSharing: true
        }
      });
      setSelectedPhoto(null);
      setErrors({});
      onClose();
      
    } catch (error) {
      console.error('Photo upload error:', error);
      alert(error.message || 'Sorry, there was an error uploading your photo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contextWordCount = countWords(formData.context);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center">
      <div className="relative max-w-4xl w-full max-h-[95vh] bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-[#f5f7fb] z-40 flex justify-between items-center px-4">
          <div className="flex items-center">
            <h2 className="text-sm font-medium text-[#00105A]">Share Your Matchday Photo</h2>
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
            
            {/* Photo Guidelines */}
            <div className="mb-6 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <h3 className="text-sm font-medium text-[#00105A] mb-2">Photo Guidelines:</h3>
              <ul className="text-sm text-[#6b7280] space-y-1">
                <li>• High resolution preferred</li>
                <li>• Good lighting and clear subjects</li>
                <li>• Club-related content only</li>
                <li>• Landscape orientation works best</li>
              </ul>
            </div>

            {/* Photo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#00105A] mb-2">
                Your Photo <span className="text-red-500">*</span>
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                errors.photo ? 'border-red-500' : 'border-[#e5e7eb]'
              }`}>
                <Upload className="mx-auto h-12 w-12 text-[#6b7280] mb-4" />
                <div className="text-sm text-[#6b7280] mb-2">
                  Drag and drop photo here, or click to browse
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handlePhotoSelect}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="inline-block bg-[#C5E7FF] text-[#00105A] px-4 py-2 rounded cursor-pointer hover:bg-[#b3deff] transition-colors"
                >
                  Choose Photo
                </label>
                <div className="text-xs text-[#6b7280] mt-2">
                  Maximum 5MB. JPG or PNG format.
                </div>
              </div>
              {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}

              {/* Selected photo preview */}
              {selectedPhoto && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-[#00105A] mb-2">Selected Photo:</div>
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(selectedPhoto)}
                      alt="Selected photo preview"
                      className="w-32 h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                  <div className="text-xs text-[#6b7280] mt-1">{selectedPhoto.name}</div>
                </div>
              )}
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

            {/* Photo Context */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#00105A] mb-2">
                Photo Context <span className="text-red-500">*</span>
              </label>
              <textarea
                name="context"
                value={formData.context}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 resize-none ${
                  errors.context 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-[#e5e7eb] focus:border-[#00105A] focus:ring-[#00105A]'
                }`}
                placeholder="e.g., 'Match vs Huntly, celebrating goal in 85th minute'"
              />
              <div className="flex justify-between text-sm mt-1">
                {errors.context ? (
                  <p className="text-red-500">{errors.context}</p>
                ) : (
                  <p className="text-[#6b7280]">Briefly describe when/where this photo was taken</p>
                )}
                <p className="text-[#6b7280]">{contextWordCount} words</p>
              </div>
            </div>

            {/* Social Media Permissions */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#00105A] mb-3">
                Social Media Permissions
              </label>
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="clubSocials"
                    checked={formData.socialPermissions.clubSocials}
                    onChange={handleInputChange}
                    className="mt-1 text-[#00105A] focus:ring-[#00105A]"
                  />
                  <div className="text-sm">
                    <div className="font-medium text-[#00105A]">Club Social Media Use</div>
                    <div className="text-[#6b7280]">Allow Banks o' Dee FC to share this photo on official social media</div>
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="fanSharing"
                    checked={formData.socialPermissions.fanSharing}
                    onChange={handleInputChange}
                    className="mt-1 text-[#00105A] focus:ring-[#00105A]"
                  />
                  <div className="text-sm">
                    <div className="font-medium text-[#00105A]">Fan Sharing Allowed</div>
                    <div className="text-[#6b7280]">Allow other fans to share this photo on social media</div>
                  </div>
                </label>
              </div>
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
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    <span>Upload Photo</span>
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

export default PhotoUploadModal;
