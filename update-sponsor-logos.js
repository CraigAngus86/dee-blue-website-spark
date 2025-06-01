const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

// Mapping of sponsor names to new horizontal logo public IDs
const logoUpdates = [
  { name: 'A Considine', publicId: 'aconsidine_gippxy' },
  { name: 'BJ Kwinton', publicId: 'bjkwinton_lq2j2f' },
  { name: 'Adams', publicId: 'adams_o1j6vk' },
  { name: 'Bigmans', publicId: 'bigmans_ftvx6k' },
  { name: 'GDI', publicId: 'gdi_odpycy' },
  { name: 'Headstrong', publicId: 'headstrong_s8jmte' },
  { name: 'ATC', publicId: 'atc_itea5r' },
  { name: 'PCL', publicId: 'pcl_zcdugj' },
  { name: 'Premier', publicId: 'premier_kpbv3i' },
  { name: 'Svexa', publicId: 'svexa_odxall' },
  { name: 'Prestige', publicId: 'prestige_vzqskm' }
];

async function updateSponsorLogos() {
  console.log('Starting sponsor logo updates...');
  
  for (const update of logoUpdates) {
    try {
      // Find sponsor by name
      const sponsors = await client.fetch(`*[_type == "sponsor" && name match "${update.name}*"]`);
      
      if (sponsors.length === 0) {
        console.log(`❌ No sponsor found for: ${update.name}`);
        continue;
      }
      
      if (sponsors.length > 1) {
        console.log(`⚠️  Multiple sponsors found for: ${update.name}`);
        console.log(sponsors.map(s => `  - ${s.name} (${s._id})`));
        continue;
      }
      
      const sponsor = sponsors[0];
      console.log(`✅ Found sponsor: ${sponsor.name} (${sponsor._id})`);
      
      // Update the logo
      await client
        .patch(sponsor._id)
        .set({
          logo: {
            _type: 'cloudinary.asset',
            public_id: update.publicId
          }
        })
        .commit();
        
      console.log(`✅ Updated logo for ${sponsor.name} -> ${update.publicId}`);
      
    } catch (error) {
      console.error(`❌ Error updating ${update.name}:`, error);
    }
  }
  
  console.log('✅ Logo updates complete!');
}

updateSponsorLogos();
