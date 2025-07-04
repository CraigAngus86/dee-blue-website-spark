import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { FieldConfig } from './types';

interface AdminFieldProps {
 field: FieldConfig;
 value: any;
 onChange: (value: any) => void;
 error?: string;
 mode?: 'add' | 'edit' | 'delete';
}

export function AdminField({ field, value, onChange, error, mode = 'add' }: AdminFieldProps) {
 const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 
 // Determine if field should be read-only
 const isReadOnly = mode === 'edit' && field.readOnlyInEdit;
 
 // Word count function
 const countWords = (text: string): number => {
   return text.trim().split(/\s+/).filter(word => word.length > 0).length;
 };

 // Multiple file upload handler (for photos field)
 const handleMultipleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
   const files = Array.from(e.target.files || []);
   if (files.length === 0) return;

   // Validate file count
   if (field.validation?.maxFiles && files.length > field.validation.maxFiles) {
     alert(`Maximum ${field.validation.maxFiles} files allowed`);
     return;
   }

   // Validate each file
   for (const file of files) {
     // Validate file type
     if (field.validation?.fileTypes && !field.validation.fileTypes.includes(file.type)) {
       alert(`Invalid file format for ${file.name}. Please use: ${field.validation.fileTypes.join(', ')}`);
       return;
     }

     // Validate file size
     if (field.validation?.maxSize && file.size > field.validation.maxSize) {
       const maxSizeMB = field.validation.maxSize / (1024 * 1024);
       alert(`File ${file.name} too large. Maximum size: ${maxSizeMB}MB`);
       return;
     }
   }

   setSelectedFiles(files);
   onChange(files);
 };

 // Single file upload handler
 const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
   if (!file) return;

   // Validate file type
   if (field.validation?.fileTypes && !field.validation.fileTypes.includes(file.type)) {
     alert(`Invalid file format. Please use: ${field.validation.fileTypes.join(', ')}`);
     return;
   }

   // Validate file size
   if (field.validation?.maxSize && file.size > field.validation.maxSize) {
     const maxSizeMB = field.validation.maxSize / (1024 * 1024);
     alert(`File too large. Maximum size: ${maxSizeMB}MB`);
     return;
   }

   setSelectedFile(file);
   onChange(file);
 };

 // Remove selected file(s)
 const removeFile = (index?: number) => {
   if (field.multiple) {
     if (index !== undefined) {
       // Remove specific file
       const newFiles = selectedFiles.filter((_, i) => i !== index);
       setSelectedFiles(newFiles);
       onChange(newFiles);
     } else {
       // Remove all files
       setSelectedFiles([]);
       onChange([]);
     }
   } else {
     setSelectedFile(null);
     onChange(null);
   }
 };

 // Handle multiselect change
 const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   if (isReadOnly) return;
   
   const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
   onChange(selectedOptions);
 };

 const fieldProps = {
   value: value || '',
   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
     if (isReadOnly) return;
     const newValue = field.type === 'boolean' ? (e.target as HTMLInputElement).checked : e.target.value;
     onChange(newValue);
   },
   placeholder: field.placeholder,
   required: field.required,
   disabled: isReadOnly,
 };

 const fieldClassName = `w-full px-4 py-3 border border-[#e5e7eb] rounded focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A] ${
   error ? 'border-red-500' : ''
 } ${
   isReadOnly 
     ? 'bg-[#f9fafb] text-[#9ca3af] cursor-not-allowed'
     : 'bg-white text-[#374151]'
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

   case 'multiselect':
     const selectedValues = Array.isArray(value) ? value : [];
     return (
       <div>
         <label className="block text-sm font-medium text-[#374151] mb-2">
           {field.label}
           {field.required && <span className="text-red-500 ml-1">*</span>}
           {isReadOnly && <span className="text-[#9ca3af] ml-1">(Read-only)</span>}
         </label>
         <select
           multiple
           value={selectedValues}
           onChange={handleMultiSelectChange}
           disabled={isReadOnly}
           className={`${fieldClassName} min-h-[120px]`}
           size={Math.min(field.options?.length || 5, 8)}
         >
           {field.options?.map(option => (
             <option key={option.value} value={option.value}>
               {option.label}
             </option>
           ))}
         </select>
         <div className="text-xs text-[#6b7280] mt-1">
           Hold Ctrl/Cmd to select multiple options
         </div>
         {field.helpText && (
           <div className="text-xs text-[#6b7280] mt-1">{field.helpText}</div>
         )}
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

   case 'datetime':
     return (
       <div>
         <label className="block text-sm font-medium text-[#374151] mb-2">
           {field.label}
           {field.required && <span className="text-red-500 ml-1">*</span>}
           {isReadOnly && <span className="text-[#9ca3af] ml-1">(Read-only)</span>}
         </label>
         <input
           type="datetime-local"
           {...fieldProps}
           className={fieldClassName}
         />
         {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
       </div>
     );

   case 'file':
     // Handle multiple files (for photos field)
     if (field.multiple) {
       return (
         <div>
           <label className="block text-sm font-medium text-[#374151] mb-2">
             {field.label}
             {field.required && <span className="text-red-500 ml-1">*</span>}
           </label>
           
           {selectedFiles.length === 0 ? (
             <div className="border-2 border-dashed border-[#e5e7eb] rounded-lg p-6 text-center">
               <Upload className="mx-auto h-12 w-12 text-[#6b7280] mb-4" />
               <div className="text-sm text-[#6b7280] mb-2">
                 {field.placeholder || 'Click to upload files'}
               </div>
               <input
                 type="file"
                 onChange={handleMultipleFileSelect}
                 accept={field.validation?.fileTypes?.join(',')}
                 multiple
                 className="hidden"
                 id={`file-upload-${field.name}`}
                 disabled={isReadOnly}
               />
               <label
                 htmlFor={`file-upload-${field.name}`}
                 className="inline-block bg-[#C5E7FF] text-[#00105A] px-4 py-2 rounded cursor-pointer hover:bg-[#b3deff] transition-colors"
               >
                 Choose Files
               </label>
               {field.validation && (
                 <div className="text-xs text-[#6b7280] mt-2">
                   {field.validation.fileTypes && `Formats: ${field.validation.fileTypes.join(', ')}`}
                   {field.validation.maxSize && ` • Max: ${(field.validation.maxSize / (1024 * 1024)).toFixed(1)}MB each`}
                   {field.validation.maxFiles && ` • Max files: ${field.validation.maxFiles}`}
                 </div>
               )}
             </div>
           ) : (
             <div className="space-y-3">
               <div className="flex justify-between items-center">
                 <span className="text-sm font-medium text-[#374151]">
                   {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
                 </span>
                 <button
                   type="button"
                   onClick={() => removeFile()}
                   className="text-red-500 hover:text-red-700 text-sm"
                 >
                   Remove All
                 </button>
               </div>
               <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                 {selectedFiles.map((file, index) => (
                   <div key={index} className="border border-[#e5e7eb] rounded-lg p-3">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-2 min-w-0">
                         {file.type.startsWith('image/') && (
                           <img
                             src={URL.createObjectURL(file)}
                             alt="Preview"
                             className="w-8 h-8 object-cover rounded flex-shrink-0"
                           />
                         )}
                         <div className="min-w-0">
                           <div className="text-xs font-medium text-[#374151] truncate">{file.name}</div>
                           <div className="text-xs text-[#6b7280]">
                             {(file.size / (1024 * 1024)).toFixed(1)} MB
                           </div>
                         </div>
                       </div>
                       <button
                         type="button"
                         onClick={() => removeFile(index)}
                         className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                       >
                         <X className="w-3 h-3" />
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}
           
           {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
         </div>
       );
     }

     // Handle single file upload
     return (
       <div>
         <label className="block text-sm font-medium text-[#374151] mb-2">
           {field.label}
           {field.required && <span className="text-red-500 ml-1">*</span>}
         </label>
         
         {!selectedFile ? (
           <div className="border-2 border-dashed border-[#e5e7eb] rounded-lg p-6 text-center">
             <Upload className="mx-auto h-12 w-12 text-[#6b7280] mb-4" />
             <div className="text-sm text-[#6b7280] mb-2">
               {field.placeholder || 'Click to upload file'}
             </div>
             <input
               type="file"
               onChange={handleFileSelect}
               accept={field.validation?.fileTypes?.join(',')}
               className="hidden"
               id={`file-upload-${field.name}`}
               disabled={isReadOnly}
             />
             <label
               htmlFor={`file-upload-${field.name}`}
               className="inline-block bg-[#C5E7FF] text-[#00105A] px-4 py-2 rounded cursor-pointer hover:bg-[#b3deff] transition-colors"
             >
               Choose File
             </label>
             {field.validation && (
               <div className="text-xs text-[#6b7280] mt-2">
                 {field.validation.fileTypes && `Formats: ${field.validation.fileTypes.join(', ')}`}
                 {field.validation.maxSize && ` • Max: ${(field.validation.maxSize / (1024 * 1024)).toFixed(1)}MB`}
               </div>
             )}
           </div>
         ) : (
           <div className="border border-[#e5e7eb] rounded-lg p-4">
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 {selectedFile.type.startsWith('image/') && (
                   <img
                     src={URL.createObjectURL(selectedFile)}
                     alt="Preview"
                     className="w-16 h-16 object-cover rounded"
                   />
                 )}
                 <div>
                   <div className="text-sm font-medium text-[#374151]">{selectedFile.name}</div>
                   <div className="text-xs text-[#6b7280]">
                     {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                   </div>
                 </div>
               </div>
               <button
                 type="button"
                 onClick={() => removeFile()}
                 className="text-red-500 hover:text-red-700 p-1"
               >
                 <X className="w-4 h-4" />
               </button>
             </div>
           </div>
         )}
         
         {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
       </div>
     );

   case 'textarea':
     const currentValue = value || '';
     const wordCount = field.validation?.wordCount ? countWords(currentValue) : 0;
     const hasWordCount = field.validation?.wordCount;
     const isWordCountValid = hasWordCount ? 
       wordCount >= field.validation.wordCount.min && wordCount <= field.validation.wordCount.max :
       true;

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
         {hasWordCount && (
           <div className="flex justify-between text-sm mt-1">
             <p className="text-[#6b7280]">
               {field.validation.wordCount.min}-{field.validation.wordCount.max} words
             </p>
             <p className={isWordCountValid ? 'text-[#6b7280]' : 'text-red-500'}>
               {wordCount} words
             </p>
           </div>
         )}
         {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
       </div>
     );
     
   default: // text, number, url
     const textValue = value || '';
     const textWordCount = field.validation?.wordCount ? countWords(textValue) : 0;
     const hasTextWordCount = field.validation?.wordCount;
     const isTextWordCountValid = hasTextWordCount ? 
       textWordCount >= field.validation.wordCount.min && textWordCount <= field.validation.wordCount.max :
       true;

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
         {hasTextWordCount && (
           <div className="flex justify-between text-sm mt-1">
             <p className="text-[#6b7280]">
               {field.validation.wordCount.min}-{field.validation.wordCount.max} words
             </p>
             <p className={isTextWordCountValid ? 'text-[#6b7280]' : 'text-red-500'}>
               {textWordCount} words
             </p>
           </div>
         )}
         {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
       </div>
     );
 }
}
