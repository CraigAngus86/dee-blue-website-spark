
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Temporary diagnostic endpoint to check if critical environment variables exist
 * WARNING: This endpoint should be removed after verification is complete
 * 
 * @param req Next.js API request
 * @param res Next.js API response
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for the presence of environment variables without exposing values
    const envStatus = {
      SANITY_WEBHOOK_SECRET: typeof process.env.SANITY_WEBHOOK_SECRET === 'string' && 
                             process.env.SANITY_WEBHOOK_SECRET.length > 0
    };

    // Log the check (but not the actual values) for server-side debugging
    console.log('Environment variable check:', envStatus);

    // Return the status of each variable
    return res.status(200).json({
      status: 'success',
      environmentVariables: envStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error checking environment variables:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'Failed to check environment variables',
      error: (error as Error).message
    });
  }
}
