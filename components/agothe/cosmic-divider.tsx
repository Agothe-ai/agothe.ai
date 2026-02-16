'use client';

interface CosmicDividerProps {
  className?: string;
}

export function CosmicDivider({ className = '' }: CosmicDividerProps) {
  return (
    <div className={`relative w-full py-16 ${className}`} aria-hidden="true">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-agothe-void via-transparent to-transparent" />
      
      {/* Center cosmic line with glow */}
      <div className="relative h-px w-full overflow-hidden">
        {/* Background subtle line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-agothe-muted/20 to-transparent" />
        
        {/* Teal accent glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-agothe-teal/30 to-transparent blur-sm" />
        
        {/* Gold accent shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-agothe-gold/20 to-transparent blur-md" />
      </div>
      
      {/* Center dot constellation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-3">
        <div className="w-1 h-1 rounded-full bg-agothe-teal/60 animate-pulse-dot" />
        <div className="w-1.5 h-1.5 rounded-full bg-agothe-teal" />
        <div className="w-1 h-1 rounded-full bg-agothe-teal/60 animate-pulse-dot" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-agothe-void via-transparent to-transparent" />
    </div>
  );
}
