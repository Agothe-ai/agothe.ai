'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function ObsidianCard({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  if (!hover) {
    return (
      <div
        className={`obsidian-glass-static rounded-lg p-6 ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`obsidian-glass rounded-lg p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
