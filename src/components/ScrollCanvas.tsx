import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglCanvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [webglActive, setWebglActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const totalFrames = 192;
    const images: HTMLImageElement[] = [];
    const playhead = { frame: 0 };
    let loadedCount = 0;
    let isUnmounted = false;
    let playheadTween: gsap.core.Tween | null = null;
    let scrollTriggerInstance: ScrollTrigger | null = null;

    // WebGL variables
    let webglRenderer: THREE.WebGLRenderer | null = null;
    let webglScene: THREE.Scene | null = null;
    let webglCamera: THREE.OrthographicCamera | null = null;
    let webglMesh: THREE.Mesh | null = null;
    let webglTexture: THREE.CanvasTexture | null = null;
    let webglMaterial: THREE.ShaderMaterial | null = null;
    let webglFrameId: number | null = null;

    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let activeMouseStrength = 0.0;
    let currentMouseStrength = 0.0;

    const drawFrame = (img: HTMLImageElement) => {
      if (isUnmounted || !canvas || !ctx) return;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || img.width || 1920;
      const imgHeight = img.naturalHeight || img.height || 1080;

      const canvasRatio = canvasWidth / canvasHeight;
      const imgRatio = imgWidth / imgHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = drawWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = drawHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const initWebGL = () => {
      const webglCanvas = webglCanvasRef.current;
      if (!webglCanvas || isUnmounted) return;

      try {
        webglScene = new THREE.Scene();
        webglCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        
        webglRenderer = new THREE.WebGLRenderer({
          canvas: webglCanvas,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        });
        
        webglRenderer.setSize(window.innerWidth, window.innerHeight);
        webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create texture from the 2D canvas
        webglTexture = new THREE.CanvasTexture(canvas);
        webglTexture.minFilter = THREE.LinearFilter;
        webglTexture.magFilter = THREE.LinearFilter;
        webglTexture.generateMipmaps = false;

        const uniforms = {
          uTexture: { value: webglTexture },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseStrength: { value: 0.0 },
          uScrollVelocity: { value: 0.0 },
          uTime: { value: 0.0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        };

        webglMaterial = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uTexture;
            uniform vec2 uMouse;
            uniform float uMouseStrength;
            uniform float uScrollVelocity;
            uniform float uTime;
            uniform vec2 uResolution;
            varying vec2 vUv;

            void main() {
              vec2 uv = vUv;
              
              // 1. Mouse refractive warp lens
              float aspect = uResolution.x / uResolution.y;
              vec2 diff = uv - uMouse;
              diff.x *= aspect;
              float dist = length(diff);
              
              vec2 warpUv = vec2(0.0);
              if (dist < 0.35) {
                // Smooth glass lens warp
                float force = smoothstep(0.35, 0.0, dist) * uMouseStrength * 0.04;
                warpUv = normalize(diff) * force;
                warpUv.x /= aspect;
              }

              // 2. Scroll velocity ripple waves
              float wave = sin(uv.y * 12.0 - uTime * 4.0) * abs(uScrollVelocity) * 0.015;
              warpUv.x += wave * cos(uv.x * 3.14159);

              // 3. Subtle glassmorphism micro-texture noise
              float glassNoise = sin(uv.x * 150.0 + sin(uv.y * 50.0)) * 0.0012;
              vec2 finalUv = uv + warpUv + vec2(glassNoise);
              finalUv = clamp(finalUv, 0.001, 0.999);

              // 4. Chromatic Aberration (refractive light splitting)
              vec2 redOffset = warpUv * 0.04;
              vec2 blueOffset = -warpUv * 0.04;
              
              float r = texture2D(uTexture, clamp(finalUv + redOffset, 0.001, 0.999)).r;
              float g = texture2D(uTexture, finalUv).g;
              float b = texture2D(uTexture, clamp(finalUv + blueOffset, 0.001, 0.999)).b;

              // 5. Specular highlights (glass shine)
              float specular = 0.0;
              if (dist < 0.35) {
                specular = pow(smoothstep(0.35, 0.0, dist), 5.0) * uMouseStrength * 0.22;
              }

              // 6. Subtle vignette overlay
              float vignette = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y) * 16.0;
              vignette = mix(0.88, 1.0, pow(vignette, 0.25));

              vec3 baseColor = vec3(r, g, b);
              vec3 finalColor = (baseColor + vec3(specular)) * vignette;

              gl_FragColor = vec4(finalColor, 1.0);
            }
          `,
          transparent: true,
          depthWrite: false
        });

        const planeGeometry = new THREE.PlaneGeometry(2, 2);
        webglMesh = new THREE.Mesh(planeGeometry, webglMaterial);
        webglScene.add(webglMesh);

        setWebglActive(true);

        const clock = new THREE.Clock();

        const animateWebGL = () => {
          if (isUnmounted) return;
          webglFrameId = requestAnimationFrame(animateWebGL);

          if (webglTexture) {
            webglTexture.needsUpdate = true;
          }

          if (webglMaterial) {
            // Lerp mouse coordinates
            const currentMouse = webglMaterial.uniforms.uMouse.value;
            currentMouse.x += (targetMouseX - currentMouse.x) * 0.08;
            currentMouse.y += (targetMouseY - currentMouse.y) * 0.08;

            // Decay mouse strength
            activeMouseStrength *= 0.96;
            if (activeMouseStrength < 0.01) activeMouseStrength = 0.0;
            currentMouseStrength += (activeMouseStrength - currentMouseStrength) * 0.08;
            webglMaterial.uniforms.uMouseStrength.value = currentMouseStrength;

            // Smooth scroll velocity ripple
            const scrollVel = (window as any).lenisVelocity || 0;
            const targetScrollVel = scrollVel * 0.015;
            webglMaterial.uniforms.uScrollVelocity.value += (targetScrollVel - webglMaterial.uniforms.uScrollVelocity.value) * 0.08;

            webglMaterial.uniforms.uTime.value = clock.getElapsedTime();
          }

          if (webglRenderer && webglScene && webglCamera) {
            webglRenderer.render(webglScene, webglCamera);
          }
        };

        animateWebGL();
      } catch (err) {
        console.warn("WebGL refractive overlay initialization failed, falling back to 2D canvas:", err);
        setWebglActive(false);
      }
    };

    const initGSAPAnimation = () => {
      if (isUnmounted) return;

      // Draw first frame immediately once loaded
      if (images[0]) {
        drawFrame(images[0]);
      }

      // Initialize WebGL overlay
      initWebGL();

      // Animate custom playhead index with GSAP tween
      playheadTween = gsap.to(playhead, {
        frame: totalFrames - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // Synced in parallel with Lenis smooth scrolling thread
        },
        onUpdate: () => {
          const frameIndex = Math.round(playhead.frame);
          const img = images[frameIndex];
          if (img && img.complete) {
            drawFrame(img);
          }
        }
      });

      scrollTriggerInstance = playheadTween.scrollTrigger || null;

      // Recalculate ScrollTrigger measurements after loading
      setTimeout(() => {
        if (!isUnmounted) {
          ScrollTrigger.refresh();
        }
      }, 100);
    };

    const handleImageLoad = () => {
      if (isUnmounted) return;
      loadedCount++;
      const prog = Math.round((loadedCount / totalFrames) * 100);
      setLoadingProgress(prog);

      if (loadedCount === totalFrames) {
        setLoaded(true);
        initGSAPAnimation();
      }
    };

    const handleImageError = () => {
      handleImageLoad();
    };

    // Preload all WebP frames into memory on mount
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const idx = String(i).padStart(6, '0');
      img.src = `/webp_frames/frame_${idx}.webp`;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      images.push(img);
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = 1.0 - (e.clientY / window.innerHeight);
      activeMouseStrength = 1.0;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      if (!canvas || isUnmounted) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;

      if (webglRenderer && webglMaterial) {
        webglRenderer.setSize(width, height);
        webglMaterial.uniforms.uResolution.value.set(width, height);
      }
      
      // Draw the current playhead frame
      const currentFrameIndex = Math.round(playhead.frame);
      const currentImg = images[currentFrameIndex];
      if (currentImg && currentImg.complete) {
        drawFrame(currentImg);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // initial sizing

    return () => {
      isUnmounted = true;
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (playheadTween) {
        playheadTween.kill();
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (webglFrameId) {
        cancelAnimationFrame(webglFrameId);
      }
      if (webglRenderer) {
        webglRenderer.dispose();
      }
      if (webglMesh) {
        webglMesh.geometry.dispose();
        if (Array.isArray(webglMesh.material)) {
          webglMesh.material.forEach((m) => m.dispose());
        } else {
          webglMesh.material.dispose();
        }
      }
      if (webglTexture) {
        webglTexture.dispose();
      }
    };
  }, []);

  return (
    <>
      <div 
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        style={{ transition: 'none' }}
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover absolute inset-0"
          style={{ 
            transition: 'none', 
            willChange: 'transform',
            opacity: webglActive ? 0 : 0.45 
          }}
        />
        <canvas 
          ref={webglCanvasRef} 
          className="w-full h-full object-cover absolute inset-0"
          style={{ 
            transition: 'none', 
            opacity: webglActive ? 0.45 : 0,
            display: webglActive ? 'block' : 'none'
          }}
        />
        {/* Soft vignette/color overlay blending it nicely */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/80 pointer-events-none"
          style={{ transition: 'none' }}
        />
      </div>
      
      {/* Premium, neural-themed glassmorphic loader overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md transition-opacity duration-700 ease-out">
          <div className="flex flex-col items-center gap-6 p-8 rounded-2xl liquid-glass max-w-sm w-full mx-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
              {/* Inner spinning ring */}
              <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              {/* Center dot */}
              <div className="absolute w-3 h-3 bg-primary rounded-full" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-display text-lg font-bold tracking-wider text-foreground">
                INITIALIZING SYSTEM
              </h3>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Caching Neural Assets
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-secondary/15 h-1.5 rounded-full overflow-hidden border border-secondary/5">
              <div 
                className="bg-primary h-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(114,191,74,0.6)]"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="flex justify-between w-full text-[10px] font-mono font-bold text-muted-foreground">
              <span>SYSTEM ONLINE</span>
              <span className="text-primary">{loadingProgress}%</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
