const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');

// Initialize Sanity client using environment variables that are already loaded
const client = createClient({
  projectId: 'gxtptap2',
  dataset: 'production',
  token: 'sk4okIOCzdhNUk2eyKVkbZ6g11Fk4vaPKiyJr8nPsMWqGvhumaPjNxVvN5bRsMuzVNLV8iJSMgeDe3tTHGpYYnzyQZE2T4n66Psc20XqqD63y2zAhWfQFBWYaJW9oyzkV0TbWpbvBrbcZ7jRXkPIO8BuApT5QTnsfZo9Y2f8QqtEgZ1h7asc',
  useCdn: false,
  apiVersion: '2024-01-01'
});

// Sponsor data extracted from your Cloudinary images
const sponsorData = [
  // Principal Partner
  {
    name: 'Saltire Energy',
    primaryTier: 'principal',
    logoPublicId: 'sponsors/Saltire-E_yllzyx',
    website: 'https://saltireenergy.com'
  },
  
  // Main Sponsors
  {
    name: 'Three60 Energy',
    primaryTier: 'main', 
    logoPublicId: 'sponsors/Three60_syy13n',
    website: 'https://three60energy.com'
  },
  {
    name: 'Global E&C',
    primaryTier: 'main',
    logoPublicId: 'sponsors/Global_bkpjfo', 
    website: ''
  },
  
  // Official Partners
  {
    name: 'Svexa',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/Svexa_u1myed',
    website: 'https://svexa.com'
  },
  {
    name: 'Prestige Decorators',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/Prestige_Decorators-website_eaa3wp',
    website: ''
  },
  {
    name: 'Premier Fixings',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/Premier_Fixings_n58dhm',
    website: ''
  },
  {
    name: 'PCL Live',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/PCL_Live_Master_Logo-Light_Background_copy_vtz7os',
    website: ''
  },
  {
    name: 'ATC Flooring',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/IMG_5172_seb3iv',
    website: ''
  },
  {
    name: 'Headstrong Fitness & Wellbeing',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/Headstrong_g66zus',
    website: ''
  },
  {
    name: 'BMP',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/BMP_w4hrw',
    website: ''
  },
  {
    name: 'GDI Engineering',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/GDI_ohxapt',
    website: ''
  },
  {
    name: 'BJK Winton',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/BJK_Winton_copy_f4unl4',
    website: ''
  },
  {
    name: 'ADAMS',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/ADAMS_ujpd4z',
    website: ''
  },
  {
    name: 'AD23',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/AD23_z6hijd',
    website: ''
  },
  {
    name: 'Aberdeen Considine',
    primaryTier: 'partner',
    logoPublicId: 'sponsors/Aberdeen_Considine_jwnkd6',
    website: 'https://www.aberdeenconsidine.com'
  }
];

// Helper function to create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Main function to populate sponsors
async function populateSponsors() {
  console.log('🚀 Starting sponsor population...');
  console.log('📋 Using Sanity project: gxtptap2 (production dataset)');
  
  try {
    const results = [];
    
    for (const sponsor of sponsorData) {
      const document = {
        _type: 'sponsor',
        name: sponsor.name,
        slug: { current: createSlug(sponsor.name) },
        primaryTier: sponsor.primaryTier,
        website: sponsor.website || undefined,
        logo: {
          _type: 'cloudinary.asset',
          public_id: sponsor.logoPublicId
        },
        additionalTypes: {
          isMatchSponsor: false,
          isPlayerSponsor: false
        },
        supabaseId: uuidv4(), // Generate UUID for future Supabase linking
        isActive: true,
        startDate: new Date().toISOString().split('T')[0], // Today's date
        description: `Official ${sponsor.primaryTier === 'principal' ? 'Principal Partner' : 
                     sponsor.primaryTier === 'main' ? 'Main Sponsor' : 
                     'Official Partner'} of Banks o' Dee FC`
      };
      
      console.log(`📄 Creating: ${sponsor.name} (${sponsor.primaryTier})`);
      const result = await client.create(document);
      results.push(result);
    }
    
    console.log(`✅ Successfully created ${results.length} sponsor documents!`);
    
    // Summary by tier
    const summary = sponsorData.reduce((acc, sponsor) => {
      acc[sponsor.primaryTier] = (acc[sponsor.primaryTier] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📊 Summary:');
    console.log(`   Principal Partners: ${summary.principal || 0}`);
    console.log(`   Main Sponsors: ${summary.main || 0}`);
    console.log(`   Official Partners: ${summary.partner || 0}`);
    console.log(`   Total: ${results.length}`);
    
  } catch (error) {
    console.error('❌ Error populating sponsors:', error);
  }
}

// Run the script
populateSponsors();
