
import { NextResponse } from 'next/server';
import { supabase } from '@/integrations/supabase/client';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: article, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) throw error;
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
