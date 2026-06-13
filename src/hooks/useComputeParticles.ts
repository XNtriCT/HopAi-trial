import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function useComputeParticles(containerRef: React.RefObject<HTMLDivElement | null>) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initialized.current) return;
    initialized.current = true;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Use a standard robust renderer for maximum compatibility
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 50;

    // Determine particle count based on rough performance heuristic
    const particleCount = navigator.hardwareConcurrency > 4 ? 40000 : 15000;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x153e8a); // Deep Cobalt
    const color2 = new THREE.Color(0x85d142); // Chartreuse Green

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 100;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = Math.random() * 0.1 + 0.05; // Upward drift
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

      phases[i] = Math.random() * Math.PI * 2;
      
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    // Custom Shader Material for organic flow
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector3(0, 0, 0) }
      },
      vertexShader: `
        uniform float time;
        uniform vec3 mouse;
        attribute vec3 velocity;
        attribute float phase;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Upward drift logic wrapped
          pos.y += time * velocity.y * 10.0;
          if (pos.y > 100.0) {
             pos.y = -100.0 + mod(pos.y, 100.0);
          }
          
          // Organic noise / phase
          pos.x += sin(time + phase) * 0.5;
          pos.z += cos(time + phase) * 0.5;

          // Mouse repulsion
          float dist = distance(pos.xy, mouse.xy);
          if (dist < 20.0) {
            vec2 dir = normalize(pos.xy - mouse.xy);
            pos.xy += dir * (20.0 - dist) * 0.1;
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (100.0 / -mvPosition.z) * 0.5;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 xy = gl_PointCoord.xy - vec2(0.5);
          float ll = length(xy);
          if (ll > 0.5) discard;
          
          // Soft circular particle
          float alpha = (0.5 - ll) * 2.0;
          gl_FragColor = vec4(vColor, alpha * 0.6);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const updateMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Project to view plane roughly
      material.uniforms.mouse.value.x = mouseX * 100;
      material.uniforms.mouse.value.y = mouseY * 50;
    };
    window.addEventListener('mousemove', updateMouse);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      material.uniforms.time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', updateMouse);
      cancelAnimationFrame(frameId);
      particles.geometry.dispose();
      particles.material.dispose();
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [containerRef]);
}
