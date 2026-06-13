import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface TypewriterTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function TypewriterText({ text, className, as: Component = 'div' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          let i = 0;
          const timer = setInterval(() => {
            setDisplayText(text.substring(0, i));
            i++;
            if (i > text.length) clearInterval(timer);
          }, 30);
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [text]);

  return (
    <Component ref={containerRef} className={cn(className)}>
      {displayText}
      <span className="animate-pulse inline-block w-[0.5em] h-[1em] bg-primary ml-1 align-middle -translate-y-[0.1em]" />
    </Component>
  );
}
