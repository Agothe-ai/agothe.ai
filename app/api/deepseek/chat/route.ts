import { NextRequest, NextResponse } from 'next/server';
import { queryDeepSeek } from '@/lib/deepseek';

export async function POST(request: NextRequest) {
  try {
    const { messages, stream = false } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const response = await queryDeepSeek({
      messages,
      stream,
    });

    if (stream) {
      // Return streaming response
      const encoder = new TextEncoder();
      const customReadable = new ReadableStream({
        async start(controller) {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content || '';
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
          controller.close();
        },
      });

      return new NextResponse(customReadable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Return non-streaming response
    return NextResponse.json({
      message: response.choices[0].message.content,
      usage: response.usage,
    });
  } catch (error: any) {
    console.error('DeepSeek chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
