import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface LineRevealProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  gradient?: boolean;
}

export function LineReveal({ text, className, as: Component = 'h2', delay = 0, gradient = false }: LineRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const [lines, setLines] = useState<string[][]>([]);
  const [initialized, setInitialized] = useState(false);

  const words = text.split(' ');

  const calculateLines = () => {
    if (!containerRef.current || wordsRef.current.length === 0) return;

    const lineMap: { [key: number]: string[] } = {};
    
    wordsRef.current.forEach((wordSpan, index) => {
      if (!wordSpan) return;
      const top = wordSpan.offsetTop;
      const word = words[index];
      
      if (!lineMap[top]) {
        lineMap[top] = [];
      }
      lineMap[top].push(word);
    });

    const sortedTops = Object.keys(lineMap)
      .map(Number)
      .sort((a, b) => a - b);
      
    const computedLines = sortedTops.map((top) => lineMap[top]);
    setLines(computedLines);
    setInitialized(true);
  };

  useEffect(() => {
    calculateLines();

    const handleResize = () => {
      calculateLines();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [text]);

  useEffect(() => {
    if (!initialized || !containerRef.current) return;

    const lineElements = containerRef.current.querySelectorAll('.reveal-line-inner');
    if (lineElements.length === 0) return;

    let ctx = gsap.context(() => {
      gsap.fromTo(
        lineElements,
        {
          y: '110%',
        },
        {
          y: '0%',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [initialized, lines, delay]);

  const textGradientClasses = gradient
    ? 'text-transparent bg-clip-text bg-[length:200%_auto] animate-[gradient-flow_4s_linear_infinite] bg-gradient-to-r from-secondary via-primary to-secondary'
    : '';

  if (!initialized) {
    return (
      <Component
        ref={containerRef}
        className={cn('flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]', className)}
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) wordsRef.current[i] = el;
            }}
            className={cn('inline-block whitespace-nowrap', textGradientClasses)}
          >
            {word}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component ref={containerRef} className={cn('block select-none', className)}>
      {lines.map((lineWords, lineIdx) => (
        <span
          key={lineIdx}
          className="block overflow-hidden py-[0.05em] w-full"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        >
          <span className={cn('reveal-line-inner block origin-top-left', textGradientClasses)}>
            {lineWords.join(' ')}
          </span>
        </span>
      ))}
      {gradient && (
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes gradient-flow {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}} />
      )}
    </Component>
  );
}
