'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function DeepSeekChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/deepseek/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, idx) => (
          <Card key={idx} className={`p-4 ${
            msg.role === 'user' ? 'bg-blue-50 ml-auto' : 'bg-gray-50'
          } max-w-[80%] ${
            msg.role === 'user' ? 'ml-auto' : 'mr-auto'
          }`}>
            <p className="text-sm font-semibold mb-2">
              {msg.role === 'user' ? 'You' : 'DeepSeek'}
            </p>
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </Card>
        ))}
        {loading && (
          <Card className="p-4 bg-gray-50 max-w-[80%]">
            <p className="text-sm text-gray-500">Thinking...</p>
          </Card>
        )}
      </div>
      
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask DeepSeek anything..."
          className="flex-1"
          rows={3}
        />
        <Button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
