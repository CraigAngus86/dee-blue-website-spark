const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'gxtptap2',
  dataset: 'production',
  token: 'sk4okIOCzdhNUk2eyKVkbZ6g11Fk4vaPKiyJr8nPsMWqGvhumaPjNxVvN5bRsMuzVNLV8iJSMgeDe3tTHGpYYnzyQZE2T4n66Psc20XqqD63y2zAhWfQFBWYaJW9oyzkV0TbWpbvBrbcZ7jRXkPIO8BuApT5QTnsfZo9Y2f8QqtEgZ1h7asc',
  useCdn: false,
  apiVersion: '2024-01-01'
});

// Correct public_id mapping
const logoFixes = {
  'Saltire Energy': 'saltire_ft0ety',
  'Three60 Energy': 'Three60_syy13n',
  'Svexa': 'Svexa_u1myed',
  'Prestige Decorators': 'Prestige_Decorators-01_kxjktw',
  'Premier Fixings': 'Premier_Fixings_n58dhm',
  'PCL Live': 'PCL_Live_Master_Logo-Dark_Background_etgy6t',
  'ATC Flooring': 'IMG_5172_aeb3iv',
  'Headstrong Fitness & Wellbeing': 'Headstrong_g66zus',
  'Global E&C': 'Global_bkpjfo',
  'BMP': 'BMP_w4ihrw',
  'GDI Engineering': 'GDI_chxapt',
  'BJK Winton': 'BJK_Winton_copy_f4unl4',
  'ADAMS': 'ADAMS_ujbd4z',
  'AD23': 'AD23_z6hjld',
  'Aberdeen Considine': 'Aberdein_Considine_jwnkde'
};

async function fixSponsorLogos() {
  console.log('🔧 Fixing sponsor logo public_ids...');
  
  try {
    let fixed = 0;
    let notFound = 0;
    
    for (const [sponsorName, correctPublicId] of Object.entries(logoFixes)) {
      console.log(`🔍 Looking for: ${sponsorName}`);
      
      // Find the sponsor document
      const sponsor = await client.fetch(
        `*[_type == "sponsor" && name == $name][0]`,
        { name: sponsorName }
      );
      
      if (!sponsor) {
        console.log(`❌ Not found: ${sponsorName}`);
        notFound++;
        continue;
      }
      
      // Update the logo public_id
      await client
        .patch(sponsor._id)
        .set({
          logo: {
            _type: 'cloudinary.asset',
            public_id: correctPublicId
          }
        })
        .commit();
      
      console.log(`✅ Fixed ${sponsorName}: ${correctPublicId}`);
      fixed++;
    }
    
    console.log(`\n🎉 Update complete!`);
    console.log(`   Fixed: ${fixed} sponsors`);
    console.log(`   Not found: ${notFound} sponsors`);
    
  } catch (error) {
    console.error('❌ Error fixing sponsor logos:', error);
  }
}

fixSponsorLogos();
