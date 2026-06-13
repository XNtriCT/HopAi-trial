import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const chars = '!<>-_\\/[]{}—=+*^?#________';

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, '_'));
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef(text);

  useEffect(() => {
    let frameId: number;
    let iteration = 0;
    
    if (!containerRef.current) return;

    const runScramble = () => {
      iteration = 0;
      const original = textRef.current;
      
      const animate = () => {
        setDisplayText((prev) => {
          return original
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return original[index];
              }
              if (letter === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        });
        
        if (iteration < original.length) {
          iteration += 1 / 3;
          frameId = requestAnimationFrame(animate);
        }
      };
      
      animate();
    };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 85%',
      onEnter: runScramble,
      once: true
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <span ref={containerRef} className={cn('font-mono', className)}>
      {displayText}
    </span>
  );
}
