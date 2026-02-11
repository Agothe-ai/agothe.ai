# DeepSeek × Agothe.AI Integration

## Overview

Complete DeepSeek API integration with Agothe Engine Stack for advanced AI reasoning and pattern analysis.

## Features

### Core Integration
- ✅ **API Client** (`lib/deepseek.ts`): Full DeepSeek API wrapper with streaming support
- ✅ **Agothe Engine Stack**: 6-metric analysis (LJM, LSSE, Orriel, MCS, NES, DEC, REQ, MSI)
- ✅ **Chat Interface**: Real-time conversational AI
- ✅ **Text Analyzer**: Pattern recognition with visual metrics

### API Routes
- `POST /api/deepseek/chat` - Conversational AI with streaming
- `POST /api/deepseek/analyze` - Agothe Engine Stack analysis

### Components
- `DeepSeekChat` - Interactive chat interface
- `DeepSeekAnalyzer` - Text analysis with metric visualization
- `DeepSeekProvider` - React context for state management

## Setup

### 1. Environment Configuration

```bash
cp .env.example .env.local
```

Add your DeepSeek API key:

```env
DEEPSEEK_API_KEY=your_actual_api_key_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

## Usage

### Chat Interface

```tsx
import { DeepSeekChat } from '@/components/deepseek-chat';
import { DeepSeekProvider } from '@/lib/deepseek-context';

export default function ChatPage() {
  return (
    <DeepSeekProvider>
      <DeepSeekChat />
    </DeepSeekProvider>
  );
}
```

### Text Analyzer

```tsx
import { DeepSeekAnalyzer } from '@/components/deepseek-analyzer';
import { DeepSeekProvider } from '@/lib/deepseek-context';

export default function AnalyzePage() {
  return (
    <DeepSeekProvider>
      <DeepSeekAnalyzer />
    </DeepSeekProvider>
  );
}
```

### Direct API Usage

```typescript
import { queryDeepSeek, analyzeWithEngineStack } from '@/lib/deepseek';

// Chat
const response = await queryDeepSeek({
  messages: [{ role: 'user', content: 'Hello!' }]
});

// Analysis
const analysis = await analyzeWithEngineStack('Your text here');
console.log(analysis); // { LJM, LSSE, Orriel, MCS, analysis }
```

## Architecture

### File Structure

```
agothe.ai/
├── app/
│   └── api/
│       └── deepseek/
│           ├── chat/route.ts       # Chat endpoint
│           └── analyze/route.ts    # Analysis endpoint
├── components/
│   ├── deepseek-chat.tsx          # Chat UI component
│   └── deepseek-analyzer.tsx      # Analyzer UI component
├── lib/
│   ├── deepseek.ts                # Core API client
│   └── deepseek-context.tsx       # React context provider
└── .env.example                   # Environment template
```

### Agothe Engine Stack Metrics

1. **LJM** - Lorentzian Joyous Metric: Constraint density
2. **LSSE** - Layered Substrate Stability Evaluation: Multi-system coherence
3. **Orriel** - Paradox density
4. **MCS** - Multi-System Integration: Component integration quality

## API Reference

### `queryDeepSeek(options)`

Query DeepSeek with conversation history.

**Parameters:**
- `messages`: Array of chat messages
- `stream`: Boolean for streaming responses (default: false)
- `systemPrompt`: Optional system message

**Returns:** AI response with usage statistics

### `analyzeWithEngineStack(text)`

Analyze text using Agothe Engine Stack.

**Parameters:**
- `text`: String to analyze

**Returns:** Object with metrics (LJM, LSSE, Orriel, MCS) and detailed analysis

## Development Notes

- Built with Next.js 14 App Router
- TypeScript for type safety
- React Server Components where applicable
- Client components use 'use client' directive
- API routes handle DeepSeek integration server-side

## Security

- API keys stored in environment variables
- Never commit `.env.local` to version control
- API routes validate all inputs
- Error handling prevents information leakage

## Next Steps

- [ ] Add streaming support to chat UI
- [ ] Implement conversation history persistence
- [ ] Add metric visualization charts
- [ ] Create demo page showcasing all features
- [ ] Add unit tests for API routes
- [ ] Implement rate limiting

## Support

For issues or questions about the DeepSeek integration, refer to:
- [DeepSeek API Documentation](https://platform.deepseek.com/api-docs)
- [Agothe Framework Documentation](./docs/agothe-framework.md)

---

**Built with ❤️ by the Agothe.AI team**
