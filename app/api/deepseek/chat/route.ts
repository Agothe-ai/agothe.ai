import { NextRequest, NextResponse } from 'next/server';
import { conversationDeepSeek, streamDeepSeek, type DeepSeekMessage } from '@/lib/deepseek';

export async function POST(request: NextRequest) {
  try {
    const { messages, stream = false } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    if (stream) {
      // Return streaming response
      const encoder = new TextEncoder();
      const customReadable = new ReadableStream({
        async start(controller) {
          try {
            await streamDeepSeek({
              messages: messages as DeepSeekMessage[],
              onChunk: (text: string) => {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
              },
            });
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (error) {
            controller.error(error);
          }
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
    const response = await conversationDeepSeek({
      messages: messages as DeepSeekMessage[],
    });

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
