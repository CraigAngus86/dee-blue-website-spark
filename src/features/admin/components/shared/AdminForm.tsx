import React, { useState, useEffect } from 'react';
import { AdminField } from './AdminField';
import { FieldConfig } from './schemas/matchSchema';

interface AdminFormProps {
  schema: FieldConfig[];
  initialData?: any;
  onSubmit: (data: any) => void;
  mode: 'add' | 'edit' | 'delete';
  isLoading?: boolean;
}

export function AdminForm({ schema, initialData = {}, onSubmit, mode, isLoading = false }: AdminFormProps) {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data with initial data and default values
  useEffect(() => {
    const initData = { ...initialData };
    
    // Apply default values for fields that don't have initial data
    schema.forEach(field => {
      if (field.defaultValue !== undefined && !initData[field.name]) {
        initData[field.name] = field.defaultValue;
      }
    });
    
    setFormData(initData);
  }, [initialData, schema]);

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    schema.forEach(field => {
      // Only validate required fields that are not read-only in current mode
      const isReadOnly = mode === 'edit' && field.readOnlyInEdit;
      
      if (field.required && !isReadOnly && (!formData[field.name] || formData[field.name] === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      // Type-specific validation (only for non-read-only fields)
      if (!isReadOnly && formData[field.name]) {
        if (field.type === 'url') {
          try {
            new URL(formData[field.name]);
          } catch {
            newErrors[field.name] = 'Please enter a valid URL';
          }
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (mode === 'delete') {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[#374151] mb-2">Delete Match</h3>
          <p className="text-sm text-[#6b7280] mb-6">
            Are you sure you want to delete this match? This action cannot be undone.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={() => onSubmit({})}
              disabled={isLoading}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 disabled:opacity-50 font-medium"
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Form sections for better organization */}
      {mode === 'add' && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#00105A] mb-4">Match Details</h3>
          <div className="space-y-4">
            {schema.slice(0, 7).map((field) => ( // First 7 fields: season, competition, teams, date, time, venue
              <AdminField
                key={field.name}
                field={field}
                value={formData[field.name]}
                onChange={(value) => handleFieldChange(field.name, value)}
                error={errors[field.name]}
                mode={mode}
              />
            ))}
          </div>
        </div>
      )}
      
      {mode === 'edit' && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#00105A] mb-4">Match Information (Read-Only)</h3>
          <div className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb] space-y-4">
            {schema.slice(0, 7).map((field) => ( // First 7 fields: frozen in edit
              <AdminField
                key={field.name}
                field={field}
                value={formData[field.name]}
                onChange={(value) => handleFieldChange(field.name, value)}
                error={errors[field.name]}
                mode={mode}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-[#00105A] mb-4">
          {mode === 'add' ? 'Match Status & Links (Optional)' : 'Match Results & Links'}
        </h3>
        <div className="space-y-4">
          {schema.slice(7).map((field) => ( // Remaining fields: scores, status, links
            <AdminField
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={(value) => handleFieldChange(field.name, value)}
              error={errors[field.name]}
              mode={mode}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-[#e5e7eb]">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] disabled:opacity-50 font-medium transition-colors"
        >
          {isLoading ? 'Saving...' : mode === 'add' ? 'Add Match' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
