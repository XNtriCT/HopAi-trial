import React, { useRef } from 'react';
import { useComputeParticles } from '../hooks/useComputeParticles';

export function WebGPUPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Implements the GPU particle system fallback logic.
  // The shader mimics compute-shader capabilities by using vertex displacement.
  useComputeParticles(containerRef);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] mix-blend-multiply opacity-40"
      style={{ isolation: 'isolate' }}
    />
  );
}
