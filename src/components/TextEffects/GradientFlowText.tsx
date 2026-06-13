import { cn } from '../../lib/utils';
import React from 'react';

interface GradientFlowTextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function GradientFlowText({ children, className, as: Component = 'span' }: GradientFlowTextProps) {
  return (
    <Component
      className={cn(
        'text-transparent bg-clip-text bg-[length:200%_auto] animate-[gradient-flow_4s_linear_infinite]',
        'bg-gradient-to-r from-secondary via-primary to-secondary',
        className
      )}
    >
      {children}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-flow {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}} />
    </Component>
  );
}
