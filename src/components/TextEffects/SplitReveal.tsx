import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface SplitRevealProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function SplitReveal({ text, className, as: Component = 'div' }: SplitRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        {
          y: '100%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(' ');

  return (
    <Component ref={containerRef} className={cn('overflow-hidden flex flex-wrap gap-[0.25em]', className)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block leading-snug">
          <span
            ref={(el) => {
              if (el) wordsRef.current[i] = el;
            }}
            className="inline-block"
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
