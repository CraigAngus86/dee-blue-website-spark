import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Cloudinary upload function for sponsor logos
async function uploadLogoToCloudinary(logoFile: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('file', logoFile);
    formData.append('upload_preset', 'sponsor-upload');
    formData.append('folder', 'banksofdeefc/sponsors');
    
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
    
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format
    };
  } catch (error) {
    console.error('Failed to upload logo:', error);
    throw new Error('Failed to upload sponsor logo');
  }
}

// GET: Single sponsor by ID OR paginated sponsors with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // SINGLE SPONSOR FETCHING (for EDIT mode)
    if (id) {
      const sponsor = await sanityClient.getDocument(id);

      if (!sponsor) {
        return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        sponsors: [sponsor],
        pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasMore: false }
      });
    }

    // PAGINATED SPONSORS FETCHING (for table view)
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '25');
    const tier = searchParams.get('tier');
    const status = searchParams.get('status');

    // Build GROQ query with filters
    let filters: string[] = [];
    
    if (tier && tier !== 'all') {
      filters.push(`primaryTier == "${tier}"`);
    }
    
    if (status && status !== 'all') {
      if (status === 'active') {
        filters.push(`isActive == true`);
      } else if (status === 'inactive') {
        filters.push(`isActive == false`);
      }
    }

    const filterString = filters.length > 0 ? ` && ${filters.join(' && ')}` : '';
    const baseQuery = `*[_type == "sponsor"${filterString}]`;
    
    // Get total count
    const total = await sanityClient.fetch(`count(${baseQuery})`);
    
    // Get paginated results
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const sponsors = await sanityClient.fetch(
      `${baseQuery} | order(primaryTier asc, name asc)[${from}...${to}]`
    );

    // Get tier counts for overview
    const tierCounts = await sanityClient.fetch(`{
      "principal": count(*[_type == "sponsor" && primaryTier == "principal" && isActive == true]),
      "main": count(*[_type == "sponsor" && primaryTier == "main" && isActive == true]),
      "partner": count(*[_type == "sponsor" && primaryTier == "partner" && isActive == true])
    }`);

    return NextResponse.json({
      success: true,
      sponsors: sponsors || [],
      tierCounts,
      pagination: {
        page,
        pageSize,
        total: total || 0,
        totalPages: Math.ceil((total || 0) / pageSize),
        hasMore: total ? total > page * pageSize : false
      }
    });

  } catch (error) {
    console.error('GET sponsors error:', error);
    return NextResponse.json({ error: 'Failed to fetch sponsors' }, { status: 500 });
  }
}

// POST: Create new sponsor
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract fields from sponsor schema
    const name = formData.get('name') as string;
    const website = formData.get('website') as string;
    const primaryTier = formData.get('primaryTier') as string;
    const isActive = formData.get('isActive') === 'true';
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const description = formData.get('description') as string;
    const isMatchSponsor = formData.get('isMatchSponsor') === 'true';
    const isPlayerSponsor = formData.get('isPlayerSponsor') === 'true';
    const logoFile = formData.get('logo') as File;

    // Extract selected matches and players (arrays)
    const selectedMatches = formData.getAll('selectedMatches') as string[];
    const selectedPlayers = formData.getAll('selectedPlayers') as string[];

    // Validation
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Sponsor name is required' }, { status: 400 });
    }

    if (!primaryTier) {
      return NextResponse.json({ error: 'Primary tier is required' }, { status: 400 });
    }

    // Logo required for new sponsors only
    if (!logoFile || logoFile.size === 0) {
      return NextResponse.json({ error: 'Sponsor logo is required' }, { status: 400 });
    }

    // Logo file validation
    if (logoFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Logo file too large. Maximum 5MB.' }, { status: 400 });
    }
    
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(logoFile.type)) {
      return NextResponse.json({ error: 'Invalid logo format. Use JPG or PNG.' }, { status: 400 });
    }

    // Upload logo to Cloudinary
    let uploadedLogo = null;
    try {
      uploadedLogo = await uploadLogoToCloudinary(logoFile);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to upload sponsor logo' }, { status: 500 });
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Prepare document for Sanity
    const sponsorDoc = {
      _type: 'sponsor',
      name: name.trim(),
      slug: { current: slug },
      website: website?.trim() || null,
      primaryTier,
      isActive,
      startDate: startDate || null,
      endDate: endDate || null,
      description: description?.trim() || null,
      additionalTypes: {
        isMatchSponsor,
        isPlayerSponsor
      },
      selectedMatches: selectedMatches || [],
      selectedPlayers: selectedPlayers || [],
      logo: uploadedLogo ? {
        _key: uploadedLogo.public_id,
        _type: 'cloudinary.asset',
        public_id: uploadedLogo.public_id,
        secure_url: uploadedLogo.secure_url,
        width: uploadedLogo.width,
        height: uploadedLogo.height,
        format: uploadedLogo.format
      } : null
    };

    // Create sponsor in Sanity
    const result = await sanityClient.create(sponsorDoc);

    // CROSS-SYSTEM INTEGRATION: Update selected matches and players
    const logoPublicId = uploadedLogo.public_id;
    let matchUpdateCount = 0;
    let playerUpdateCount = 0;

    // Update selected matches in Supabase
    if (selectedMatches && selectedMatches.length > 0) {
      console.log(`Updating ${selectedMatches.length} matches with sponsor logo:`, logoPublicId);
      
      for (const matchId of selectedMatches) {
        try {
          const { error: matchError } = await supabase
            .from('match')
            .update({ sponsor_logo_url: logoPublicId })
            .eq('id', matchId);

          if (matchError) {
            console.error(`Failed to update match ${matchId}:`, matchError);
          } else {
            matchUpdateCount++;
            console.log(`✅ Updated match ${matchId} with sponsor logo`);
          }
        } catch (error) {
          console.error(`Error updating match ${matchId}:`, error);
        }
      }
    }

    // Update selected players in Sanity
    if (selectedPlayers && selectedPlayers.length > 0) {
      console.log(`Updating ${selectedPlayers.length} players with sponsor logo:`, logoPublicId);
      
      for (const playerId of selectedPlayers) {
        try {
          await sanityClient
            .patch(playerId)
            .set({ sponsorLogoUrl: logoPublicId })
            .commit();

          playerUpdateCount++;
          console.log(`✅ Updated player ${playerId} with sponsor logo`);
        } catch (error) {
          console.error(`Error updating player ${playerId}:`, error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Sponsor created successfully',
      sponsorId: result._id,
      crossSystemUpdates: {
        matchesUpdated: matchUpdateCount,
        playersUpdated: playerUpdateCount,
        logoPublicId
      }
    });

  } catch (error) {
    console.error('POST sponsors error:', error);
    return NextResponse.json({ error: 'Failed to create sponsor' }, { status: 500 });
  }
}

// PUT: Update existing sponsor
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;

    if (!id) {
      return NextResponse.json({ error: 'Sponsor ID is required' }, { status: 400 });
    }

    // Get current sponsor data to compare changes
    const currentSponsor = await sanityClient.getDocument(id);
    if (!currentSponsor) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 });
    }

    // Prepare update object
    let updateData: any = {};

    // Extract and validate fields for update
    const name = formData.get('name') as string;
    const website = formData.get('website') as string;
    const primaryTier = formData.get('primaryTier') as string;
    const isActive = formData.get('isActive');
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const description = formData.get('description') as string;
    const isMatchSponsor = formData.get('isMatchSponsor');
    const isPlayerSponsor = formData.get('isPlayerSponsor');
    const logoFile = formData.get('logo') as File;

    // Extract selected matches and players (arrays)
    const selectedMatches = formData.getAll('selectedMatches') as string[];
    const selectedPlayers = formData.getAll('selectedPlayers') as string[];

    // Build update object
    if (name && name.trim()) {
      updateData.name = name.trim();
      updateData.slug = {
        current: name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
      };
    }
    if (website !== undefined) updateData.website = website?.trim() || null;
    if (primaryTier) updateData.primaryTier = primaryTier;
    if (isActive !== undefined) updateData.isActive = isActive === 'true';
    if (startDate !== undefined) updateData.startDate = startDate || null;
    if (endDate !== undefined) updateData.endDate = endDate || null;
    if (description !== undefined) updateData.description = description?.trim() || null;

    // Handle additional types
    if (isMatchSponsor !== undefined || isPlayerSponsor !== undefined) {
      updateData.additionalTypes = {
        isMatchSponsor: isMatchSponsor === 'true',
        isPlayerSponsor: isPlayerSponsor === 'true'
      };
    }

    // Update selected matches and players
    updateData.selectedMatches = selectedMatches || [];
    updateData.selectedPlayers = selectedPlayers || [];

    let logoPublicId = currentSponsor.logo?.public_id; // Keep existing logo by default

    // Handle new logo upload if provided (OPTIONAL in edit mode)
    if (logoFile && logoFile.size > 0) {
      // Validate logo
      if (logoFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Logo file too large. Maximum 5MB.' }, { status: 400 });
      }
      
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(logoFile.type)) {
        return NextResponse.json({ error: 'Invalid logo format. Use JPG or PNG.' }, { status: 400 });
      }

      try {
        const uploadedLogo = await uploadLogoToCloudinary(logoFile);
        logoPublicId = uploadedLogo.public_id;
        updateData.logo = {
          _key: uploadedLogo.public_id,
          _type: 'cloudinary.asset',
          public_id: uploadedLogo.public_id,
          secure_url: uploadedLogo.secure_url,
          width: uploadedLogo.width,
          height: uploadedLogo.height,
          format: uploadedLogo.format
        };
      } catch (error) {
        return NextResponse.json({ error: 'Failed to upload logo' }, { status: 500 });
      }
    }

    // Update sponsor in Sanity
    const result = await sanityClient
      .patch(id)
      .set(updateData)
      .commit();

    // CROSS-SYSTEM INTEGRATION: Handle match and player updates
    let matchUpdateCount = 0;
    let playerUpdateCount = 0;
    let matchClearCount = 0;
    let playerClearCount = 0;

    // Get previous selections for cleanup
    const previousMatches = currentSponsor.selectedMatches || [];
    const previousPlayers = currentSponsor.selectedPlayers || [];

    // Clear sponsor logo from previously selected matches that are no longer selected
    const matchesToClear = previousMatches.filter((matchId: string) => !selectedMatches.includes(matchId));
    if (matchesToClear.length > 0) {
      console.log(`Clearing sponsor logo from ${matchesToClear.length} previously selected matches`);
      
      for (const matchId of matchesToClear) {
        try {
          const { error: clearError } = await supabase
            .from('match')
            .update({ sponsor_logo_url: null })
            .eq('id', matchId);

          if (!clearError) {
            matchClearCount++;
            console.log(`✅ Cleared sponsor logo from match ${matchId}`);
          }
        } catch (error) {
          console.error(`Error clearing match ${matchId}:`, error);
        }
      }
    }

    // Update newly selected matches
    if (selectedMatches && selectedMatches.length > 0 && logoPublicId) {
      console.log(`Updating ${selectedMatches.length} matches with sponsor logo:`, logoPublicId);
      
      for (const matchId of selectedMatches) {
        try {
          const { error: matchError } = await supabase
            .from('match')
            .update({ sponsor_logo_url: logoPublicId })
            .eq('id', matchId);

          if (!matchError) {
            matchUpdateCount++;
            console.log(`✅ Updated match ${matchId} with sponsor logo`);
          }
        } catch (error) {
          console.error(`Error updating match ${matchId}:`, error);
        }
      }
    }

    // Clear sponsor logo from previously selected players that are no longer selected
    const playersToClear = previousPlayers.filter((playerId: string) => !selectedPlayers.includes(playerId));
    if (playersToClear.length > 0) {
      console.log(`Clearing sponsor logo from ${playersToClear.length} previously selected players`);
      
      for (const playerId of playersToClear) {
        try {
          await sanityClient
            .patch(playerId)
            .unset(['sponsorLogoUrl'])
            .commit();

          playerClearCount++;
          console.log(`✅ Cleared sponsor logo from player ${playerId}`);
        } catch (error) {
          console.error(`Error clearing player ${playerId}:`, error);
        }
      }
    }

    // Update newly selected players
    if (selectedPlayers && selectedPlayers.length > 0 && logoPublicId) {
      console.log(`Updating ${selectedPlayers.length} players with sponsor logo:`, logoPublicId);
      
      for (const playerId of selectedPlayers) {
        try {
          await sanityClient
            .patch(playerId)
            .set({ sponsorLogoUrl: logoPublicId })
            .commit();

          playerUpdateCount++;
          console.log(`✅ Updated player ${playerId} with sponsor logo`);
        } catch (error) {
          console.error(`Error updating player ${playerId}:`, error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Sponsor updated successfully',
      sponsorId: result._id,
      crossSystemUpdates: {
        matchesUpdated: matchUpdateCount,
        playersUpdated: playerUpdateCount,
        matchesCleared: matchClearCount,
        playersCleared: playerClearCount,
        logoPublicId
      }
    });

  } catch (error) {
    console.error('PUT sponsors error:', error);
    return NextResponse.json({ error: 'Failed to update sponsor' }, { status: 500 });
  }
}

// DELETE: Delete sponsor
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Sponsor ID is required' }, { status: 400 });
    }

    // Get sponsor data before deletion for cleanup
    const sponsor = await sanityClient.getDocument(id);
    if (!sponsor) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 });
    }

    let matchClearCount = 0;
    let playerClearCount = 0;

    // Clear sponsor logo from all associated matches
    if (sponsor.selectedMatches && sponsor.selectedMatches.length > 0) {
      console.log(`Clearing sponsor logo from ${sponsor.selectedMatches.length} matches before deletion`);
      
      for (const matchId of sponsor.selectedMatches) {
        try {
          const { error: clearError } = await supabase
            .from('match')
            .update({ sponsor_logo_url: null })
            .eq('id', matchId);

          if (!clearError) {
            matchClearCount++;
            console.log(`✅ Cleared sponsor logo from match ${matchId}`);
          }
        } catch (error) {
          console.error(`Error clearing match ${matchId}:`, error);
        }
      }
    }

    // Clear sponsor logo from all associated players
    if (sponsor.selectedPlayers && sponsor.selectedPlayers.length > 0) {
      console.log(`Clearing sponsor logo from ${sponsor.selectedPlayers.length} players before deletion`);
      
      for (const playerId of sponsor.selectedPlayers) {
        try {
          await sanityClient
            .patch(playerId)
            .unset(['sponsorLogoUrl'])
            .commit();

          playerClearCount++;
          console.log(`✅ Cleared sponsor logo from player ${playerId}`);
        } catch (error) {
          console.error(`Error clearing player ${playerId}:`, error);
        }
      }
    }

    // Delete sponsor from Sanity
    await sanityClient.delete(id);

    return NextResponse.json({
      success: true,
      message: 'Sponsor deleted successfully',
      cleanup: {
        matchesCleared: matchClearCount,
        playersCleared: playerClearCount
      }
    });

  } catch (error) {
    console.error('DELETE sponsors error:', error);
    return NextResponse.json({ error: 'Failed to delete sponsor' }, { status: 500 });
  }
}
