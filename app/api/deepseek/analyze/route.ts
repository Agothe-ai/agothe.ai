import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithEngineStack } from '@/lib/deepseek';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text string is required' },
        { status: 400 }
      );
    }

    const analysis = await analyzeWithEngineStack(text);

    return NextResponse.json({
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('DeepSeek analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
