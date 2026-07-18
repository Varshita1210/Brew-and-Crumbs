"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface CoffeeLiquidTextProps {
  text: string;
  tagline?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  className?: string;
}

export default function CoffeeLiquidText({
  text,
  tagline = "Where Every Sip Meets Every Smile",
  fontSize = 240,
  color = "#FFF8E7",
  className,
}: CoffeeLiquidTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLCanvasElement>(null);
  const [webGlFailed, setWebGlFailed] = useState(false);
  
  // Ref pointers to track interaction and state
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const requestRef = useRef<number | null>(null);
  
  // 2D Text Canvas variables
  const textCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const textCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!mountRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = mountRef.current;

    // 1. Scene, Camera & Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); // Explicitly transparent background clear color
    } catch (err) {
      console.warn("WebGL initialization failed, falling back to standard text:", err);
      setWebGlFailed(true);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);

    // 2. Offscreen 2D Canvas for Text Rasterization
    const textCanvas = document.createElement("canvas");
    textCanvasRef.current = textCanvas;
    const ctx = textCanvas.getContext("2d", { willReadFrequently: true });
    textCtxRef.current = ctx;

    const resizeTextCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      textCanvas.width = container.clientWidth * dpr;
      textCanvas.height = container.clientHeight * dpr;
    };
    resizeTextCanvas();

    // Text drawing loop
    const drawTextTexture = () => {
      if (!ctx) return;
      const w = textCanvas.width;
      const h = textCanvas.height;
      
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const screenWidth = container.clientWidth;
      let titleSize = fontSize;
      let tagSize = fontSize * 0.15;
      let gap = 20;

      if (screenWidth < 480) {
        titleSize = 42;
        tagSize = 14;
        gap = 10;
      } else if (screenWidth < 768) {
        titleSize = 70;
        tagSize = 18;
        gap = 15;
      } else if (screenWidth < 1024) {
        titleSize = 120;
        tagSize = 22;
        gap = 18;
      } else if (screenWidth < 1440) {
        titleSize = 170;
        tagSize = 28;
        gap = 22;
      }

      const dpr = Math.min(window.devicePixelRatio, 2);
      const computedTitleSize = titleSize * dpr;
      const computedTagSize = tagSize * dpr;
      const computedGap = gap * dpr;

      // Draw Main Café Name
      ctx.font = `800 ${computedTitleSize}px 'Playfair Display', serif`;
      ctx.fillStyle = color;
      
      ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
      ctx.shadowBlur = 10 * dpr;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4 * dpr;

      const titleY = h / 2 - (computedTagSize + computedGap) / 2;
      ctx.fillText(text, w / 2, titleY);

      // Draw Tagline
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.font = `500 ${computedTagSize}px 'Poppins', sans-serif`;
      ctx.fillStyle = "#D4A373"; 
      ctx.fillText(tagline, w / 2, titleY + computedTitleSize / 2 + computedGap);
    };

    // 3. WebGL Texture & Mesh Setup
    let texture: THREE.CanvasTexture;
    let geometry: THREE.PlaneGeometry;
    let material: THREE.ShaderMaterial;
    let mesh: THREE.Mesh;

    try {
      texture = new THREE.CanvasTexture(textCanvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      textureRef.current = texture;

      geometry = new THREE.PlaneGeometry(2, 2);

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform float uTime;
        uniform float uAspect;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          vec2 correctMouse = uMouse;
          vec2 correctUv = uv;
          correctMouse.x *= uAspect;
          correctUv.x *= uAspect;

          float dist = distance(correctUv, correctMouse);
          float waveIntensity = smoothstep(0.38, 0.0, dist);
          
          vec2 offset = vec2(0.0);
          if (waveIntensity > 0.0) {
            float wave = sin(dist * 32.0 - uTime * 4.5) * 0.015 * waveIntensity;
            offset = normalize(uv - uMouse) * wave;
          }

          vec2 flow = vec2(
            sin(uv.y * 12.0 + uTime * 0.4) * 0.0015,
            cos(uv.x * 12.0 + uTime * 0.4) * 0.0015
          );

          vec2 finalUv = uv + offset + flow;
          finalUv = clamp(finalUv, 0.001, 0.999);

          vec4 texColor = texture2D(uTexture, finalUv);
          vec3 glowColor = vec3(0.83, 0.64, 0.45); 
          float glint = sin(uv.y * 4.0 - uTime * 1.5 + offset.y * 15.0) * 0.5 + 0.5;
          
          vec3 shimmerColor = mix(texColor.rgb, glowColor, glint * 0.16 * texColor.a);
          float cursorHalo = smoothstep(0.18, 0.0, dist) * 0.28 * texColor.a;
          vec3 finalColor = mix(shimmerColor, glowColor, cursorHalo);

          gl_FragColor = vec4(finalColor, texColor.a);
        }
      `;

      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 },
          uAspect: { value: width / height },
        },
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });
      materialRef.current = material;

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    } catch (err) {
      console.warn("Shader or Mesh initialization failed, falling back to standard text:", err);
      setWebGlFailed(true);
      return;
    }

    const initializeDraw = () => {
      drawTextTexture();
      texture.needsUpdate = true;
    };

    if (document.fonts) {
      document.fonts.ready.then(initializeDraw);
    } else {
      initializeDraw();
    }

    // 4. Pointer Interaction
    const handlePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = 1.0 - (clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    // 5. Responsive Resize Callback
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      renderer.setSize(w, h);
      resizeTextCanvas();
      drawTextTexture();
      texture.needsUpdate = true;
      
      if (materialRef.current) {
        materialRef.current.uniforms.uAspect.value = w / h;
      }
    };
    
    const resizeObserver = new ResizeObserver(() => {
      onResize();
    });
    resizeObserver.observe(container);

    // 6. Animation Loop (60 FPS clock)
    const clock = new THREE.Clock();
    
    const tick = () => {
      const dx = mouseRef.current.x - targetMouseRef.current.x;
      const dy = mouseRef.current.y - targetMouseRef.current.y;
      
      targetMouseRef.current.x += dx * 0.08;
      targetMouseRef.current.y += dy * 0.08;

      if (materialRef.current) {
        materialRef.current.uniforms.uMouse.value.set(
          targetMouseRef.current.x,
          targetMouseRef.current.y
        );
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      }

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(tick);
    };
    tick();

    // 7. Resource Cleanup on Unmount
    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      // Dispose WebGL bindings safely
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (texture) texture.dispose();
      if (renderer) renderer.dispose();
    };
  }, [text, tagline, fontSize, color]);

  if (webGlFailed) {
    return (
      <div className={`flex flex-col items-center justify-center text-center select-none ${className || ""}`} style={{ pointerEvents: "none" }}>
        <h1 className="section-title" style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)", fontFamily: "'Playfair Display', serif", lineHeight: 1.1, color: color, textShadow: "0 4px 10px rgba(0,0,0,0.45)", marginBottom: "20px" }}>
          {text}
        </h1>
        {tagline && (
          <p className="section-subtitle" style={{ color: "#D4A373", fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1.25rem)", letterSpacing: "1.5px", margin: 0 }}>
            {tagline}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[300px] md:min-h-[500px] flex items-center justify-center select-none overflow-hidden ${className || ""}`}
    >
      <canvas
        ref={mountRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
