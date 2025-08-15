"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CommercialEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedType?: string;       // kept for compatibility, now ignored
  preSelectedPackage?: string;    // kept for compatibility, now ignored
  matchContext?: string;
}

export function CommercialEnquiryModal({
  isOpen,
  onClose,
  preSelectedType = "",
  preSelectedPackage = "",
  matchContext = "",
}: CommercialEnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    // interestType removed from UI; hardcoded at submit as "Partnership Opportunity"
    partnershipType: "",     // renamed from sponsorshipType in UI copy; payload key remains "sponsorshipType" for API compatibility
    budgetRange: "",
    durationInterest: "",
    // removed packageInterest/Group/Hospitality UI — keeping message and misc fields
    message: "",
    hearAboutUs: "",
    preferredContact: "email",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when modal opens (preserve message context if provided)
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        message: matchContext
          ? `Interested in partnership regarding: ${matchContext}`
          : prev.message,
      }));
      setErrors({});
      setSubmitSuccess(false);
    }
  }, [isOpen, matchContext]);

  if (!isOpen) return null;

  // Partnership Type options (formerly “Sponsorship Type”)
  const partnershipTypes = [
    { value: "principal", label: "Principal Partner" },
    { value: "main", label: "Main Partner" },
    { value: "official", label: "Official Partner" },
  ];

  // AED budget ranges
  const budgetRanges = [
    { value: "<100k", label: "<100,000 AED" },
    { value: "100-200k", label: "100,000–200,000 AED" },
    { value: ">200k", label: ">200,000 AED" },
    { value: "discuss", label: "Prefer to discuss" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.partnershipType) newErrors.partnershipType = "Please select partnership type";
    if (!formData.budgetRange) newErrors.budgetRange = "Please select budget range";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        // keep API field name "sponsorshipType" for backward compatibility
        sponsorshipType: formData.partnershipType,
        // hardcode interest type as requested
        interestType: "Partnership Opportunity",
        submittedAt: new Date().toISOString(),
        source: "commercial_page",
        matchContext: matchContext || null,
      };

      const response = await fetch("/api/commercial-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let result: any = {};
      try {
        result = await response.json();
      } catch {
        // no-op: non-JSON response
      }
      if (!response.ok) {
        throw new Error(result?.error || `Submission failed (${response.status})`);
      }

      setSubmitSuccess(true);

      // keep your existing auto-close behavior
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          partnershipType: "",
          budgetRange: "",
          durationInterest: "",
          message: "",
          hearAboutUs: "",
          preferredContact: "email",
        });
      }, 2000);
    } catch (error: any) {
      console.error("Submission error:", error);
      setErrors({ submit: error.message || "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="commercial-enquiry-title"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      {/* Modal Content */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-neutral-500 hover:text-brand-black transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header (on-brand) */}
            <div className="bg-brand-black text-white p-6 rounded-t-lg">
              <h2 id="commercial-enquiry-title" className="text-2xl font-bold font-heading">
                Partnership Enquiry
              </h2>
              <p className="mt-2 text-white/90">
                Tell us about your partnership goals and budget; we’ll respond within one business day.
              </p>
            </div>

            {/* Success State */}
            {submitSuccess && (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-2">Thank you!</h3>
                <p className="text-neutral-600">
                  Your enquiry has been received. Our commercial team will contact you shortly.
                </p>
              </div>
            )}

            {/* Form */}
            {!submitSuccess && (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all ${
                        errors.name ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-brand-black"
                      }`}
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-brand-black mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all ${
                        errors.company ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-brand-black"
                      }`}
                      placeholder="Your company name"
                      autoComplete="organization"
                    />
                    {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all ${
                        errors.email ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-brand-black"
                      }`}
                      placeholder="your.email@company.com"
                      autoComplete="email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-brand-black focus:ring-2 focus:ring-brand-gold/30 transition-all"
                      placeholder="+971 …"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Partnership Details */}
                <div className="bg-surface-2/50 p-4 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-brand-black">Partnership Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="partnershipType" className="block text-sm font-medium text-brand-black mb-2">
                        Partnership Type *
                      </label>
                      <select
                        id="partnershipType"
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all ${
                          errors.partnershipType ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-brand-black"
                        }`}
                      >
                        <option value="">Select type</option>
                        {partnershipTypes.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                      {errors.partnershipType && (
                        <p className="text-red-500 text-sm mt-1">{errors.partnershipType}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="budgetRange" className="block text-sm font-medium text-brand-black mb-2">
                        Budget Range (AED) *
                      </label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all ${
                          errors.budgetRange ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-brand-black"
                        }`}
                      >
                        <option value="">Select range</option>
                        {budgetRanges.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                      {errors.budgetRange && (
                        <p className="text-red-500 text-sm mt-1">{errors.budgetRange}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="durationInterest" className="block text-sm font-medium text-brand-black mb-2">
                      Duration Interest
                    </label>
                    <select
                      id="durationInterest"
                      name="durationInterest"
                      value={formData.durationInterest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-brand-black focus:ring-2 focus:ring-brand-gold/30 transition-all"
                    >
                      <option value="">Select duration</option>
                      <option value="single">Single season</option>
                      <option value="multi">Multi-season</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-brand-black focus:ring-2 focus:ring-brand-gold/30 resize-none transition-all"
                    placeholder="Tell us more about your goals or any specific questions…"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hearAboutUs" className="block text-sm font-medium text-brand-black mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      id="hearAboutUs"
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-brand-black focus:ring-2 focus:ring-brand-gold/30 transition-all"
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
                    <label htmlFor="preferredContact" className="block text-sm font-medium text-brand-black mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-brand-black focus:ring-2 focus:ring-brand-gold/30 transition-all"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="either">Either</option>
                    </select>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-4 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-neutral-300 text-brand-black rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                      isSubmitting
                        ? "bg-neutral-400 text-white cursor-not-allowed"
                        : "bg-brand-gold text-brand-black hover:bg-brand-gold/90 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Submit Enquiry"}
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
