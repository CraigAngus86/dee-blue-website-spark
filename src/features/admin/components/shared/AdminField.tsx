import React from 'react';
import { FieldConfig } from './schemas/matchSchema';

interface AdminFieldProps {
  field: FieldConfig;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  mode?: 'add' | 'edit' | 'delete'; // NEW: Pass mode to determine read-only state
}

export function AdminField({ field, value, onChange, error, mode = 'add' }: AdminFieldProps) {
  // Determine if field should be read-only
  const isReadOnly = mode === 'edit' && field.readOnlyInEdit;
  
  const fieldProps = {
    value: value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      if (isReadOnly) return; // Prevent changes if read-only
      const newValue = field.type === 'boolean' ? (e.target as HTMLInputElement).checked : e.target.value;
      onChange(newValue);
    },
    placeholder: field.placeholder,
    required: field.required,
    disabled: isReadOnly, // NEW: Disable if read-only
  };

  // Different styling for read-only fields
  const fieldClassName = `w-full px-4 py-3 border border-[#e5e7eb] rounded focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A] ${
    error ? 'border-red-500' : ''
  } ${
    isReadOnly 
      ? 'bg-[#f9fafb] text-[#9ca3af] cursor-not-allowed' // Grayed out for read-only
      : 'bg-white text-[#374151]' // Normal styling
  }`;

  switch (field.type) {
    case 'select':
      return (
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
            {isReadOnly && <span className="text-[#9ca3af] ml-1">(Read-only)</span>}
          </label>
          <div className="relative">
            <select 
              {...fieldProps} 
              className={`${fieldClassName} appearance-none`}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className={`w-4 h-4 ${isReadOnly ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      );
      
    case 'boolean':
      return (
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => {
              if (!isReadOnly) onChange(e.target.checked);
            }}
            disabled={isReadOnly}
            className={`w-4 h-4 border-gray-300 rounded focus:ring-[#C5E7FF] focus:ring-2 ${
              isReadOnly 
                ? 'bg-[#f9fafb] text-[#9ca3af] cursor-not-allowed' 
                : 'text-[#00105A] bg-gray-100'
            }`}
          />
          <label className="text-sm font-medium text-[#374151]">
            {field.label}
            {isReadOnly && <span className="text-[#9ca3af] ml-1">(Read-only)</span>}
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      );
      
    case 'date':
      return (
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
            {isReadOnly && <span className="text-[#9ca3af] ml-1">(Read-only)</span>}
          </label>
          <input
            type="date"
            {...fieldProps}
            className={fieldClassName}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      );
      
    case 'time':
      return (
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
            {isReadOnly && <span className="text-[#9ca3af] ml-1">(Read-only)</span>}
          </label>
          <input
            type="time"
            {...fieldProps}
            className={fieldClassName}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      );

    case 'textarea':
      return (
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
            {isReadOnly && <span className="text-[#9ca3af] ml-1">(Read-only)</span>}
          </label>
          <textarea
            {...fieldProps}
            rows={4}
            className={fieldClassName}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      );
      
    default: // text, number, url
      return (
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
            {isReadOnly && <span className="text-[#9ca3af] ml-1">(Read-only)</span>}
          </label>
          <input
            type={field.type}
            {...fieldProps}
            className={fieldClassName}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      );
  }
}