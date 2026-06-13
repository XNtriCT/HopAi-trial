import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Distance threshold for attraction
  actionSpeed?: number; // Snapping responsiveness
  releaseSpeed?: number; // Return animation speed
}

export function Magnetic({ children, range = 45, actionSpeed = 0.3, releaseSpeed = 0.85 }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const button = container.firstElementChild as HTMLElement;
    if (!button) return;

    // Target child with class 'magnetic-text' or default to the button itself
    const text = button.querySelector('.magnetic-text') || button;

    let ctx = gsap.context(() => {
      const xTo = gsap.quickTo(button, 'x', { duration: actionSpeed, ease: 'power3.out' });
      const yTo = gsap.quickTo(button, 'y', { duration: actionSpeed, ease: 'power3.out' });
      
      const textXTo = gsap.quickTo(text, 'x', { duration: actionSpeed, ease: 'power3.out' });
      const textYTo = gsap.quickTo(text, 'y', { duration: actionSpeed, ease: 'power3.out' });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distanceX = e.clientX - buttonCenterX;
        const distanceY = e.clientY - buttonCenterY;
        const distance = Math.hypot(distanceX, distanceY);

        if (distance < rect.width / 2 + range) {
          const strength = 0.4;
          xTo(distanceX * strength);
          yTo(distanceY * strength);
          
          textXTo(distanceX * strength * 0.4);
          textYTo(distanceY * strength * 0.4);
        } else {
          gsap.to(button, { x: 0, y: 0, duration: releaseSpeed, ease: 'elastic.out(1, 0.3)' });
          gsap.to(text, { x: 0, y: 0, duration: releaseSpeed, ease: 'elastic.out(1, 0.3)' });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(button, { x: 0, y: 0, duration: releaseSpeed, ease: 'elastic.out(1, 0.3)' });
        gsap.to(text, { x: 0, y: 0, duration: releaseSpeed, ease: 'elastic.out(1, 0.3)' });
      };

      window.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, container);

    return () => ctx.revert();
  }, [range, actionSpeed, releaseSpeed]);

  return (
    <div ref={containerRef} className="inline-block relative">
      {React.cloneElement(children, {
        className: `${children.props.className || ''} relative`
      })}
    </div>
  );
}
