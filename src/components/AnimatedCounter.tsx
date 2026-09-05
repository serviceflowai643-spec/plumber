import React, { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface AnimatedCounterProps {
  value: string; // e.g. "50+", "179+", "24/7", "5.0", "100%", "30-45"
  className?: string;
  duration?: number; // duration in seconds
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  className = "",
  duration = 1.4,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState<string>("0");

  useEffect(() => {
    if (!isInView) return;

    // Check if value is a pure rating like "5.0"
    if (value === "5.0") {
      let start = 0;
      const end = 5.0;
      const startTime = performance.now();
      const durMs = duration * 1000;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durMs, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = (start + (end - start) * ease).toFixed(1);
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayValue("5.0");
        }
      };
      requestAnimationFrame(step);
      return;
    }

    // Check for "24/7" (special case)
    if (value === "24/7") {
      let frame = 0;
      const timer = setInterval(() => {
        frame++;
        if (frame >= 3) {
          setDisplayValue("24/7");
          clearInterval(timer);
        } else {
          setDisplayValue(`${frame * 8}/7`);
        }
      }, 150);
      return () => clearInterval(timer);
    }

    // Extract numeric part and suffix/prefix (e.g. "50+", "179+", "100%", "30-45")
    const match = value.match(/^([^\d]*)(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const targetNum = parseInt(match[2], 10);
    const suffix = match[3] || "";

    const startTime = performance.now();
    const durMs = duration * 1000;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durMs, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentNum = Math.floor(targetNum * ease);
      setDisplayValue(`${prefix}${currentNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {isInView ? displayValue : value.replace(/\d/g, "0")}
    </span>
  );
};
