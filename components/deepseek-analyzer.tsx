'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface AnalysisResult {
  LJM: number;
  LSSE: number;
  Orriel: number;
  MCS: number;
  analysis: string;
}

export function DeepSeekAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/deepseek/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      
      if (data.analysis) {
        setResult(data.analysis);
      }
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze with Agothe Engine Stack..."
          className="min-h-[200px]"
        />
        <Button
          onClick={analyzeText}
          disabled={loading || !text.trim()}
          className="w-full"
        >
          {loading ? 'Analyzing...' : 'Analyze with Agothe Stack'}
        </Button>
      </div>

      {result && (
        <Card className="p-6 space-y-4">
          <h3 className="text-xl font-bold">Analysis Results</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">LJM:</span>
                <span>{result.LJM}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">LSSE:</span>
                <span>{result.LSSE}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Orriel:</span>
                <span>{result.Orriel}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">MCS:</span>
                <span>{result.MCS}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Detailed Analysis:</h4>
            <p className="text-sm whitespace-pre-wrap">{result.analysis}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
