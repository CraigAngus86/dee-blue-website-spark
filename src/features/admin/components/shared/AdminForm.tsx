import React, { useState, useEffect } from 'react';
import { AdminField } from './AdminField';
import { FieldConfig } from './types';

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

 // Word count function
 const countWords = (text: string): number => {
   return text.trim().split(/\s+/).filter(word => word.length > 0).length;
 };

 // Check if field should be visible based on conditional logic
 const isFieldVisible = (field: FieldConfig): boolean => {
   if (!field.conditional) {
     return true; // Always visible if no conditional logic
   }

   const { field: conditionField, value: conditionValue, operator } = field.conditional;
   const currentValue = formData[conditionField];

   switch (operator) {
     case 'equals':
       return currentValue === conditionValue;
     case 'not_equals':
       return currentValue !== conditionValue;
     case 'includes':
       return Array.isArray(currentValue) ? currentValue.includes(conditionValue) : false;
     case 'greater_than':
       return currentValue > conditionValue;
     case 'less_than':
       return currentValue < conditionValue;
     default:
       return true;
   }
 };

 // Auto-generate title and folderName when match is selected
 useEffect(() => {
   const matchIdField = schema.find(field => field.name === 'matchId');
   const titleField = schema.find(field => field.name === 'title');
   const folderNameField = schema.find(field => field.name === 'folderName');
   
   if (matchIdField && formData.matchId && mode === 'add') {
     // Find the selected match from the dropdown options
     const selectedMatch = matchIdField.options?.find(option => option.value === formData.matchId);
     
     if (selectedMatch) {
       const updates: any = {};
       
       // Auto-generate title (works for both match reports and galleries)
       if (titleField && selectedMatch.label) {
         updates.title = selectedMatch.label;
       }
       
       // Auto-generate folder name (for match galleries only)
       if (folderNameField && selectedMatch.matchDate && selectedMatch.homeTeam && selectedMatch.awayTeam) {
         // Import and use the generateFolderName function
         import('./schemas/matchGallerySchema').then(({ generateFolderName }) => {
           const generatedFolderName = generateFolderName(
             selectedMatch.matchDate,
             selectedMatch.homeTeam,
             selectedMatch.awayTeam
           );
           
           setFormData(prev => ({
             ...prev,
             folderName: generatedFolderName
           }));
         }).catch(() => {
           // Fallback: generate folder name inline if import fails
           const date = new Date(selectedMatch.matchDate);
           const yy = date.getFullYear().toString().slice(-2);
           const mm = (date.getMonth() + 1).toString().padStart(2, '0');
           const dd = date.getDate().toString().padStart(2, '0');
           
           const cleanHome = selectedMatch.homeTeam.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
           const cleanAway = selectedMatch.awayTeam.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
           
           const fallbackFolderName = `${yy}${mm}${dd}_${cleanHome}_${cleanAway}`;
           
           setFormData(prev => ({
             ...prev,
             folderName: fallbackFolderName
           }));
         });
       }
       
       // Apply title update immediately if we have it
       if (Object.keys(updates).length > 0) {
         setFormData(prev => ({
           ...prev,
           ...updates
         }));
       }
     }
   }
 }, [formData.matchId, schema, mode]);

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
     // Only validate visible fields
     if (!isFieldVisible(field)) {
       return;
     }

     // Only validate required fields that are not read-only in current mode
     const isReadOnly = mode === 'edit' && field.readOnlyInEdit;
     const fieldValue = formData[field.name];
     
     if (field.required && !isReadOnly && (!fieldValue || fieldValue === '')) {
       newErrors[field.name] = `${field.label} is required`;
     }
     
     // Word count validation
     if (field.validation?.wordCount && fieldValue && typeof fieldValue === 'string') {
       const wordCount = countWords(fieldValue);
       const { min, max } = field.validation.wordCount;
       
       if (wordCount < min) {
         newErrors[field.name] = `${field.label} must be at least ${min} words`;
       } else if (wordCount > max) {
         newErrors[field.name] = `${field.label} must be no more than ${max} words`;
       }
     }
     
     // Max length validation
     if (field.validation?.maxLength && fieldValue && typeof fieldValue === 'string') {
       if (fieldValue.length > field.validation.maxLength) {
         newErrors[field.name] = `${field.label} must be no more than ${field.validation.maxLength} characters`;
       }
     }
     
     // Type-specific validation (only for non-read-only fields)
     if (!isReadOnly && fieldValue) {
       if (field.type === 'url') {
         try {
           new URL(fieldValue);
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
         <h3 className="text-lg font-medium text-[#374151] mb-2">Delete Item</h3>
         <p className="text-sm text-[#6b7280] mb-6">
           Are you sure you want to delete this item? This action cannot be undone.
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

 // Filter schema to only show visible fields
 const visibleFields = schema.filter(isFieldVisible);

 return (
   <form onSubmit={handleSubmit} className="p-6">
     <div className="space-y-4">
       {visibleFields.map((field) => (
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
     
     <div className="flex justify-end space-x-3 pt-4 border-t border-[#e5e7eb] mt-6">
       <button
         type="submit"
         disabled={isLoading}
         className="px-4 py-2 bg-[#00105A] text-white rounded hover:bg-[#FFD700] hover:text-[#00105A] disabled:opacity-50 font-medium transition-colors"
       >
         {isLoading ? 'Saving...' : mode === 'add' ? 'Create' : 'Save Changes'}
       </button>
     </div>
   </form>
 );
}
