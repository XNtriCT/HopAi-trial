import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface DrawingLineProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  delay?: number;
}

export function DrawingLine({ orientation = 'horizontal', className, delay = 0 }: DrawingLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let ctx = gsap.context(() => {
      const length = path.getTotalLength();
      
      // Set up stroke properties
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: 'power2.out',
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [delay, orientation]);

  const isHoriz = orientation === 'horizontal';

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none relative z-10',
        isHoriz ? 'w-full h-[1px] flex items-center' : 'h-full w-[1px] flex justify-center',
        className
      )}
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox={isHoriz ? '0 0 100 1' : '0 0 1 100'}
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={isHoriz ? 'M 0 0.5 L 100 0.5' : 'M 0.5 0 L 0.5 100'}
          stroke="var(--color-primary)"
          strokeWidth="0.5"
          strokeOpacity="0.5"
          fill="none"
        />
      </svg>
    </div>
  );
}
