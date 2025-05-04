const token = process.env.SANITY_API_TOKEN;
const projectId = 'gxtptap2';
const dataset = 'production';
const apiVersion = '2024-04-30';

// A super minimal test function that uses no client libraries
export async function testMinimalSanityConnection() {
  try {
    console.log('Testing minimal Sanity connection...');
    console.log('Token available:', !!token); // Don't log the actual token!
    
    // Very simple query that should work even if there's no data
    const query = encodeURIComponent('*[_type == "sanity.imageAsset"][0..1]');
    const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${query}`;
    
    console.log('Fetching from URL:', url);
    
    const headers = token ? {
      'Authorization': `Bearer ${token}`
    } : {};
    
    console.log('Using headers:', Object.keys(headers));
    
    const response = await fetch(url, { headers });
    const status = response.status;
    const ok = response.ok;
    
    console.log('Response status:', status, 'OK:', ok);
    
    if (!ok) {
      return { success: false, message: `Connection failed with status ${status}` };
    }
    
    const data = await response.json();
    console.log('Response data sample:', data.result ? 'Data received' : 'No data');
    
    return { success: true, message: 'Connection successful' };
  } catch (error) {
    console.error('Test connection error:', error);
    return {
      success: false,
      message: `Connection test failed: ${error.message}`
    };
  }
}