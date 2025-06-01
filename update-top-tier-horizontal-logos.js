const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'gxtptap2',
  dataset: 'production',
  token: 'sk4okIOCzdhNUk2eyKVkbZ6g11Fk4vaPKiyJr8nPsMWqGvhumaPjNxVvN5bRsMuzVNLV8iJSMgeDe3tTHGpYYnzyQZE2T4n66Psc20XqqD63y2zAhWfQFBWYaJW9oyzkV0TbWpbvBrbcZ7jRXkPIO8BuApT5QTnsfZo9Y2f8QqtEgZ1h7asc',
  useCdn: false,
  apiVersion: '2024-01-01'
});

// Update top tier sponsors to use clean horizontal logos
const topTierHorizontalLogos = {
  'Saltire Energy': 'saltire_zsbu8e_b52c14',
  'Global E&C': 'global_mjxufj_32c9c6', 
  'Three60 Energy': 'three60_usvkng_508993'
};

async function updateTopTierLogos() {
  console.log('🔧 Updating top tier sponsors with clean horizontal logos...');
  
  try {
    let updated = 0;
    
    for (const [sponsorName, newPublicId] of Object.entries(topTierHorizontalLogos)) {
      console.log(`🔍 Looking for: ${sponsorName}`);
      
      const sponsor = await client.fetch(
        `*[_type == "sponsor" && name == $name][0]`,
        { name: sponsorName }
      );
      
      if (!sponsor) {
        console.log(`❌ Not found: ${sponsorName}`);
        continue;
      }
      
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
    
    console.log(`\n🎉 Top tier logos updated!`);
    console.log(` Updated: ${updated} sponsors`);
    
  } catch (error) {
    console.error('❌ Error updating top tier logos:', error);
  }
}

updateTopTierLogos();
