import React from "react";

type GlassSurfaceProps = {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
  // Advanced props (kept for API compatibility)
  displace?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  brightness?: number;
  opacity?: number;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
};

/**
 * Minimal, dependency-free glass morphism surface.
 * Provides a clean translucent container with subtle border highlight.
 * Advanced props are accepted for future extensibility to shader-based effects
 * but are currently mapped to CSS variables to keep the component lightweight.
 */
const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width,
  height,
  borderRadius = 16,
  className = "",
  // Advanced props (no-ops for now, exposed as CSS vars)
  displace = 8,
  distortionScale = -100,
  redOffset = 8,
  greenOffset = 12,
  blueOffset = 16,
  brightness = 80,
  opacity = 0.8,
  mixBlendMode,
}) => {
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius,
    // Expose experimental values as CSS variables for theming/future use
    ["--glass-displace" as any]: String(displace),
    ["--glass-distortion-scale" as any]: String(distortionScale),
    ["--glass-red-offset" as any]: String(redOffset),
    ["--glass-green-offset" as any]: String(greenOffset),
    ["--glass-blue-offset" as any]: String(blueOffset),
    ["--glass-brightness" as any]: String(brightness),
    ["--glass-opacity" as any]: String(opacity),
    mixBlendMode,
  };

  return (
    <div
      style={style}
      className={[
        // Base container
        "relative overflow-hidden backdrop-blur-xl",
        // Translucent frosted background with subtle gradient
        "bg-white/5 dark:bg-white/5",
        // Soft border and glow
        "ring-1 ring-white/10",
        // Optional shadow for separation
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)] shadow-black/40",
        className,
      ].join(" ")}
    >
      {/* Highlight gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[var(--glass-opacity,0.8)]"
        style={{ borderRadius }}
      >
        <div className="absolute -inset-px rounded-[inherit] bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.15),rgba(255,255,255,0)_40%),radial-gradient(120%_120%_at_100%_0%,rgba(59,130,246,0.10),rgba(59,130,246,0)_40%),radial-gradient(120%_120%_at_0%_100%,rgba(236,72,153,0.10),rgba(236,72,153,0)_40%)]" />
      </div>

      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
};

export default GlassSurface;


