import React, { useEffect } from 'react';
import { AdminForm } from './AdminForm';
import { getSchemaForEntity } from './schemas/matchSchema';
import { getMockDataById, saveMockData, deleteMockData } from './mockData';
import { X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: 'match' | 'fanSubmission' | 'news' | 'team';
  mode: 'add' | 'edit' | 'delete';
  recordId?: string;
  onSuccess?: () => void;
}

export function AdminModal({
  isOpen,
  onClose,
  entityType,
  mode,
  recordId,
  onSuccess
}: AdminModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  // Get schema for this entity type
  const schema = getSchemaForEntity(entityType);
  
  // No more field filtering - show ALL fields in both ADD and EDIT
  // ReadOnly logic is now handled in AdminField component
  
  // Load existing data for EDIT mode
  const initialData = mode === 'edit' && recordId ? getMockDataById(entityType, recordId) : {};

  // Handle form submission
  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      if (mode === 'delete') {
        await deleteMockData(entityType, recordId!);
        console.log('Delete successful');
      } else {
        await saveMockData(entityType, formData, mode);
        console.log('Save successful:', formData);
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Operation failed:', error);
      // In real implementation, show error toast
    } finally {
      setIsLoading(false);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getModalTitle = () => {
    const entityName = entityType.charAt(0).toUpperCase() + entityType.slice(1);
    switch (mode) {
      case 'add':
        return `Add New ${entityName}`;
      case 'edit':
        return `Edit ${entityName}`;
      case 'delete':
        return `Delete ${entityName}`;
      default:
        return entityName;
    }
  };

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
          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb]">
              <h2 className="text-xl font-semibold text-[#00105A]">
                {getModalTitle()}
              </h2>
              <button
                onClick={onClose}
                className="text-[#6b7280] hover:text-[#00105A] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Form Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <AdminForm
                schema={schema} // ALL fields, no filtering
                initialData={initialData}
                onSubmit={handleSubmit}
                mode={mode} // Pass mode to AdminForm
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}