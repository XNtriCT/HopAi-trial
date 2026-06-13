import React from 'react';

export function ScanLine() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(21, 62, 138, 0) 50%, rgba(21, 62, 138, 0.02) 50%)',
        backgroundSize: '100% 4px',
      }}
    />
  );
}
