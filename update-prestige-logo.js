const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'gxtptap2',
  dataset: 'production',
  token: 'sk4okIOCzdhNUk2eyKVkbZ6g11Fk4vaPKiyJr8nPsMWqGvhumaPjNxVvN5bRsMuzVNLV8iJSMgeDe3tTHGpYYnzyQZE2T4n66Psc20XqqD63y2zAhWfQFBWYaJW9oyzkV0TbWpbvBrbcZ7jRXkPIO8BuApT5QTnsfZo9Y2f8QqtEgZ1h7asc',
  useCdn: false,
  apiVersion: '2024-01-01'
});

async function updatePrestigeLogo() {
  console.log('🔧 Updating Prestige Decorators logo...');
  
  try {
    // Find the sponsor document
    const sponsor = await client.fetch(
      `*[_type == "sponsor" && name == "Prestige Decorators"][0]`
    );
    
    if (!sponsor) {
      console.log(`❌ Not found: Prestige Decorators`);
      return;
    }
    
    // Update the logo public_id
    await client
      .patch(sponsor._id)
      .set({
        logo: {
          _type: 'cloudinary.asset',
          public_id: 'prestige_x9pg99'
        }
      })
      .commit();
      
    console.log(`✅ Updated Prestige Decorators: prestige_x9pg99`);
    console.log(`\n🎉 Prestige logo update complete!`);
    
  } catch (error) {
    console.error('❌ Error updating Prestige logo:', error);
  }
}

updatePrestigeLogo();
