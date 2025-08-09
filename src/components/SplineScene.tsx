import React, { Suspense, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Dynamic import so the heavy Spline lib is fetched only when needed
const LazySpline = React.lazy(() => import("@splinetool/react-spline"));

type SplineSceneProps = {
  sceneUrl: string;
  className?: string;
  mountOffsetPx?: number;
};

const SplineScene: React.FC<SplineSceneProps> = ({
  sceneUrl = "/scene.splinecode",
  className = "",
  mountOffsetPx = 120,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(wrapperRef, { margin: "-20% 0px -20% 0px", once: true });
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (isInView) setShouldMount(true);
  }, [isInView]);

  // Mount after user scrolls a bit to avoid blocking first paint
  useEffect(() => {
    if (shouldMount) return;
    const onScroll = () => {
      if (window.scrollY >= mountOffsetPx) {
        setShouldMount(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldMount, mountOffsetPx]);

  return (
    <div ref={wrapperRef} className="pointer-events-none absolute inset-0 -z-5 overflow-hidden">
      {shouldMount ? (
        <Suspense fallback={null}>
          <motion.div
            initial={{ opacity: 0, rotate: -12, scale: 0.98 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className={className}
            style={{ willChange: "transform, opacity" }}
          >
            <LazySpline scene={sceneUrl} />
          </motion.div>
        </Suspense>
      ) : null}
    </div>
  );
};

export default SplineScene;


