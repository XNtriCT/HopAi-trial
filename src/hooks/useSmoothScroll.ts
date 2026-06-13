import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      syncTouch: true,
    });
    
    lenisRef.current = lenis;
    (window as any).lenis = lenis;
    (window as any).lenisVelocity = 0;

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      (window as any).lenisVelocity = e.velocity || 0;
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      (window as any).lenis = null;
      (window as any).lenisVelocity = null;
    };
  }, []);

  return lenisRef;
}
