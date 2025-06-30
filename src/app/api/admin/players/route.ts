import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';

// Function to count words properly (from news API)
function countWords(text: string): number {
 return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Rich text conversion helpers (from news API)
function blocksToText(blocks: any[]): string {
 if (!blocks || !Array.isArray(blocks)) return '';
 
 return blocks
   .filter(block => block._type === 'block' && block.children)
   .map(block => 
     block.children
       .filter((child: any) => child._type === 'span' && child.text)
       .map((child: any) => child.text)
       .join('')
   )
   .join('\n\n');
}

function textToBlocks(text: string): any[] {
 if (!text || typeof text !== 'string') return [];
 
 const paragraphs = text.trim().split('\n\n').filter(p => p.trim());
 
 return paragraphs.map(paragraph => ({
   _type: 'block',
   _key: Math.random().toString(36).substr(2, 9),
   style: 'normal',
   markDefs: [],
   children: [
     {
       _type: 'span',
       _key: Math.random().toString(36).substr(2, 9),
       text: paragraph.trim(),
       marks: []
     }
   ]
 }));
}

// Cloudinary upload function (adapted from sponsor API)
async function uploadImageToCloudinary(imageFile: File): Promise<any> {
 try {
   const formData = new FormData();
   formData.append('file', imageFile);
   formData.append('upload_preset', 'player-upload');
   formData.append('folder', 'banksodeefc/people');
   
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
   console.error('Failed to upload player image:', error);
   throw new Error('Failed to upload player image');
 }
}

// GET: Single player by ID OR paginated players with filtering (PLAYERS ONLY)
export async function GET(request: NextRequest) {
 try {
   const { searchParams } = new URL(request.url);
   const id = searchParams.get('id');

   // SINGLE PLAYER FETCHING (for EDIT mode)
   if (id) {
     const query = `*[_type == "playerProfile" && _id == $id && personType == "player"][0] {
       _id,
       firstName,
       lastName,
       playerName,
       playerPosition,
       isYouthProduct,
       nationality,
       profileImage,
       extendedBio,
       socialMedia,
       careerHistory,
       accolades,
       personalFacts,
       gallery
     }`;

     const player = await sanityClient.fetch(query, { id });

     if (!player) {
       return NextResponse.json({ error: 'Player not found' }, { status: 404 });
     }

     // Convert rich text blocks to plain text for editing
     const editablePlayer = {
       ...player,
       extendedBio: blocksToText(player.extendedBio)
     };

     return NextResponse.json({
       success: true,
       players: [editablePlayer],
       pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1, hasMore: false }
     });
   }

   // PAGINATED PLAYERS FETCHING (for table view) - PLAYERS ONLY
   const page = parseInt(searchParams.get('page') || '1');
   const pageSize = parseInt(searchParams.get('pageSize') || '25');
   const position = searchParams.get('position');
   const status = searchParams.get('status');

   // Build GROQ query with filters - PLAYERS ONLY
   let filters = ['personType == "player"']; // ONLY PLAYERS
   
   if (position && position !== 'all') {
     filters.push(`playerPosition == "${position}"`);
   }
   
   if (status && status !== 'all') {
     if (status === 'youth') {
       filters.push(`isYouthProduct == true`);
     } else if (status === 'regular') {
       filters.push(`isYouthProduct == false`);
     }
   }

   const filterString = filters.length > 0 ? ` && ${filters.join(' && ')}` : '';
   const baseQuery = `*[_type == "playerProfile"${filterString}]`;
   
   // Get total count
   const total = await sanityClient.fetch(`count(${baseQuery})`);
   
   // Get paginated results with specific field selection (like news API)
   const from = (page - 1) * pageSize;
   const to = from + pageSize - 1;
   const query = `${baseQuery} | order(lastName asc, firstName asc)[${from}...${to}] {
     _id,
     firstName,
     lastName,
     playerName,
     playerPosition,
     isYouthProduct,
     nationality,
     profileImage,
     extendedBio
   }`;
   
   const players = await sanityClient.fetch(query);

   // Get position counts for overview
   const positionCounts = await sanityClient.fetch(`{
     "goalkeeper": count(*[_type == "playerProfile" && personType == "player" && playerPosition == "goalkeeper"]),
     "defender": count(*[_type == "playerProfile" && personType == "player" && playerPosition == "defender"]),
     "midfielder": count(*[_type == "playerProfile" && personType == "player" && playerPosition == "midfielder"]),
     "forward": count(*[_type == "playerProfile" && personType == "player" && playerPosition == "forward"]),
     "youthProduct": count(*[_type == "playerProfile" && personType == "player" && isYouthProduct == true])
   }`);

   return NextResponse.json({
     success: true,
     players: players || [],
     positionCounts,
     pagination: {
       page,
       pageSize,
       total: total || 0,
       totalPages: Math.ceil((total || 0) / pageSize),
       hasMore: total ? total > page * pageSize : false
     }
   });

 } catch (error) {
   console.error('GET players error:', error);
   return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
 }
}

// POST: Create new player (PLAYERS ONLY)
export async function POST(request: NextRequest) {
 try {
   const formData = await request.formData();
   
   // Extract fields from player schema
   const firstName = formData.get('firstName') as string;
   const lastName = formData.get('lastName') as string;
   const nationality = formData.get('nationality') as string;
   const playerPosition = formData.get('playerPosition') as string;
   const isYouthProduct = formData.get('isYouthProduct') === 'true';
   const extendedBio = formData.get('extendedBio') as string;
   const profileImageFile = formData.get('profileImage') as File;

   // Social media fields
   const twitterHandle = formData.get('twitter') as string;
   const facebookHandle = formData.get('facebook') as string;
   const instagramHandle = formData.get('instagram') as string;
   const linkedinHandle = formData.get('linkedin') as string;
   const websiteUrl = formData.get('website') as string;

   // Validation
   if (!firstName?.trim()) {
     return NextResponse.json({ error: 'First name is required' }, { status: 400 });
   }

   if (!lastName?.trim()) {
     return NextResponse.json({ error: 'Last name is required' }, { status: 400 });
   }

   if (!playerPosition) {
     return NextResponse.json({ error: 'Player position is required' }, { status: 400 });
   }

   // Profile image required for new players
   if (!profileImageFile || profileImageFile.size === 0) {
     return NextResponse.json({ error: 'Player photo is required' }, { status: 400 });
   }

   // Image file validation
   if (profileImageFile.size > 5 * 1024 * 1024) {
     return NextResponse.json({ error: 'Image file too large. Maximum 5MB.' }, { status: 400 });
   }
   
   if (!['image/jpeg', 'image/jpg', 'image/png'].includes(profileImageFile.type)) {
     return NextResponse.json({ error: 'Invalid image format. Use JPG or PNG.' }, { status: 400 });
   }

   // Upload image to Cloudinary
   let uploadedImage = null;
   try {
     uploadedImage = await uploadImageToCloudinary(profileImageFile);
   } catch (error) {
     return NextResponse.json({ error: 'Failed to upload player image' }, { status: 500 });
   }

   // Prepare document for Sanity
   const playerDoc = {
     _type: 'playerProfile',
     personType: 'player',
     firstName: firstName.trim(),
     lastName: lastName.trim(),
     playerName: `${firstName.trim()} ${lastName.trim()}`,
     nationality: nationality?.trim() || 'Scotland',
     playerPosition,
     isYouthProduct,
     extendedBio: extendedBio ? textToBlocks(extendedBio.trim()) : [],
     profileImage: uploadedImage ? {
       _key: uploadedImage.public_id,
       _type: 'cloudinary.asset',
       public_id: uploadedImage.public_id,
       secure_url: uploadedImage.secure_url,
       width: uploadedImage.width,
       height: uploadedImage.height,
       format: uploadedImage.format
     } : null,
     socialMedia: {
       twitter: twitterHandle?.trim() || null,
       facebook: facebookHandle?.trim() || null,
       instagram: instagramHandle?.trim() || null,
       linkedin: linkedinHandle?.trim() || null,
       website: websiteUrl?.trim() || null
     },
     careerHistory: [], // Start empty, can be added later
     accolades: [], // Start empty, can be added later
     personalFacts: [], // Start empty, can be added later
     gallery: [] // Start empty, can be added later
   };

   // Create player in Sanity
   const result = await sanityClient.create(playerDoc);

   return NextResponse.json({
     success: true,
     message: 'Player created successfully',
     playerId: result._id
   });

 } catch (error) {
   console.error('POST players error:', error);
   return NextResponse.json({ error: 'Failed to create player' }, { status: 500 });
 }
}

// PUT: Update existing player (PLAYERS ONLY)
export async function PUT(request: NextRequest) {
 try {
   const formData = await request.formData();
   
   const id = formData.get('id') as string;

   if (!id) {
     return NextResponse.json({ error: 'Player ID is required' }, { status: 400 });
   }

   // Get current player data
   const currentPlayer = await sanityClient.getDocument(id);
   if (!currentPlayer || currentPlayer.personType !== 'player') {
     return NextResponse.json({ error: 'Player not found' }, { status: 404 });
   }

   // Prepare update object
   let updateData: any = {};

   // Extract and validate fields for update
   const firstName = formData.get('firstName') as string;
   const lastName = formData.get('lastName') as string;
   const nationality = formData.get('nationality') as string;
   const playerPosition = formData.get('playerPosition') as string;
   const isYouthProduct = formData.get('isYouthProduct');
   const extendedBio = formData.get('extendedBio') as string;
   const profileImageFile = formData.get('profileImage') as File;

   // Social media fields
   const twitterHandle = formData.get('twitter') as string;
   const facebookHandle = formData.get('facebook') as string;
   const instagramHandle = formData.get('instagram') as string;
   const linkedinHandle = formData.get('linkedin') as string;
   const websiteUrl = formData.get('website') as string;

   // Build update object
   if (firstName && firstName.trim()) {
     updateData.firstName = firstName.trim();
   }
   if (lastName && lastName.trim()) {
     updateData.lastName = lastName.trim();
   }
   if (firstName && lastName) {
     updateData.playerName = `${firstName.trim()} ${lastName.trim()}`;
   }
   if (nationality !== undefined) updateData.nationality = nationality?.trim() || 'Scotland';
   if (playerPosition) updateData.playerPosition = playerPosition;
   if (isYouthProduct !== undefined) updateData.isYouthProduct = isYouthProduct === 'true';
   if (extendedBio !== undefined) {
     updateData.extendedBio = extendedBio ? textToBlocks(extendedBio.trim()) : [];
   }

   // Handle social media updates
   const socialMediaUpdate: any = {};
   if (twitterHandle !== undefined) socialMediaUpdate.twitter = twitterHandle?.trim() || null;
   if (facebookHandle !== undefined) socialMediaUpdate.facebook = facebookHandle?.trim() || null;
   if (instagramHandle !== undefined) socialMediaUpdate.instagram = instagramHandle?.trim() || null;
   if (linkedinHandle !== undefined) socialMediaUpdate.linkedin = linkedinHandle?.trim() || null;
   if (websiteUrl !== undefined) socialMediaUpdate.website = websiteUrl?.trim() || null;

   if (Object.keys(socialMediaUpdate).length > 0) {
     updateData.socialMedia = {
       ...currentPlayer.socialMedia,
       ...socialMediaUpdate
     };
   }

   // Handle new image upload if provided (OPTIONAL in edit mode)
   if (profileImageFile && profileImageFile.size > 0) {
     // Validate image
     if (profileImageFile.size > 5 * 1024 * 1024) {
       return NextResponse.json({ error: 'Image file too large. Maximum 5MB.' }, { status: 400 });
     }
     
     if (!['image/jpeg', 'image/jpg', 'image/png'].includes(profileImageFile.type)) {
       return NextResponse.json({ error: 'Invalid image format. Use JPG or PNG.' }, { status: 400 });
     }

     try {
       const uploadedImage = await uploadImageToCloudinary(profileImageFile);
       updateData.profileImage = {
         _key: uploadedImage.public_id,
         _type: 'cloudinary.asset',
         public_id: uploadedImage.public_id,
         secure_url: uploadedImage.secure_url,
         width: uploadedImage.width,
         height: uploadedImage.height,
         format: uploadedImage.format
       };
     } catch (error) {
       return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
     }
   }

   // Update player in Sanity
   const result = await sanityClient
     .patch(id)
     .set(updateData)
     .commit();

   return NextResponse.json({
     success: true,
     message: 'Player updated successfully',
     playerId: result._id
   });

 } catch (error) {
   console.error('PUT player error:', error);
   return NextResponse.json({ error: 'Failed to update player' }, { status: 500 });
 }
}

// DELETE: Delete player (PLAYERS ONLY)
export async function DELETE(request: NextRequest) {
 try {
   const { searchParams } = new URL(request.url);
   const id = searchParams.get('id');

   if (!id) {
     return NextResponse.json({ error: 'Player ID is required' }, { status: 400 });
   }

   // Verify it's a player before deletion
   const player = await sanityClient.getDocument(id);
   if (!player || player.personType !== 'player') {
     return NextResponse.json({ error: 'Player not found' }, { status: 404 });
   }

   // Delete player from Sanity
   await sanityClient.delete(id);

   return NextResponse.json({
     success: true,
     message: 'Player deleted successfully'
   });

 } catch (error) {
   console.error('DELETE player error:', error);
   return NextResponse.json({ error: 'Failed to delete player' }, { status: 500 });
 }
}
