import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  originalSize: number;
  color: { r: number; g: number; b: number };
  alpha: number;
  decay: number;
}

export function MouseAura() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200, lastX: -200, lastY: -200 });
  const isMouseDownRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      // Set mouse position instantly to eliminate any lag or delay
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDownRef.current = true;
      // Emit an instant explosive burst of bright electric cyan and blue particles on click
      const burstCount = 24;
      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2.5;
        const useBlue = Math.random() < 0.3;
        const color = useBlue ? { r: 0, g: 110, b: 255 } : { r: 0, g: 185, b: 255 };
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          size: Math.random() * 18 + 8,
          originalSize: Math.random() * 18 + 8,
          color,
          alpha: 0.95,
          decay: Math.random() * 0.025 + 0.015,
        });
      }
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      // Spawn normal steam particles if mouse is on screen
      if (mouse.x > 0 && mouse.y > 0) {
        // Calculate speed to emit more steam when moving fast
        const dx = mouse.x - mouse.lastX;
        const dy = mouse.y - mouse.lastY;
        const speed = Math.hypot(dx, dy);
        
        // Emit more particles if moving quickly
        const spawnCount = speed > 2 ? Math.min(Math.ceil(speed / 3), 4) : 1;

        // Spawn brand green (or cyan if clicked) steam particles
        for (let k = 0; k < spawnCount; k++) {
          const randAngle = Math.random() * Math.PI * 2;
          const randOffset = Math.random() * 6;
          particles.push({
            x: mouse.x + Math.cos(randAngle) * randOffset,
            y: mouse.y + Math.sin(randAngle) * randOffset,
            vx: (Math.random() - 0.5) * 0.5 + (dx * 0.03), // carry minor mouse momentum
            vy: -Math.random() * 0.8 - 0.2 + (dy * 0.03), // upwards drift like steam
            size: Math.random() * 16 + 10,
            originalSize: Math.random() * 16 + 10,
            color: isMouseDownRef.current ? { r: 0, g: 185, b: 255 } : { r: 120, g: 210, b: 60 }, // Vibrant Lime Green
            alpha: 0.6,
            decay: Math.random() * 0.018 + 0.01,
          });
        }
      }

      // Update mouse last pos
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      // Draw drifting particles if any
      if (particles.length > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          // Draw outer colored steam glow (using radial gradient to simulate soft steam)
          const outerGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          outerGlow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.95})`);
          outerGlow.addColorStop(0.3, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.6})`);
          outerGlow.addColorStop(0.65, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.2})`);
          outerGlow.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = outerGlow;
          ctx.fill();

          // Draw inner hot white core (using radial gradient to simulate soft center light)
          const coreSize = p.size * 0.35;
          const innerCore = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, coreSize);
          innerCore.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.95})`);
          innerCore.addColorStop(0.4, `rgba(255, 255, 255, ${p.alpha * 0.4})`);
          innerCore.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, coreSize, 0, Math.PI * 2);
          ctx.fillStyle = innerCore;
          ctx.fill();
        }

        // Physics & lifecycle update
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
          p.size = Math.max(0.1, p.originalSize * (p.alpha > 0 ? p.alpha : 0));
          if (p.alpha <= 0 || p.size <= 1) {
            particles.splice(i, 1);
          }
        }
      }

      // Draw the main cursor spot (100% responsive, zero lag, directly on top of particles)
      if (mouse.x > 0 && mouse.y > 0) {
        const isClick = isMouseDownRef.current;
        const glowRadius = isClick ? 28 : 36;
        const colorStr = isClick ? '0, 185, 255' : '120, 210, 60';
        
        // Outer spotlight glow (using radial gradient)
        const mainGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        mainGlow.addColorStop(0, `rgba(${colorStr}, ${isClick ? 0.75 : 0.65})`);
        mainGlow.addColorStop(0.3, `rgba(${colorStr}, ${isClick ? 0.45 : 0.35})`);
        mainGlow.addColorStop(0.7, `rgba(${colorStr}, ${isClick ? 0.15 : 0.1})`);
        mainGlow.addColorStop(1, `rgba(${colorStr}, 0)`);
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = mainGlow;
        ctx.fill();

        // Inner bright white core (using radial gradient)
        const coreRadius = isClick ? 6 : 9;
        const mainCore = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, coreRadius);
        mainCore.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        mainCore.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
        mainCore.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = mainCore;
        ctx.fill();
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 w-full h-full z-[99] mix-blend-screen"
    />
  );
}
