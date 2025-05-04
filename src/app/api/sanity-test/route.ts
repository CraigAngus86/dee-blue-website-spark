
import { NextResponse } from 'next/server';
import { testSanityConnection } from '@/lib/sanity/sanity-simple';
import { testMinimalSanityConnection } from '@/lib/sanity/test-connection';

export async function GET(request: Request) {
  try {
    // Get test type from query parameters
    const { searchParams } = new URL(request.url);
    const testType = searchParams.get('type') || 'all';
    
    // Check token availability for response
    const tokenAvailable = !!process.env.SANITY_API_TOKEN;
    
    console.log('API route: Testing Sanity connection, token available:', tokenAvailable);
    
    let clientTest = null;
    let minimalTest = null;
    
    // Run appropriate tests based on request
    if (testType === 'client' || testType === 'all') {
      clientTest = await testSanityConnection();
    }
    
    if (testType === 'minimal' || testType === 'all') {
      minimalTest = await testMinimalSanityConnection();
    }
    
    // Return combined results
    return NextResponse.json({
      tokenAvailable,
      clientTest,
      minimalTest,
      environmentInfo: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gxtptap2',
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-30',
      }
    });
  } catch (error) {
    console.error('Error in Sanity test API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to run Sanity tests',
        message: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}
