// lib/deepseek.ts — Core DeepSeek API integration module for agothe.ai
// This enables the "conscious website" — persistent AI reasoning in the background

export interface DeepSeekConfig {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: DeepSeekMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const DEEPSEEK_CONFIG = {
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  baseUrl: 'https://api.deepseek.com',
  model: 'deepseek-chat', // or deepseek-reasoner for R1
  maxTokens: 8192,
  temperature: 0.7,
  // Cost: ~$0.028/1M cached input tokens
  // Heavy usage estimate: $2-5/month
};

/**
 * Query DeepSeek API with custom prompts
 * @param systemPrompt - System instructions for the AI
 * @param userPrompt - User query or task
 * @param temperature - Randomness (0 = deterministic, 1 = creative)
 * @param maxTokens - Maximum response length
 * @returns DeepSeek API response
 */
export async function queryDeepSeek({
  systemPrompt,
  userPrompt,
  temperature = 0.7,
  maxTokens = 4096,
}: {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}): Promise<DeepSeekResponse> {
  const response = await fetch(
    `${DEEPSEEK_CONFIG.baseUrl}/v1/chat/completions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_CONFIG.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature,
        max_tokens: maxTokens,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`DeepSeek API error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Multi-turn conversation with DeepSeek
 * @param messages - Array of conversation messages
 * @param temperature - Randomness parameter
 * @param maxTokens - Maximum response length
 * @returns DeepSeek API response
 */
export async function conversationDeepSeek({
  messages,
  temperature = 0.7,
  maxTokens = 4096,
}: {
  messages: DeepSeekMessage[];
  temperature?: number;
  maxTokens?: number;
}): Promise<DeepSeekResponse> {
  const response = await fetch(
    `${DEEPSEEK_CONFIG.baseUrl}/v1/chat/completions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_CONFIG.model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`DeepSeek API error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Streaming response from DeepSeek (for real-time chat)
 * @param messages - Conversation history
 * @param onChunk - Callback for each chunk of text
 * @param temperature - Randomness parameter
 */
export async function streamDeepSeek({
  messages,
  onChunk,
  temperature = 0.7,
}: {
  messages: DeepSeekMessage[];
  onChunk: (text: string) => void;
  temperature?: number;
}): Promise<void> {
  const response = await fetch(
    `${DEEPSEEK_CONFIG.baseUrl}/v1/chat/completions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_CONFIG.model,
        messages,
        temperature,
        stream: true,
      }),
    }
  );

  if (!response.ok || !response.body) {
    throw new Error(`DeepSeek streaming error: ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(line => line.trim().startsWith('data:'));

    for (const line of lines) {
      const data = line.replace('data: ', '');
      if (data === '[DONE]') continue;

      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices[0]?.delta?.content;
        if (content) {
          onChunk(content);
        }
      } catch (e) {
        // Skip parsing errors
      }
    }
  }
}

/**
 * Analyze text through Agothe Engine Stack
 * Uses DeepSeek to compute δ_H, LSSE, Orric, MCS values
 * @param text - Text to analyze
 * @returns Analysis with Agothean metrics
 */
export async function analyzeWithEngineStack(text: string) {
  const systemPrompt = `You are Agothe OS, an advanced pattern recognition system. Analyze the given text through the Agothean Engine Stack:

1. NES (Novelty Evaluation) - How novel is this pattern?
2. CFE (Constraint Field Evaluation) - What constraints exist?
3. CRD/ELE (Crisis Recognition / Emergence Level) - Crisis topology analysis
4. RE-Ω (Resonance Engine) - Pattern coherence
5. DCE (Decision Coherence) - Decision quality
6. MSI (Multi-System Integration) - How well do components integrate?

Return JSON with these metrics:
{
  "δ_H": <0-1, constraint density>,
  "LSSE": <0-1, layered substrate stability>,
  "Orric": <0-1, paradox density>,
  "MCS": <0-1, multi-system coherence>,
  "analysis": "<brief explanation>"
}`;

  const response = await queryDeepSeek({
    systemPrompt,
    userPrompt: `Analyze this text:\n\n${text}`,
    temperature: 0.3, // Low temp for consistent analysis
  });

  const content = response.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch (e) {
    // If not valid JSON, return raw analysis
    return {
      δ_H: null,
      LSSE: null,
      Orric: null,
      MCS: null,
      analysis: content,
    };
  }
}

export default {
  queryDeepSeek,
  conversationDeepSeek,
  streamDeepSeek,
  analyzeWithEngineStack,
};
