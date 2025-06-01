const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'gxtptap2',
  dataset: 'production',
  token: 'sk4okIOCzdhNUk2eyKVkbZ6g11Fk4vaPKiyJr8nPsMWqGvhumaPjNxVvN5bRsMuzVNLV8iJSMgeDe3tTHGpYYnzyQZE2T4n66Psc20XqqD63y2zAhWfQFBWYaJW9oyzkV0TbWpbvBrbcZ7jRXkPIO8BuApT5QTnsfZo9Y2f8QqtEgZ1h7asc',
  useCdn: false,
  apiVersion: '2024-01-01'
});

// New horizontal logo public_ids
const horizontalLogos = {
  'Aberdeen Considine': 'aconsidine_gippxy',
  'BJK Winton': 'bjkwinton_lq2j2f',
  'ADAMS': 'adams_o1j6vk', 
  'BMP': 'bigmans_ftvx6k',
  'GDI Engineering': 'gdi_odpycy',
  'Headstrong Fitness & Wellbeing': 'headstrong_s8jmte',
  'ATC Flooring': 'atc_itea5r',
  'PCL Live': 'pcl_zcdugj',
  'Premier Fixings': 'premier_kpbv3i',
  'Svexa': 'svexa_odxall',
  'Prestige Decorators': 'prestige_vzqskm'
};

async function updateHorizontalLogos() {
  console.log('🔧 Updating sponsors with new horizontal logos...');
  
  try {
    let updated = 0;
    let notFound = 0;
    
    for (const [sponsorName, newPublicId] of Object.entries(horizontalLogos)) {
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
            public_id: newPublicId
          }
        })
        .commit();
        
      console.log(`✅ Updated ${sponsorName}: ${newPublicId}`);
      updated++;
    }
    
    console.log(`\n🎉 Horizontal logos update complete!`);
    console.log(` Updated: ${updated} sponsors`);
    console.log(` Not found: ${notFound} sponsors`);
    
  } catch (error) {
    console.error('❌ Error updating horizontal logos:', error);
  }
}

updateHorizontalLogos();
