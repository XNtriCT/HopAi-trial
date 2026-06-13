import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useVideoScrub(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  containerRef: React.RefObject<HTMLElement | null>,
  videoRef: React.RefObject<HTMLVideoElement | null>,
  frameCount: number = 100 // default fallback
) {
  const [framesLoaded, setFramesLoaded] = useState(0);
  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Generate frame paths assuming format like frame-001.jpg
    const framePaths = Array.from({ length: frameCount }, (_, i) => {
      const idx = (i + 1).toString().padStart(3, '0');
      return `/assets/video-frames/frame-${idx}.jpg`;
    });

    let loaded = 0;
    const frames: HTMLImageElement[] = [];

    framePaths.forEach((path, i) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loaded++;
        setFramesLoaded((loaded / frameCount) * 100);
        
        // Draw first frame immediately if canvas is ready
        if (i === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        }
      };
      
      // Handle fallback silently if frames don't exist
      img.onerror = () => {
        // We will fallback to video if images aren't present
        if (videoRef.current) {
          videoRef.current.style.opacity = '1';
        }
      };

      frames.push(img);
    });

    framesRef.current = frames;

    if (!containerRef.current || !canvasRef.current) return;

    // Wait for a bit to allow images to load, then setup scrub
    const ctx = canvasRef.current.getContext('2d');
    
    // Ensure canvas size
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current
        if (framesRef.current.length > 0 && framesRef.current[0].complete && ctx) {
            ctx.drawImage(framesRef.current[0], 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const scrubTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // 300vh
        pin: true,
        scrub: 0.5,
      }
    });

    // Object to tween
    const playhead = { frame: 0 };

    scrubTimeline.to(playhead, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: () => {
        if (!ctx || !canvasRef.current) return;
        const currentFrameIndex = Math.round(playhead.frame);
        const frame = framesRef.current[currentFrameIndex];
        
        if (frame && frame.complete && frame.naturalWidth > 0) {
           // draw cover
           const canvasRatio = canvasRef.current.width / canvasRef.current.height;
           const imgRatio = frame.width / frame.height;
           
           let drawWidth = canvasRef.current.width;
           let drawHeight = canvasRef.current.height;
           let offsetX = 0;
           let offsetY = 0;

           if (canvasRatio > imgRatio) {
               drawHeight = drawWidth / imgRatio;
               offsetY = (canvasRef.current.height - drawHeight) / 2;
           } else {
               drawWidth = drawHeight * imgRatio;
               offsetX = (canvasRef.current.width - drawWidth) / 2;
           }

           ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
        } else if (videoRef.current) {
             // Fallback to video scrub if frames are missing
             const duration = videoRef.current.duration || 1;
             videoRef.current.currentTime = (currentFrameIndex / frameCount) * duration;
        }
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      scrubTimeline.kill();
    };
  }, [frameCount, canvasRef, containerRef, videoRef]);

  return { framesLoaded };
}
