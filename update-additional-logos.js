const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'gxtptap2',
  dataset: 'production',
  token: 'sk4okIOCzdhNUk2eyKVkbZ6g11Fk4vaPKiyJr8nPsMWqGvhumaPjNxVvN5bRsMuzVNLV8iJSMgeDe3tTHGpYYnzyQZE2T4n66Psc20XqqD63y2zAhWfQFBWYaJW9oyzkV0TbWpbvBrbcZ7jRXkPIO8BuApT5QTnsfZo9Y2f8QqtEgZ1h7asc',
  useCdn: false,
  apiVersion: '2024-01-01'
});

// Additional horizontal logo updates
const additionalLogos = {
  'AD23': 'ad23_loyt6o',
  'BMP': 'bigmans_myrmoe',
  'PCL Live': 'pcl_owoc3s',
  'Premier Fixings': 'premier_eemfww',
  'Aberdeen Considine': 'aconsidine_vlfphd'
};

async function updateAdditionalLogos() {
  console.log('🔧 Updating additional horizontal logos...');
  
  try {
    let updated = 0;
    let notFound = 0;
    
    for (const [sponsorName, newPublicId] of Object.entries(additionalLogos)) {
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
    
    console.log(`\n🎉 Additional logos update complete!`);
    console.log(` Updated: ${updated} sponsors`);
    console.log(` Not found: ${notFound} sponsors`);
    
  } catch (error) {
    console.error('❌ Error updating additional logos:', error);
  }
}

updateAdditionalLogos();
