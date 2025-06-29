import React, { useEffect, useState } from 'react';
import { AdminForm } from './AdminForm';
import { FieldConfig } from './types'; // CHANGED: Import from unified types
import { X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: 'match' | 'fanSubmission' | 'news' | 'matchReport' | 'matchGallery' | 'poll' | 'businessEnquiry'; // ADDED businessEnquiry
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDropdowns, setIsLoadingDropdowns] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [schema, setSchema] = useState<FieldConfig[]>([]);
  const [initialData, setInitialData] = useState<any>({});

  // Fetch and populate schema with dynamic data
  const loadSchemaWithDynamicData = async () => {
    setIsLoadingDropdowns(true);
    try {
      let baseSchema: FieldConfig[] = [];
      
      // Load appropriate schema based on entityType
      if (entityType === 'match') {
        const { getSchemaForEntity } = await import('./schemas/matchSchema');
        baseSchema = getSchemaForEntity(entityType);
      } else if (entityType === 'news') {
        const { getSchemaForEntity } = await import('./schemas/newsSchema');
        baseSchema = getSchemaForEntity(entityType);
      } else if (entityType === 'matchReport') {
        const { getSchemaForEntity } = await import('./schemas/matchReportSchema');
        baseSchema = getSchemaForEntity(entityType);
      } else if (entityType === 'matchGallery') {
        const { getSchemaForEntity } = await import('./schemas/matchGallerySchema');
        baseSchema = getSchemaForEntity(entityType);
      } else if (entityType === 'poll') {
        const { getSchemaForEntity } = await import('./schemas/pollSchema');
        baseSchema = getSchemaForEntity(entityType);
      } else if (entityType === 'businessEnquiry') {
        const { getSchemaForEntity } = await import('./schemas/businessEnquirySchema');
        baseSchema = getSchemaForEntity(entityType);
      } else {
        console.warn(`No schema found for entity type: ${entityType}`);
        setSchema([]);
        return;
      }

      const needsDynamicData = baseSchema.some(field => field.dynamicSource);
      
      if (!needsDynamicData) {
        setSchema(baseSchema);
        return;
      }

      let dropdownData = null;
      if (entityType === 'match') {
        const response = await fetch('/api/admin/matches/dropdowns');
        const result = await response.json();
        if (result.success) {
          dropdownData = result.data;
        }
      } else if (entityType === 'matchReport') {
        const response = await fetch('/api/admin/match-reports/dropdowns');
        const result = await response.json();
        if (result.success) {
          dropdownData = result.data;
        }
      } else if (entityType === 'matchGallery') {
        const response = await fetch('/api/admin/match-galleries/dropdowns');
        const result = await response.json();
        if (result.success) {
          dropdownData = result.data;
        }
      } else if (entityType === 'news' || entityType === 'poll' || entityType === 'businessEnquiry') {
        // News, polls, and business enquiries have static options, no dynamic loading needed
        setSchema(baseSchema);
        return;
      }

      if (!dropdownData) {
        console.warn('No dropdown data available, using base schema');
        setSchema(baseSchema);
        return;
      }

      const populatedSchema = baseSchema.map(field => {
        if (!field.dynamicSource) {
          return field;
        }

        let dynamicOptions = [];
        switch (field.dynamicSource) {
          case 'teams':
            dynamicOptions = dropdownData.teams || [];
            break;
          case 'competitions':
            dynamicOptions = dropdownData.competitions || [];
            break;
          case 'seasons':
            dynamicOptions = dropdownData.seasons?.map((season: any) => ({
              ...season,
              label: season.isCurrent ? `${season.label} (Current)` : season.label
            })) || [];
            break;
          case 'recentMatches':
            dynamicOptions = dropdownData.recentMatches || [];
            break;
          default:
            console.warn(`Unknown dynamic source: ${field.dynamicSource}`);
        }

        return {
          ...field,
          options: dynamicOptions
        };
      });

      setSchema(populatedSchema);

    } catch (error) {
      console.error('Failed to load dropdown data:', error);
      setSchema([]);
    } finally {
      setIsLoadingDropdowns(false);
    }
  };

  // Load existing data for EDIT mode
  const loadExistingData = async () => {
    if (mode !== 'edit' || !recordId) return;

    setIsLoadingData(true);
    try {
      if (entityType === 'match') {
        // Fetch specific match data from our view
        const response = await fetch(`/api/admin/matches?id=${recordId}`);
        const result = await response.json();
        
        if (result.success && result.matches && result.matches.length > 0) {
          const matchData = result.matches[0];
          setInitialData({
            season_id: matchData.season_id,
            competition_id: matchData.competition_id,
            home_team_id: matchData.home_team_id,
            away_team_id: matchData.away_team_id,
            match_date: matchData.match_date,
            match_time: matchData.match_time?.substring(0, 5),
            venue: matchData.venue,
            home_score: matchData.home_score,
            away_score: matchData.away_score,
            status: matchData.status,
            hospitality_available: matchData.hospitality_available,
            is_highlighted: matchData.is_highlighted,
            ticket_link: matchData.ticket_link,
            match_report_link: matchData.match_report_link,
            gallery_idsanity: matchData.gallery_idsanity,
            match_sponsor_id: matchData.match_sponsor_id
          });
        } else {
          console.error('Match not found');
          setInitialData({});
        }
      } else if (entityType === 'news') {
        // Fetch specific news article from Sanity
        const response = await fetch(`/api/admin/news?id=${recordId}`);
        const result = await response.json();
        
        if (result.success && result.articles && result.articles.length > 0) {
          const articleData = result.articles[0];
          setInitialData({
            title: articleData.title,
            category: articleData.category,
            author: articleData.author,
            mainImage: articleData.mainImage?.public_id || '',
            excerpt: articleData.excerpt,
            body: articleData.body,
            publishedAt: articleData.publishedAt ? articleData.publishedAt.substring(0, 16) : '', // Convert to datetime-local format
            seoMetaTitle: articleData.seo?.metaTitle || '',
            seoMetaDescription: articleData.seo?.metaDescription || ''
          });
        } else {
          console.error('Article not found');
          setInitialData({});
        }
      } else if (entityType === 'matchReport') {
        // Fetch specific match report from Sanity
        const response = await fetch(`/api/admin/match-reports?id=${recordId}`);
        const result = await response.json();
        
        if (result.success && result.articles && result.articles.length > 0) {
          const articleData = result.articles[0];
          setInitialData({
            matchId: articleData.matchId,
            title: articleData.title,
            author: articleData.author,
            mainImage: articleData.mainImage?.public_id || '',
            excerpt: articleData.excerpt,
            publishedAt: articleData.publishedAt ? articleData.publishedAt.substring(0, 16) : '',
            seoMetaTitle: articleData.seo?.metaTitle || '',
            seoMetaDescription: articleData.seo?.metaDescription || ''
          });
        } else {
          console.error('Match report not found');
          setInitialData({});
        }
      } else if (entityType === 'matchGallery') {
        // Fetch specific match gallery from Sanity
        const response = await fetch(`/api/admin/match-galleries?id=${recordId}`);
        const result = await response.json();
        
        if (result.success && result.articles && result.articles.length > 0) {
          const galleryData = result.articles[0];
          setInitialData({
            matchId: galleryData.matchId,
            title: galleryData.title,
            folderName: galleryData.folderName,
            author: galleryData.author,
            excerpt: galleryData.excerpt,
            coverImage: galleryData.coverImage?.public_id || '',
            photoCount: galleryData.photoCount || 0,
            publishedAt: galleryData.publishedAt ? galleryData.publishedAt.substring(0, 16) : '',
            seoMetaTitle: galleryData.seo?.metaTitle || '',
            seoMetaDescription: galleryData.seo?.metaDescription || ''
          });
        } else {
          console.error('Match gallery not found');
          setInitialData({});
        }
      } else if (entityType === 'poll') {
        // Fetch specific poll data from Supabase
        const response = await fetch(`/api/admin/polls?id=${recordId}`);
        const result = await response.json();
        
        if (result.success && result.polls && result.polls.length > 0) {
          const pollData = result.polls[0];
          const options = pollData.poll_options || [];
          
          setInitialData({
            question: pollData.question,
            category: pollData.category,
            option1: options[0]?.option_text || '',
            option2: options[1]?.option_text || '',
            option3: options[2]?.option_text || '',
            option4: options[3]?.option_text || '',
            option5: options[4]?.option_text || '',
            option6: options[5]?.option_text || '',
            end_date: pollData.end_date ? pollData.end_date.substring(0, 16) : '',
            status: pollData.status
          });
        } else {
          console.error('Poll not found');
          setInitialData({});
        }
      } else if (entityType === 'businessEnquiry') {
        // Fetch specific business enquiry from Sanity
        const response = await fetch(`/api/admin/business-enquiries?id=${recordId}`);
        const result = await response.json();
        
        if (result.success && result.enquiries && result.enquiries.length > 0) {
          const enquiryData = result.enquiries[0];
          setInitialData({
            company: enquiryData.company,
            name: enquiryData.name,
            email: enquiryData.email,
            phone: enquiryData.phone,
            preferredContact: enquiryData.preferredContact,
            interestType: enquiryData.interestType,
            sponsorshipType: enquiryData.sponsorshipType,
            budgetRange: enquiryData.budgetRange,
            packageInterest: enquiryData.packageInterest,
            groupSize: enquiryData.groupSize,
            message: enquiryData.message,
            hearAboutUs: enquiryData.hearAboutUs,
            status: enquiryData.status,
            assignedTo: enquiryData.assignedTo,
            followUpDate: enquiryData.followUpDate,
            source: enquiryData.source,
            submittedAt: enquiryData.submittedAt
          });
        } else {
          console.error('Business enquiry not found');
          setInitialData({});
        }
      }
      
    } catch (error) {
      console.error('Failed to load existing data:', error);
      setInitialData({});
    } finally {
      setIsLoadingData(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      if (entityType === 'match') {
        if (mode === 'delete') {
          const response = await fetch(`/api/admin/matches?id=${recordId}`, {
            method: 'DELETE'
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Delete failed');
          }
          
          console.log('Delete successful:', result.message);
          if (result.warnings) {
            console.warn('Delete warnings:', result.warnings);
          }
          
        } else if (mode === 'add') {
          const response = await fetch('/api/admin/matches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Create failed');
          }
          
          console.log('Create successful:', result.message);
          
        } else if (mode === 'edit') {
          const frozenFields = ['season_id', 'competition_id', 'home_team_id', 'away_team_id', 'match_date', 'match_time', 'venue'];
          const editableData = Object.keys(formData)
            .filter(key => !frozenFields.includes(key))
            .reduce((obj, key) => {
              obj[key] = formData[key];
              return obj;
            }, {} as any);

          console.log('Sending editable data only:', editableData);

          const response = await fetch('/api/admin/matches', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: recordId, ...editableData })
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Update failed');
          }
          
          console.log('Update successful:', result.message);
        }
      } else if (entityType === 'businessEnquiry') {
        // Handle business enquiry operations
        if (mode === 'delete') {
          const response = await fetch(`/api/admin/business-enquiries?id=${recordId}`, {
            method: 'DELETE'
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Delete failed');
          }
          
          console.log('Delete successful:', result.message);
          
        } else if (mode === 'edit') {
          // Business enquiries use FormData for consistency
          const apiFormData = new FormData();
          
          // Add form data
          Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
              apiFormData.append(key, formData[key]);
            }
          });
          
          // Add the enquiry ID for updates
          apiFormData.append('id', recordId || '');
          
          const response = await fetch('/api/admin/business-enquiries', {
            method: 'PUT',
            body: apiFormData
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Update failed');
          }
          
          console.log('Update successful:', result.message);
        }
      } else if (entityType === 'poll') {
        // Handle poll creation/update/delete
        if (mode === 'delete') {
          const response = await fetch(`/api/admin/polls?id=${recordId}`, {
            method: 'DELETE'
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Delete failed');
          }
          
          console.log('Delete successful:', result.message);
          
        } else if (mode === 'add') {
          // Convert form data to API format
          const options = [
            formData.option1,
            formData.option2,
            formData.option3,
            formData.option4,
            formData.option5,
            formData.option6
          ].filter(option => option && option.trim()); // Filter out empty options

          const pollData = {
            question: formData.question,
            category: formData.category,
            end_date: formData.end_date,
            status: formData.status,
            options
          };

          const response = await fetch('/api/admin/polls', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pollData)
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Create failed');
          }
          
          console.log('Create successful:', result.message);
        }
      } else if (entityType === 'news' || entityType === 'matchReport' || entityType === 'matchGallery') {
        // News, match reports, and match galleries use FormData for Cloudinary uploads
        const apiFormData = new FormData();
        
        // Add all form fields to FormData
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
            // Handle multiple files for photos field
            if (key === 'photos' && Array.isArray(formData[key])) {
              formData[key].forEach((file: File) => {
                apiFormData.append('photos', file);
              });
            } else {
              apiFormData.append(key, formData[key]);
            }
          }
        });

        const apiPath = entityType === 'news' ? '/api/admin/news' : 
                       entityType === 'matchReport' ? '/api/admin/match-reports' :
                       '/api/admin/match-galleries';

        if (mode === 'delete') {
          const response = await fetch(`${apiPath}?id=${recordId}`, {
            method: 'DELETE'
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Delete failed');
          }
          
          console.log('Delete successful:', result.message);
          
        } else if (mode === 'add') {
          const response = await fetch(apiPath, {
            method: 'POST',
            body: apiFormData
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Create failed');
          }
          
          console.log('Create successful:', result.message);
          
        } else if (mode === 'edit') {
          // Add the article/gallery ID for updates
          apiFormData.append('id', recordId || '');
          
          const response = await fetch(apiPath, {
            method: 'PUT',
            body: apiFormData
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Update failed');
          }
          
          console.log('Update successful:', result.message);
        }
      }
      
      onSuccess?.();
      onClose();
      
    } catch (error) {
      console.error('Operation failed:', error);
      alert(error instanceof Error ? error.message : 'Operation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load schema and data when modal opens
  useEffect(() => {
    if (isOpen) {
      loadSchemaWithDynamicData();
      loadExistingData();
    } else {
      setSchema([]);
      setInitialData({});
    }
  }, [isOpen, entityType, mode, recordId]);

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
    const entityName = entityType === 'matchReport' ? 'Match Report' : 
                      entityType === 'matchGallery' ? 'Match Gallery' :
                      entityType === 'businessEnquiry' ? 'Business Enquiry' :
                      entityType.charAt(0).toUpperCase() + entityType.slice(1);
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

  // Show loading state
  const isLoadingAny = isLoadingDropdowns || isLoadingData;
  if (isLoadingAny) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="fixed inset-0 bg-black/50 transition-opacity" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#00105A] border-t-transparent mx-auto mb-4"></div>
                <p className="text-[#6b7280]">
                  {isLoadingDropdowns && 'Loading form data...'}
                  {isLoadingData && 'Loading data...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb]">
              <h2 className="text-xl font-semibold text-[#00105A]">
                {getModalTitle()}
              </h2>
              <button onClick={onClose} className="text-[#6b7280] hover:text-[#00105A] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {schema.length > 0 ? (
                <AdminForm
                  schema={schema}
                  initialData={initialData}
                  onSubmit={handleSubmit}
                  mode={mode}
                  isLoading={isLoading}
                />
              ) : (
                <div className="p-8 text-center text-[#6b7280]">
                  No schema available for {entityType}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
