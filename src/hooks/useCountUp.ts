import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountUp = ({
  end,
  duration = 1200,
  decimals = 0,
  suffix = '',
  prefix = ''
}: UseCountUpOptions) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const startAnimation = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeOut * end;
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            startAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [startAnimation, hasStarted]);

  const formattedValue = `${prefix}${decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()}${suffix}`;

  return { ref: elementRef, value: formattedValue, hasStarted };
};
