import React, { useEffect } from 'react';
import gsap from 'gsap';

export function use3DTilt(
  cardRef: React.RefObject<HTMLElement | null>,
  iconSelector: string = '.w-12, .w-14, .w-16, .icon-parallax'
) {
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Avoid running on mobile/tablets for performance and touch friendliness
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const icon = card.querySelector(iconSelector) as HTMLElement;

    let ctx = gsap.context(() => {
      // Rotations
      const rotateXTo = gsap.quickTo(card, 'rotateX', { duration: 0.45, ease: 'power2.out' });
      const rotateYTo = gsap.quickTo(card, 'rotateY', { duration: 0.45, ease: 'power2.out' });
      const zTo = gsap.quickTo(card, 'z', { duration: 0.45, ease: 'power2.out' });

      // Parallax translation for inner icon
      let iconXTo: any = null;
      let iconYTo: any = null;
      
      if (icon) {
        iconXTo = gsap.quickTo(icon, 'x', { duration: 0.45, ease: 'power2.out' });
        iconYTo = gsap.quickTo(icon, 'y', { duration: 0.45, ease: 'power2.out' });
      }

      // Configure CSS transform properties
      gsap.set(card, {
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        // Normalize cursor position inside card to range [-1, 1]
        const normX = (e.clientX - cardCenterX) / (rect.width / 2);
        const normY = (e.clientY - cardCenterY) / (rect.height / 2);

        const maxRotation = 8; // Degrees
        const rotX = -normY * maxRotation;
        const rotY = normX * maxRotation;

        rotateXTo(rotX);
        rotateYTo(rotY);
        zTo(10); // subtle lift

        if (iconXTo && iconYTo) {
          const maxParallax = 12; // Pixels shift
          iconXTo(normX * maxParallax);
          iconYTo(normY * maxParallax);
        }
      };

      const handleMouseLeave = () => {
        rotateXTo(0);
        rotateYTo(0);
        zTo(0);
        if (iconXTo && iconYTo) {
          iconXTo(0);
          iconYTo(0);
        }
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, card);

    return () => ctx.revert();
  }, [cardRef, iconSelector]);
}
