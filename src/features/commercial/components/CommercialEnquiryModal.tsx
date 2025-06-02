"use client";
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CommercialEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedType?: string;
  preSelectedPackage?: string;
  matchContext?: string;
}

export function CommercialEnquiryModal({ 
  isOpen, 
  onClose, 
  preSelectedType = '',
  preSelectedPackage = '',
  matchContext = ''
}: CommercialEnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interestType: preSelectedType || '',
    sponsorshipType: '',
    budgetRange: '',
    durationInterest: '',
    packageInterest: preSelectedPackage || '',
    groupSize: '',
    preferredMatches: '',
    message: '',
    hearAboutUs: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when modal opens with new context
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        interestType: preSelectedType || prev.interestType,
        packageInterest: preSelectedPackage || prev.packageInterest,
        message: matchContext ? `Interested in hospitality for: ${matchContext}` : prev.message
      }));
      setErrors({});
      setSubmitSuccess(false);
    }
  }, [isOpen, preSelectedType, preSelectedPackage, matchContext]);

  if (!isOpen) return null;

  const interestTypes = [
    { value: 'sponsorship', label: 'Sponsorship Opportunities' },
    { value: 'hospitality', label: 'Match Day Hospitality' },
    { value: 'both', label: 'Both Sponsorship & Hospitality' },
    { value: 'other', label: 'Other Commercial Opportunity' }
  ];

  const sponsorshipTypes = [
    { value: 'perimeter', label: 'Perimeter Boards' },
    { value: 'player', label: 'Player Sponsorship' },
    { value: 'kit', label: 'Kit Branding' },
    { value: 'multiple', label: 'Multiple Options' }
  ];

  const budgetRanges = [
    { value: 'under1000', label: 'Under £1,000' },
    { value: '1000-3000', label: '£1,000-£3,000' },
    { value: 'over3000', label: '£3,000+' },
    { value: 'discuss', label: 'Prefer to discuss' }
  ];

  const hospitalityPackages = [
    { value: 'matchday', label: 'Match Day Sponsorship' },
    { value: 'matchball', label: 'Matchball Sponsorship' },
    { value: 'standard', label: 'Standard Hospitality' },
    { value: 'group', label: 'Group Booking' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.interestType) newErrors.interestType = 'Please select your interest type';

    // Conditional validation based on interest type
    if (formData.interestType === 'sponsorship' || formData.interestType === 'both') {
      if (!formData.sponsorshipType) newErrors.sponsorshipType = 'Please select sponsorship type';
      if (!formData.budgetRange) newErrors.budgetRange = 'Please select budget range';
    }

    if (formData.interestType === 'hospitality' || formData.interestType === 'both') {
      if (!formData.packageInterest) newErrors.packageInterest = 'Please select package interest';
      if (!formData.groupSize) newErrors.groupSize = 'Please specify group size';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/commercial-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          source: 'commercial_page',
          matchContext: matchContext || null
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          interestType: '',
          sponsorshipType: '',
          budgetRange: '',
          durationInterest: '',
          packageInterest: '',
          groupSize: '',
          preferredMatches: '',
          message: '',
          hearAboutUs: '',
          preferredContact: 'email'
        });
      }, 2000);

    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: error.message || 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSponsorshipFields = formData.interestType === 'sponsorship' || formData.interestType === 'both';
  const showHospitalityFields = formData.interestType === 'hospitality' || formData.interestType === 'both';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-[#6b7280] hover:text-[#00105A] transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="bg-[#00105A] text-white p-6 rounded-t-lg">
              <h2 className="text-2xl font-bold font-montserrat">
                Commercial Enquiry
              </h2>
              <p className="mt-2 opacity-90">
                Tell us about your partnership interests and we'll get back to you soon.
              </p>
            </div>

            {/* Success State */}
            {submitSuccess && (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#00105A] mb-2">Thank You!</h3>
                <p className="text-[#6b7280]">
                  Your enquiry has been received. Our commercial team will contact you within 24 hours.
                </p>
              </div>
            )}

            {/* Form */}
            {!submitSuccess && (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#374151] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] transition-all ${
                        errors.name ? 'border-[#ef4444] focus:border-[#ef4444]' : 'border-[#e5e7eb] focus:border-[#00105A]'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-[#ef4444] text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[#374151] mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] transition-all ${
                        errors.company ? 'border-[#ef4444] focus:border-[#ef4444]' : 'border-[#e5e7eb] focus:border-[#00105A]'
                      }`}
                      placeholder="Your company name"
                    />
                    {errors.company && <p className="text-[#ef4444] text-sm mt-1">{errors.company}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#374151] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] transition-all ${
                        errors.email ? 'border-[#ef4444] focus:border-[#ef4444]' : 'border-[#e5e7eb] focus:border-[#00105A]'
                      }`}
                      placeholder="your.email@company.com"
                    />
                    {errors.email && <p className="text-[#ef4444] text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#374151] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#00105A] focus:ring-2 focus:ring-[#C5E7FF] transition-all"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                {/* Interest Type */}
                <div>
                  <label htmlFor="interestType" className="block text-sm font-medium text-[#374151] mb-2">
                    Interest Type *
                  </label>
                  <select
                    id="interestType"
                    name="interestType"
                    value={formData.interestType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] transition-all ${
                      errors.interestType ? 'border-[#ef4444] focus:border-[#ef4444]' : 'border-[#e5e7eb] focus:border-[#00105A]'
                    }`}
                  >
                    <option value="">Select your interest</option>
                    {interestTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.interestType && <p className="text-[#ef4444] text-sm mt-1">{errors.interestType}</p>}
                </div>

                {/* Sponsorship Fields */}
                {showSponsorshipFields && (
                  <div className="bg-[#f9fafb] p-4 rounded-lg space-y-4">
                    <h3 className="text-lg font-semibold text-[#00105A]">Sponsorship Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="sponsorshipType" className="block text-sm font-medium text-[#374151] mb-2">
                          Sponsorship Type *
                        </label>
                        <select
                          id="sponsorshipType"
                          name="sponsorshipType"
                          value={formData.sponsorshipType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] transition-all ${
                            errors.sponsorshipType ? 'border-[#ef4444] focus:border-[#ef4444]' : 'border-[#e5e7eb] focus:border-[#00105A]'
                          }`}
                        >
                          <option value="">Select type</option>
                          {sponsorshipTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                        {errors.sponsorshipType && <p className="text-[#ef4444] text-sm mt-1">{errors.sponsorshipType}</p>}
                      </div>

                      <div>
                        <label htmlFor="budgetRange" className="block text-sm font-medium text-[#374151] mb-2">
                          Budget Range *
                        </label>
                        <select
                          id="budgetRange"
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] transition-all ${
                            errors.budgetRange ? 'border-[#ef4444] focus:border-[#ef4444]' : 'border-[#e5e7eb] focus:border-[#00105A]'
                          }`}
                        >
                          <option value="">Select range</option>
                          {budgetRanges.map(range => (
                            <option key={range.value} value={range.value}>{range.label}</option>
                          ))}
                        </select>
                        {errors.budgetRange && <p className="text-[#ef4444] text-sm mt-1">{errors.budgetRange}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="durationInterest" className="block text-sm font-medium text-[#374151] mb-2">
                        Duration Interest
                      </label>
                      <select
                        id="durationInterest"
                        name="durationInterest"
                        value={formData.durationInterest}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#00105A] focus:ring-2 focus:ring-[#C5E7FF] transition-all"
                      >
                        <option value="">Select duration</option>
                        <option value="single">Single season</option>
                        <option value="multi">Multi-season</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Hospitality Fields */}
                {showHospitalityFields && (
                  <div className="bg-[#f9fafb] p-4 rounded-lg space-y-4">
                    <h3 className="text-lg font-semibold text-[#00105A]">Hospitality Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="packageInterest" className="block text-sm font-medium text-[#374151] mb-2">
                          Package Interest *
                        </label>
                        <select
                          id="packageInterest"
                          name="packageInterest"
                          value={formData.packageInterest}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] transition-all ${
                            errors.packageInterest ? 'border-[#ef4444] focus:border-[#ef4444]' : 'border-[#e5e7eb] focus:border-[#00105A]'
                          }`}
                        >
                          <option value="">Select package</option>
                          {hospitalityPackages.map(pkg => (
                            <option key={pkg.value} value={pkg.value}>{pkg.label}</option>
                          ))}
                        </select>
                        {errors.packageInterest && <p className="text-[#ef4444] text-sm mt-1">{errors.packageInterest}</p>}
                      </div>

                      <div>
                        <label htmlFor="groupSize" className="block text-sm font-medium text-[#374151] mb-2">
                          Group Size *
                        </label>
                        <select
                          id="groupSize"
                          name="groupSize"
                          value={formData.groupSize}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] transition-all ${
                            errors.groupSize ? 'border-[#ef4444] focus:border-[#ef4444]' : 'border-[#e5e7eb] focus:border-[#00105A]'
                          }`}
                        >
                          <option value="">Select size</option>
                          <option value="1-2">1-2 people</option>
                          <option value="3-5">3-5 people</option>
                          <option value="6-10">6-10 people</option>
                          <option value="11-20">11-20 people</option>
                          <option value="20+">20+ people</option>
                        </select>
                        {errors.groupSize && <p className="text-[#ef4444] text-sm mt-1">{errors.groupSize}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="preferredMatches" className="block text-sm font-medium text-[#374151] mb-2">
                        Preferred Matches
                      </label>
                      <select
                        id="preferredMatches"
                        name="preferredMatches"
                        value={formData.preferredMatches}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#00105A] focus:ring-2 focus:ring-[#C5E7FF] transition-all"
                      >
                        <option value="">Any available</option>
                        <option value="highland">Highland League</option>
                        <option value="cup">Cup Ties</option>
                        <option value="key">Key Fixtures</option>
                        <option value="specific">Specific dates (please specify in message)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#374151] mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#00105A] focus:ring-2 focus:ring-[#C5E7FF] resize-none transition-all"
                    placeholder="Tell us more about your requirements or any specific questions..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hearAboutUs" className="block text-sm font-medium text-[#374151] mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      id="hearAboutUs"
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#00105A] focus:ring-2 focus:ring-[#C5E7FF] transition-all"
                    >
                      <option value="">Select option</option>
                      <option value="website">Website</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Referral</option>
                      <option value="event">Match/Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferredContact" className="block text-sm font-medium text-[#374151] mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#e5e7eb] rounded-lg focus:outline-none focus:border-[#00105A] focus:ring-2 focus:ring-[#C5E7FF] transition-all"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="either">Either</option>
                    </select>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="text-[#ef4444] text-sm bg-[#fef2f2] p-3 rounded-lg border border-[#fecaca]">
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-4 border-t border-[#e5e7eb]">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-[#d1d5db] text-[#374151] rounded-lg hover:bg-[#f9fafb] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                      isSubmitting
                        ? 'bg-[#9ca3af] text-white cursor-not-allowed'
                        : 'bg-[#FFD700] text-[#00105A] hover:bg-[#f1c40f] shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
