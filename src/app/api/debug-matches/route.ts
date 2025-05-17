import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // Direct database queries to check raw data
    const { data: matchData, error: matchError } = await supabase
      .from('match')
      .select('*')
      .limit(10);
      
    // Check teams table  
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .select('*')
      .limit(5);
      
    // Check competitions table
    const { data: compData, error: compError } = await supabase
      .from('competitions')
      .select('*')
      .limit(5);
      
    return NextResponse.json({
      success: true,
      env: {
        supabaseUrl: supabaseUrl ? 'Set' : 'Not set',
        supabaseKey: supabaseKey ? 'Set' : 'Not set'
      },
      tables: {
        match: {
          count: matchData?.length || 0,
          error: matchError ? matchError.message : null,
          sample: matchData?.slice(0, 1) || []
        },
        teams: {
          count: teamData?.length || 0,
          error: teamError ? teamError.message : null,
          sample: teamData?.slice(0, 1) || []
        },
        competitions: {
          count: compData?.length || 0,
          error: compError ? compError.message : null,
          sample: compData?.slice(0, 1) || []
        }
      }
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
