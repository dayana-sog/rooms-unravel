import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void, delay = 200) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (timeoutRef.current) return; 

        timeoutRef.current = setTimeout(() => {
          callback();
          timeoutRef.current = null;
        }, delay);
      }
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [callback, delay]);

  return sentinelRef;
}
