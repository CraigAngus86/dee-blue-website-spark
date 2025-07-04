import React, { useEffect, useState } from 'react';
import { AdminForm } from './AdminForm';
import { FieldConfig } from './types'; // CHANGED: Import from unified types
import { X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: 'match' | 'fanSubmission' | 'news' | 'matchReport' | 'matchGallery' | 'poll' | 'businessEnquiry' | 'sponsor' | 'player' | 'staff'; // UPDATED: Added player and staff
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
      } else if (entityType === 'sponsor') {
        const { getSchemaForEntity } = await import('./schemas/sponsorSchema');
        baseSchema = getSchemaForEntity(entityType);
      } else if (entityType === 'player') {
        const { getSchemaForEntity } = await import('./schemas/playerSchema');
        baseSchema = getSchemaForEntity(entityType);
      } else if (entityType === 'staff') {
        const { getSchemaForEntity } = await import('./schemas/staffSchema');
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
      } else if (entityType === 'sponsor') {
        const response = await fetch('/api/admin/sponsors/dropdowns');
        const result = await response.json();
        if (result.success) {
          dropdownData = result.data;
        }
      } else if (entityType === 'news' || entityType === 'poll' || entityType === 'businessEnquiry' || entityType === 'player' || entityType === 'staff') {
        // News, polls, business enquiries, players, and staff have static options, no dynamic loading needed
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
          case 'upcomingMatches':
            dynamicOptions = dropdownData.upcomingMatches || [];
            break;
          case 'activePlayers':
            dynamicOptions = dropdownData.activePlayers || [];
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
      } else if (entityType === 'sponsor') {
        // Fetch specific sponsor from Sanity
        const response = await fetch(`/api/admin/sponsors?id=${recordId}`);
        const result = await response.json();
        
        if (result.success && result.sponsors && result.sponsors.length > 0) {
          const sponsorData = result.sponsors[0];
          setInitialData({
            name: sponsorData.name,
            website: sponsorData.website,
            primaryTier: sponsorData.primaryTier,
            isActive: sponsorData.isActive,
            startDate: sponsorData.startDate,
            endDate: sponsorData.endDate,
            description: sponsorData.description,
            isMatchSponsor: sponsorData.additionalTypes?.isMatchSponsor || false,
            isPlayerSponsor: sponsorData.additionalTypes?.isPlayerSponsor || false,
            selectedMatches: sponsorData.selectedMatches || [],
            selectedPlayers: sponsorData.selectedPlayers || []
          });
        } else {
          console.error('Sponsor not found');
          setInitialData({});
        }
      } else if (entityType === 'player') {
        // Fetch specific player from Sanity
        const response = await fetch(`/api/admin/players?id=${recordId}`);
        const result = await response.json();
        
        if (result.success && result.players && result.players.length > 0) {
          const playerData = result.players[0];
          setInitialData({
            firstName: playerData.firstName,
            lastName: playerData.lastName,
            nationality: playerData.nationality,
            playerPosition: playerData.playerPosition,
            isYouthProduct: playerData.isYouthProduct,
            extendedBio: playerData.extendedBio, // Already converted to plain text by API
            twitter: playerData.socialMedia?.twitter || '',
            facebook: playerData.socialMedia?.facebook || '',
            instagram: playerData.socialMedia?.instagram || '',
            linkedin: playerData.socialMedia?.linkedin || '',
            website: playerData.socialMedia?.website || ''
            // Note: profileImage not included - file uploads are optional in edit mode
          });
        } else {
          console.error('Player not found');
          setInitialData({});
        }
      } else if (entityType === 'staff') {
        // Fetch specific staff from Sanity
        const response = await fetch(`/api/admin/staff?id=${recordId}`);
        const result = await response.json();
        
        if (result.success && result.staff && result.staff.length > 0) {
          const staffData = result.staff[0];
          setInitialData({
            firstName: staffData.firstName,
            lastName: staffData.lastName,
            nationality: staffData.nationality,
            staffType: staffData.staffType,
            staffRole: staffData.staffRole,
            extendedBio: staffData.extendedBio, // Already converted to plain text by API
            twitter: staffData.socialMedia?.twitter || '',
            facebook: staffData.socialMedia?.facebook || '',
            instagram: staffData.socialMedia?.instagram || '',
            linkedin: staffData.socialMedia?.linkedin || '',
            website: staffData.socialMedia?.website || ''
            // Note: profileImage not included - file uploads are optional in edit mode
          });
        } else {
          console.error('Staff member not found');
          setInitialData({});
        }
      } else if (entityType === 'news') {
        // ... existing news logic
      } else if (entityType === 'businessEnquiry') {
        // ... existing business enquiry logic
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
      if (entityType === 'sponsor' || entityType === 'player' || entityType === 'staff') {
        // Handle sponsor, player, and staff operations using FormData (for image upload)
        const apiFormData = new FormData();
        
        // Add all form fields to FormData
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
            if (Array.isArray(formData[key])) {
              // Handle arrays (selectedMatches, selectedPlayers)
              formData[key].forEach((item: any) => {
                apiFormData.append(key, item);
              });
            } else {
              apiFormData.append(key, formData[key]);
            }
          }
        });

        const apiEndpoint = entityType === 'sponsor' ? '/api/admin/sponsors' :
                           entityType === 'player' ? '/api/admin/players' :
                           '/api/admin/staff';

        if (mode === 'delete') {
          const response = await fetch(`${apiEndpoint}?id=${recordId}`, {
            method: 'DELETE'
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Delete failed');
          }
          
          console.log('Delete successful:', result.message);
          
        } else if (mode === 'add') {
          const response = await fetch(apiEndpoint, {
            method: 'POST',
            body: apiFormData
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Create failed');
          }
          
          console.log('Create successful:', result.message);
          
        } else if (mode === 'edit') {
          // Add the record ID for updates
          apiFormData.append('id', recordId || '');
          
          const response = await fetch(apiEndpoint, {
            method: 'PUT',
            body: apiFormData
          });
          const result = await response.json();
          
          if (!result.success) {
            throw new Error(result.error || 'Update failed');
          }
          
          console.log('Update successful:', result.message);
        }
      } else if (entityType === 'match') {
        // ... existing match logic
      } else if (entityType === 'businessEnquiry') {
        // ... existing business enquiry logic
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
