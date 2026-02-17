'use client';

import { useState } from 'react';

interface LiveDemoSectionProps {
  title?: string;
  description?: string;
  htmlContent?: string;
  minHeight?: string;
}

/**
 * LiveDemoSection - A component for displaying live HTML demos
 * 
 * This component provides a blank section where HTML code can be inserted and run.
 * It uses dangerouslySetInnerHTML to render arbitrary HTML, so only trusted content should be used.
 * 
 * @param title - Optional title for the demo section
 * @param description - Optional description text
 * @param htmlContent - The HTML content to render (can include scripts and styles)
 * @param minHeight - Minimum height for the demo container (default: '400px')
 */
export function LiveDemoSection({
  title = 'Live Demo',
  description,
  htmlContent = '',
  minHeight = '400px',
}: LiveDemoSectionProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          {title && (
            <h2 className="mb-4 font-heading text-3xl font-bold text-agothe-white md:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm leading-relaxed text-agothe-muted">
              {description}
            </p>
          )}
        </div>

        {/* Demo Container */}
        {isVisible && (
          <div className="obsidian-glass overflow-hidden rounded-lg">
            <div
              className="demo-content p-6"
              style={{ minHeight }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        )}

        {/* Helper text for empty state */}
        {!htmlContent && (
          <div className="mt-4 text-center">
            <p className="text-xs text-agothe-muted">
              This section is ready for HTML demo content. Add your HTML in the htmlContent prop.
            </p>
          </div>
        )}
      </div>

      {/* Inline styles for demo content */}
      <style jsx>{`
        .demo-content {
          color: #ffffff;
        }
        
        .demo-content :global(a) {
          color: #00f0ff;
          text-decoration: none;
        }
        
        .demo-content :global(a:hover) {
          text-decoration: underline;
        }
        
        .demo-content :global(button) {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
