"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DottedGlowBackgroundProps {
  className?: string;
  gap?: number;
  radius?: number;
  colorLightVar?: string;
  glowColorLightVar?: string;
  colorDarkVar?: string;
  glowColorDarkVar?: string;
  opacity?: number;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
  children?: React.ReactNode;
}

export const DottedGlowBackground: React.FC<DottedGlowBackgroundProps> = ({
  className,
  gap = 20,
  radius = 1,
  colorLightVar = "--color-neutral-300",
  glowColorLightVar = "--color-neutral-400",
  colorDarkVar = "--color-neutral-700",
  glowColorDarkVar = "--color-emerald-500", // Defaulting to emerald for the theme
  opacity = 0.5,
  backgroundOpacity = 0,
  speedMin = 0.5,
  speedMax = 1.0,
  speedScale = 0.1,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Get color from CSS variable or fallback
  const getColor = (cssVar: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    const computed = getComputedStyle(document.documentElement)
      .getPropertyValue(cssVar)
      .trim();
    return computed || fallback;
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      glowing: boolean;
    }[] = [];

    const color = getColor(colorDarkVar, "#333333"); // Default dark dot color
    const glowColor = getColor(glowColorDarkVar, "#10b981"); // Default emerald glow

    const initParticles = () => {
      particles = [];
      const cols = Math.floor(dimensions.width / gap);
      const rows = Math.floor(dimensions.height / gap);

      // Create a grid of dots
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          // Some random glowing particles
          const isGlowing = Math.random() < 0.05; // 5% chance to be a glowing particle
          particles.push({
            x: i * gap,
            y: j * gap,
            r: radius,
            dx: isGlowing ? (Math.random() - 0.5) * speedMin * speedScale : 0, // Only glowing particles move slightly? Or maybe static grid + moving glow?
            // Let's keep dots static for the grid look, but animate opacity/glow
            dy: 0,
            glowing: isGlowing,
          });
        }
      }
    };

    initParticles();

    // Mouse interaction
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    // Add event listener to container instead of window to be more contained
    containerRef.current?.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Background
      //   ctx.fillStyle = `rgba(0,0,0,${backgroundOpacity})`;
      //   ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      particles.forEach((p) => {
        // Distance to mouse
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const mouseGlowRadius = 150;

        // Base color
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        if (dist < mouseGlowRadius) {
          // Glow effect near mouse
          const alpha = 1 - dist / mouseGlowRadius;
          ctx.fillStyle = glowColor; // Glow color
          ctx.globalAlpha = alpha * opacity * 2; // Brighter
        } else {
          // Standard grid dot
          ctx.fillStyle = color;
          ctx.globalAlpha = opacity;
        }

        // Also random glowing dots (twinkle)
        if (p.glowing) {
          // Twinkle effect
          const time = Date.now() * 0.002;
          const twinkleAlpha = (Math.sin(time + p.x) + 1) / 2;
          if (twinkleAlpha > 0.8) {
            ctx.fillStyle = glowColor;
            ctx.globalAlpha = twinkleAlpha * opacity;
          }
        }

        ctx.fill();
        ctx.globalAlpha = 1; // Reset
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    dimensions,
    gap,
    radius,
    colorDarkVar,
    glowColorDarkVar,
    opacity,
    speedMin,
    speedScale,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden bg-black",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      <div className="relative z-10 w-full h-full pointer-events-none">
        {/* Radial mask for fade out edges if needed, though prop handles typical css mask */}
        {children}
      </div>
    </div>
  );
};
